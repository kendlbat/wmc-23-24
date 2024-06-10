import React from "react";
import Table from "react-bootstrap/esm/Table";
import Form from "react-bootstrap/esm/Form";
import { Button } from "react-bootstrap";

function SchoolEditForm({ school, setSchool }) {
    const [editedSchool, setEditedSchool] = React.useState({ ...school });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setEditedSchool({ ...editedSchool, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(`/api/schools/${school._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "if-match": school.__v,
            },
            body: JSON.stringify(editedSchool),
        })
            .then((resp) => {
                if (!resp.ok) {
                    throw new Error("Failed to save school");
                }
                return resp.json();
            })
            .then((data) => {
                setSchool(data);
            })
            .catch((err) => {
                console.error(err);
                alert("Failed to save school");
            });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Code</Form.Label>
                <Form.Control
                    name="code"
                    value={editedSchool.code}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                    name="title"
                    value={editedSchool.title}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Address</Form.Label>
                <Form.Control
                    name="address.street"
                    value={editedSchool.address.street}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Zip Code</Form.Label>
                <Form.Control
                    name="address.zipCode"
                    value={editedSchool.address.zipCode}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>City</Form.Label>
                <Form.Control
                    name="address.city"
                    value={editedSchool.address.city}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Category</Form.Label>
                <Form.Control
                    name="category"
                    value={editedSchool.category}
                    onChange={handleChange}
                />
            </Form.Group>
            <div className="mt-2 d-flex flex-row gap-2">
                <Button type="submit">Save</Button>
                <Button
                    type="button"
                    onClick={() => setSchool(null)}
                    variant="warning">
                    Cancel
                </Button>
            </div>
        </Form>
    );
}

function Schools() {
    const [schools, setSchools] = React.useState([]);
    const [selectedSchool, setSelectedSchool] = React.useState(null);

    React.useEffect(() => {
        fetch("/api/schools")
            .then((resp) => resp.json())
            .then((data) => setSchools(data));
    }, []);

    const formComponent = selectedSchool ? (
        <SchoolEditForm
            key={selectedSchool?._id || "undefined"}
            school={selectedSchool}
            setSchool={(school) => {
                if (!school) return setSelectedSchool(null);
                setSchools(
                    schools.map((s) => (s._id === school._id ? school : s))
                );
                setSelectedSchool(null);
            }}
        />
    ) : (
        <>Click a row to select a school to edit.</>
    );

    return (
        <>
            <Table>
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Title</th>
                        <th>Address</th>
                        <th>Category</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {schools.map((school) => (
                        <tr
                            style={{
                                cursor: "pointer",
                            }}
                            key={school._id}>
                            <td>{school.code}</td>
                            <td>{school.title}</td>
                            <td>{`${school.address.street}, ${school.address.zipCode} ${school.address.city}`}</td>
                            <td>{school.category}</td>
                            <td>
                                <div className="d-flex flex-row gap-1">
                                    <Button
                                        onClick={() =>
                                            setSelectedSchool(school)
                                        }>
                                        <i className="bi bi-pencil"></i>
                                    </Button>
                                    <Button
                                        variant="danger"
                                        onClick={() => {
                                            if (
                                                !window.confirm(
                                                    `Are you sure you want to delete ${school.title}?`
                                                )
                                            )
                                                return;

                                            fetch(
                                                `/api/schools/${school._id}`,
                                                {
                                                    method: "DELETE",
                                                }
                                            )
                                                .then((resp) => {
                                                    if (!resp.ok) {
                                                        throw new Error(
                                                            "Failed to delete school"
                                                        );
                                                    }
                                                })
                                                .then(() => {
                                                    setSchools(
                                                        schools.filter(
                                                            (s) =>
                                                                s._id !==
                                                                school._id
                                                        )
                                                    );
                                                })
                                                .catch((err) => {
                                                    console.error(err);
                                                    alert(
                                                        "Failed to delete school"
                                                    );
                                                });
                                        }}>
                                        <i className="bi bi-trash"></i>
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {formComponent}
        </>
    );
}

export default Schools;
