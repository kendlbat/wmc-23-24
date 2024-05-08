import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";

function TourForm({ returnToTable }) {
    const [tour, setTour] = useState({});
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

    const handleSubmit = (ev) => {
        ev.preventDefault();
        fetch(`/api/tours`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(tour),
        })
            .then((res) => {
                if (!res.ok) throw { status: res.status, msg: res.statusText };
                return res.json();
            })
            .then((data) => {
                showServerResponse("success", "Tour saved successfully");
            })
            .catch((err) => {
                showServerResponse("danger", err.msg);
            });
    };

    const handleValueChange = (ev) => {
        if (
            !(
                ev.target instanceof HTMLInputElement ||
                ev.target instanceof HTMLSelectElement
            )
        )
            return;

        setTour({ ...tour, [ev.target.name]: ev.target.value });
    };

    const handleCheckboxValueChange = (ev) => {
        if (!(ev.target instanceof HTMLInputElement)) return;

        setTour({ ...tour, [ev.target.name]: ev.target.checked });
    };

    const handleNumericValueChange = (ev) => {
        if (!(ev.target instanceof HTMLInputElement)) return;

        let val = parseFloat(ev.target.value);
        if (isNaN(val)) return;
        setTour({ ...tour, [ev.target.name]: val });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <div className="row">
                {/* GuideName */}
                <div className="col-12 col-md-6">
                    <Form.Group className="mb-3" controlId="tourFormGuideName">
                        <Form.Label>Guide Name</Form.Label>
                        <Form.Control
                            name="guideName"
                            type="text"
                            value={tour.guideName || ""}
                            onChange={handleValueChange}
                        />
                    </Form.Group>
                </div>
            </div>
            <div className="col-6 col-md-4">
                <Form.Group className="mb-3" controlId="tourFormGuideClass">
                    <Form.Label>Guide Class</Form.Label>
                    <Form.Select
                        name="guideClass"
                        value={tour.guideClass || ""}
                        onChange={handleValueChange}>
                        <option>Select Class</option>
                        <option value="4AHIF">4AHIF</option>
                        <option value="4BHIF">4BHIF</option>
                    </Form.Select>
                </Form.Group>
            </div>
            <div className="row">
                <div className="col-6 col-md-4">
                    <Form.Group className="mb-3" controlId="tourFormNumPersons">
                        <Form.Label>Num Persons</Form.Label>
                        <Form.Control
                            min="1"
                            max="8"
                            name="numPersons"
                            type="number"
                            value={tour.numPersons || ""}
                            onChange={handleNumericValueChange}
                        />
                    </Form.Group>
                </div>
                <div className="col-6 col-md-4">
                    <Form.Group
                        className="mb-3"
                        controlId="tourFormRegistration">
                        <Form.Label>Registration</Form.Label>
                        <Form.Check
                            type="checkbox"
                            name="registration"
                            checked={tour.registration || false}
                            onChange={handleCheckboxValueChange}
                        />
                    </Form.Group>
                </div>
            </div>
            <div className="row text-center">
                <div className="col-3">
                    <Button
                        className="btn btn-lg btn-light"
                        type="button"
                        onClick={() => returnToTable()}>
                        Back
                    </Button>
                </div>

                <div className="col-3">
                    <Button
                        className="btn btn-lg btn-danger"
                        type="reset"
                        onClick={() => setTour({})}>
                        Reset
                    </Button>
                </div>

                <div className="col-3">
                    <Button className="btn btn-lg" type="submit">
                        Save
                    </Button>
                </div>
            </div>
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
        </Form>
    );
}

TourForm.propTypes = {
    returnToTable: PropTypes.func.isRequired,
};

export default TourForm;
