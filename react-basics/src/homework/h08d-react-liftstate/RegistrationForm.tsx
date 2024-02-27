import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Boat, { isBoat } from "./model/Boat";

const RegistrationForm: React.FC<{
    addBoat: (boat: Boat) => void;
}> = ({ addBoat }) => {
    const [boat, setBoat] = useState<Partial<Boat>>({});

    const handleChange: React.ChangeEventHandler = (e) => {
        const { name, value } = e.target as HTMLInputElement;
        setBoat({ ...boat, [name]: value });
    };

    return (
        <Form
            onSubmit={() => {
                const b = { ...boat, number: 0 };
                if (isBoat(b)) {
                    addBoat(b);
                    setBoat({});
                }
            }}
            action="javascript:void(0);">
            <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    name="name"
                    value={boat.name || ""}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Skipper</Form.Label>
                <Form.Control
                    type="text"
                    name="skipper"
                    value={boat.skipper || ""}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Cruiser</Form.Label>
                <Form.Check
                    type="checkbox"
                    name="cruiser"
                    checked={boat.cruiser || false}
                    onChange={(e) => {
                        const { name, checked } = e.target as HTMLInputElement;
                        setBoat({ ...boat, [name]: checked });
                    }}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Length</Form.Label>
                <Form.Control
                    type="text"
                    name="lengthInM"
                    value={boat.lengthInM || ""}
                    isInvalid={isNaN(boat.lengthInM || NaN)}
                    onChange={(e) => {
                        const { value } = e.target as HTMLInputElement;
                        setBoat({ ...boat, lengthInM: parseFloat(value) });
                    }}
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Add Boat
            </Button>
        </Form>
    );
};

export default RegistrationForm;
