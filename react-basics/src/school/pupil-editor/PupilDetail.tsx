import React, { useMemo, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Pupil } from "./types";

const PupilDetail: React.FC<{
    pupil: Pupil;
    setPupil: (pupil: Pupil) => void;
}> = ({ pupil, setPupil }) => {
    const [tmpPupil, setTmpPupil] = useState<Pupil>(pupil);

    useMemo(() => {
        setTmpPupil(pupil);
    }, [pupil]);

    const handleChange: React.ChangeEventHandler = (e) => {
        const { name, value } = e.target as HTMLInputElement;
        setTmpPupil({ ...pupil, [name]: value });
    };

    return (
        <div>
            <h2>Pupil Detail</h2>
            <Form
                onSubmit={() => {
                    setPupil(tmpPupil);
                }}
                action="javascript:void(0);">
                <Form.Group className="mb-3">
                    <Form.Label>Id (readonly)</Form.Label>
                    <Form.Control
                        type="text"
                        name="firstname"
                        value={tmpPupil.id}
                        readOnly
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Firstname</Form.Label>
                    <Form.Control
                        type="text"
                        name="firstname"
                        value={tmpPupil.firstname}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Lastname</Form.Label>
                    <Form.Control
                        type="text"
                        name="lastname"
                        value={tmpPupil.lastname}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Update Record
                </Button>
            </Form>
        </div>
    );
};

export default PupilDetail;
