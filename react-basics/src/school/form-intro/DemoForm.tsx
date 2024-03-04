import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const DemoForm: React.FC = () => {
    const [user, setUser] = useState<{
        username: string;
        lastname: string;
    }>({
        username: "",
        lastname: "",
    });

    return (
        <Form
            onSubmit={() => {
                alert(JSON.stringify(user));
            }}
            action="javascript:void(0);">
            <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control
                    name="username"
                    type="text"
                    value={user.username}
                    onChange={(e) => {
                        setUser({ ...user, username: e.target.value });
                    }}></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Lastname</Form.Label>
                <Form.Control
                    name="lastname"
                    type="text"
                    value={user.lastname}
                    onChange={(e) =>
                        setUser({ ...user, lastname: e.target.value })
                    }></Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
};

export default DemoForm;
