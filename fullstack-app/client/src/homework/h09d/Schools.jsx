import React, { useEffect } from "react";
import Table from "react-bootstrap/esm/Table";
import Form from "react-bootstrap/esm/Form";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";

const spreadAnyDepth = (obj, key, value) => {
    if (key.indexOf(".") === -1) {
        return { ...obj, [key]: value };
    }

    let keys = key.split(".");
    let firstKey = keys.shift();
    return {
        ...obj,
        [firstKey]: spreadAnyDepth(obj[firstKey] || {}, keys.join("."), value),
    };
};

function SchoolEditForm({ school, setSchool }) {
    const [editedSchool, setEditedSchool] = React.useState({
        ...(school ? school : {}),
    });

    useEffect(() => {
        setEditedSchool({ ...(school ? school : {}) });
    }, [school]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setEditedSchool(spreadAnyDepth(editedSchool, name, value));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!editedSchool?._id) {
            fetch(`/api/schools`, {
                method: "POST",
                body: JSON.stringify(editedSchool),
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((resp) => {
                    if (!resp.ok) {
                        throw new Error("Failed to save school");
                    }
                    return resp.json();
                })
                .then((data) => {
                    setSchool(data);
                    setEditedSchool({});
                })
                .catch((err) => {
                    console.error(err);
                    alert("Failed to save school");
                });
        } else
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
                    setEditedSchool({});
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
                    value={editedSchool.code || ""}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                    name="title"
                    value={editedSchool.title || ""}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Address</Form.Label>
                <Form.Control
                    name="address.street"
                    value={editedSchool.address?.street || ""}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Zip Code</Form.Label>
                <Form.Control
                    name="address.zipCode"
                    value={editedSchool.address?.zipCode || ""}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>City</Form.Label>
                <Form.Control
                    name="address.city"
                    value={editedSchool.address?.city || ""}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Category</Form.Label>
                <Form.Control
                    name="category"
                    value={editedSchool.category || ""}
                    onChange={handleChange}
                />
            </Form.Group>
            <div className="mt-2 d-flex flex-row gap-2">
                <Button type="submit">
                    {editedSchool?._id ? "Save" : "Create"}
                </Button>
                <Button
                    type="button"
                    onClick={() => setEditedSchool({})}
                    variant="warning">
                    {editedSchool?._id ? "Cancel" : "Clear"}
                </Button>
            </div>
            <p>You are in {editedSchool?._id ? "edit" : "create"} mode.</p>
        </Form>
    );
}

SchoolEditForm.propTypes = {
    school: PropTypes.object,
    setSchool: PropTypes.func,
};

function Schools() {
    const [schools, setSchools] = React.useState([]);
    const [selectedSchool, setSelectedSchool] = React.useState({});

    React.useEffect(() => {
        fetch("/api/schools")
            .then((resp) => resp.json())
            .then((data) => setSchools(data));
    }, []);

    const formComponent = selectedSchool._id ? (
        <SchoolEditForm
            key={selectedSchool._id}
            school={selectedSchool}
            setSchool={(school) => {
                setSchools(
                    schools.map((s) => (s._id === school._id ? school : s))
                );
                setSelectedSchool({});
            }}
        />
    ) : (
        <SchoolEditForm
            setSchool={(school) => {
                setSchools([...schools, school]);
            }}
        />
    );

    return (
        <>
            <Table striped bordered hover>
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
                    {schools.map((school, idx) => (
                        <tr
                            style={{
                                cursor: "pointer",
                            }}
                            key={school?._id || idx}>
                            <td>{school?.code}</td>
                            <td>{school?.title}</td>
                            <td>{`${school?.address?.street}, ${school?.address?.zipCode} ${school?.address?.city}`}</td>
                            <td>{school?.category}</td>
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
