import React from "react";
import Table from "react-bootstrap/Table";
import { Pupil } from "./types";

const PupilList: React.FC<{
    data: Array<Pupil>;
    selectedPupil: Pupil;
    setSelectedPupil: (pupil: Pupil) => void;
}> = ({ data, selectedPupil, setSelectedPupil }) => {
    return (
        <div>
            <h2>Pupil List</h2>
            <Table striped hover>
                <thead>
                    <tr>
                        <th></th>
                        <th>Firstname</th>
                        <th>Lastname</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((pupil) => (
                        <tr
                            key={pupil.id}
                            onClick={() => setSelectedPupil(pupil)}>
                            <td>
                                <input
                                    type="radio"
                                    name="selectedRow"
                                    checked={selectedPupil.id === pupil.id}
                                    readOnly
                                />
                            </td>
                            <td>{pupil.firstname}</td>
                            <td>{pupil.lastname}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default PupilList;
