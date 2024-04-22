import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import FormCheck from "react-bootstrap/FormCheck";

/**
 * @type {React.FC}
 */
const ToursTable = () => {
    const [tours, setTours] = useState([
        /* {
            _id: "6625fd373de76fdfeabdf88da",
            guideName: "Stacy Schmidt",
            guideClass: "3BHIF",
            numPersons: 4,
            registration: true,
            __v: 0,
        },
        {
            _id: "6625fd383de7fdfeabdf88de",
            guideName: "Emily Davis",
            guideClass: "3BHIF",
            numPersons: 3,
            registration: false,
            __v: 0,
        }, */
    ]);

    useEffect(() => {
        console.log("loading tours from server");

        fetch(`/api/toursa`)
            .then((res) => {
                if (!res.ok || res.status !== 200)
                    throw {
                        status: res.status,
                        msg: res.statusText,
                    };
                return res.json();
            })
            .then(setTours)
            .catch((err) => {
                console.error(err);
                alert("ups");
            });
    }, []);

    return (
        <Table striped hover bordered>
            <thead>
                <tr>
                    <th>Guide</th>
                    <th>Class</th>
                    <th># Persons</th>
                    <th>Registration</th>
                </tr>
            </thead>
            <tbody>
                {tours.map((tour) => (
                    <tr key={tour._id}>
                        <td>{tour.guideName}</td>
                        <td>{tour.guideClass}</td>
                        <td>{tour.numPersons}</td>
                        <td>
                            <FormCheck
                                readOnly
                                checked={tour.registration}></FormCheck>
                        </td>
                    </tr>
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <th>Total: {tours.length}</th>
                    <th></th>
                    <th>
                        {Math.min(...tours.map((t) => t.numPersons))} -{" "}
                        {Math.max(...tours.map((t) => t.numPersons))}
                    </th>
                    <th>{tours.filter((t) => t.registration).length}</th>
                </tr>
            </tfoot>
        </Table>
    );
};

ToursTable.propTypes = {};

export default ToursTable;
