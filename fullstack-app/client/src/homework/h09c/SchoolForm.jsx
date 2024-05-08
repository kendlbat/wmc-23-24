import React, { useMemo, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import schools from "./schools.json";

function SchoolForm() {
    const [school, setSchool] = useState({});
    const [serverResponse, setServerResponse] = useState(undefined);
    let responseMessageTimeout = undefined;

    const showServerResponse = (status, msg) => {
        if (responseMessageTimeout) clearTimeout(responseMessageTimeout);
        setServerResponse({ status, msg });
        responseMessageTimeout = setTimeout(
            () => setServerResponse(undefined),
            5000
        );
        console.log(msg);
    };

    /*
    code: {
        type: Number,
        required: [true, "code is missing"],
        min: 100000,
        max: 999999,
    },
    title: {
        type: String,
        required: true,
    },
    address: {
        zipCode: {
            type: Number,
            required: true,
            min: 1000,
            max: 9999,
        },
        city: {
            type: String,
            required: true,
        },
        street: {
            type: String,
        },
    },
    category: {
        type: String,
        required: true,
        enum: ["AHS", "BHS", "MS"],
    },
    */

    const spreadAnyDepth = (obj, key, value) => {
        if (key.indexOf(".") === -1) {
            return { ...obj, [key]: value };
        }

        let keys = key.split(".");
        let firstKey = keys.shift();
        return {
            ...obj,
            [firstKey]: spreadAnyDepth(
                obj[firstKey] || {},
                keys.join("."),
                value
            ),
        };
    };

    const handleValueChange = (ev) => {
        if (
            !(
                ev.target instanceof HTMLInputElement ||
                ev.target instanceof HTMLSelectElement
            )
        )
            return;

        setSchool(spreadAnyDepth(school, ev.target.name, ev.target.value));
    };

    const handleCheckboxValueChange = (ev) => {
        if (!(ev.target instanceof HTMLInputElement)) return;

        setSchool(spreadAnyDepth(school, ev.target.name, ev.target.checked));
    };

    const handleNumericValueChange = (ev) => {
        if (!(ev.target instanceof HTMLInputElement)) return;

        if (ev.target.value === "") {
            setSchool(spreadAnyDepth(school, ev.target.name, ""));
            return;
        }

        let val = parseInt(ev.target.value);
        setSchool(spreadAnyDepth(school, ev.target.name, val));
    };

    const handleSubmit = (ev) => {
        ev.preventDefault();
        fetch(`/api/schools`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(school),
        })
            .then((res) => {
                if (!res.ok) throw { status: res.status, msg: res.statusText };
                return res.json();
            })
            .then((data) => {
                showServerResponse("success", "School saved successfully");
            })
            .catch((err) => {
                showServerResponse("danger", err.msg);
            });
    };

    let categoryClass = "";
    useMemo(() => {
        switch (school.category) {
            case "MS":
                categoryClass = "bg-primary text-white";
                break;
            case "AHS":
                categoryClass = "bg-secondary text-white";
                break;
        }
    }, [school]);

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3 col-3" controlId="schoolFormCode">
                    <Form.Label>Code</Form.Label>
                    <Form.Control
                        name="code"
                        type="number"
                        min="100000"
                        max="999999"
                        value={school.code || ""}
                        onChange={(ev) => {
                            handleNumericValueChange(ev);
                            let schoolData = schools[ev.target.value];
                            if (schoolData) {
                                setSchool({
                                    ...school,
                                    title: schoolData.name,
                                    address: {
                                        zipCode: parseInt(schoolData.plz),
                                        city: schoolData.ort,
                                        street: schoolData.str,
                                    },
                                    code: parseInt(ev.target.value),
                                });
                            }
                        }}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="schoolFormTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        name="title"
                        type="text"
                        value={school.title || ""}
                        onChange={handleValueChange}
                    />
                </Form.Group>
                <Form.Group
                    className="mb-3 col-3"
                    controlId="schoolFormCategory">
                    <Form.Label>Category</Form.Label>
                    <Form.Select
                        name="category"
                        value={school.category || ""}
                        className={categoryClass}
                        onChange={handleValueChange}>
                        <option value="">Select Category</option>
                        <option value="AHS">AHS</option>
                        <option value="BHS">BHS</option>
                        <option value="MS">MS</option>
                    </Form.Select>
                </Form.Group>
                <p className="fs-4 mb-0">Address</p>
                <div className="ps-4 border-start">
                    <Form.Group
                        className="mb-3"
                        controlId="schoolFormAddressStreet">
                        <Form.Label>Street</Form.Label>
                        <Form.Control
                            name="address.street"
                            type="text"
                            value={school.address?.street || ""}
                            onChange={handleValueChange}
                        />
                    </Form.Group>
                    <div className="d-flex flex-row justify-content-between">
                        <Form.Group
                            className="mb-3 col-3"
                            controlId="schoolFormAddressZipCode">
                            <Form.Label>Zip Code</Form.Label>
                            <Form.Control
                                name="address.zipCode"
                                type="number"
                                min="1000"
                                max="9999"
                                value={school.address?.zipCode || ""}
                                onChange={handleNumericValueChange}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3 col-8"
                            controlId="schoolFormAddressCity">
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                name="address.city"
                                type="text"
                                value={school.address?.city || ""}
                                onChange={handleValueChange}
                            />
                        </Form.Group>
                    </div>
                </div>
                <div className="row text-center d-flex flex-row gap-2">
                    <div className="col-3">
                        <Button
                            className="btn btn-lg btn-danger"
                            type="reset"
                            onClick={() => setSchool({})}>
                            Reset
                        </Button>
                    </div>

                    <div className="col-3">
                        <Button className="btn btn-lg" type="submit">
                            Save
                        </Button>
                    </div>
                </div>
            </Form>
            {serverResponse && (
                <>
                    <div
                        className={`rounded mt-4 border border-${serverResponse.status} bg-${serverResponse.status} py-2 px-3 text-white`}>
                        <h3>
                            {serverResponse.status == "success"
                                ? "Success"
                                : "Error"}
                        </h3>
                        {serverResponse.msg}
                    </div>
                </>
            )}
        </div>
    );
}

export default SchoolForm;
