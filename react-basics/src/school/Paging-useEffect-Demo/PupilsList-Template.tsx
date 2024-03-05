import React, { useState } from "react";
import { Table } from "react-bootstrap";

const PupilsList: React.FC = () => {
    const [pupils] = useState<
        Array<{ id: string; firstname: string; lastname: string }>
    >([]);

    return (
        <div>
            <h2>Pupil List</h2>
            <Table striped hover>
                <thead>
                    <tr>
                        <th>Firstname</th>
                        <th>Lastname</th>
                    </tr>
                </thead>
                <tbody>
                    {pupils.map((pupil) => (
                        <tr key={pupil.id}>
                            <td>{pupil.firstname}</td>
                            <td>{pupil.lastname}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default PupilsList;
