import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function TourForm() {
    const [tour, setTour] = useState({
        guideName: "",
        guideClass: "",
        numPersons: NaN,
        registration: false,
    });

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
            .then(console.log)
            .catch(console.error);
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
                            value={tour.guideName ? tour.guideName : ""}
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
                        value={tour.guideClass ? tour.guideClass : ""}
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
                            value={tour.numPersons ? tour.numPersons : ""}
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
                            checked={tour.registration}
                            onChange={handleCheckboxValueChange}
                        />
                    </Form.Group>
                </div>
            </div>
            <div className="row text-center">
                <div className="col-3">
                    <Button className="btn btn-lg btn-light" type="button">
                        Back
                    </Button>
                </div>

                <div className="col-3">
                    <Button className="btn btn-lg" type="submit">
                        Save
                    </Button>
                </div>
            </div>
        </Form>
    );
}

export default TourForm;
