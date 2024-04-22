import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import FormCheck from "react-bootstrap/FormCheck";

/**
 * @type {React.FC}
 */
const SchoolsTable = () => {
    const [schools, setSchools] = useState([
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
        console.log("loading schools from server");

        fetch(`/api/schools`)
            .then((res) => {
                if (!res.ok || res.status !== 200)
                    throw {
                        status: res.status,
                        msg: res.statusText,
                    };
                return res.json();
            })
            .then(setSchools)
            .catch((err) => {
                console.error(err);
                alert("ups");
            });
    }, []);

    return (
        <Table striped hover bordered>
            <thead>
                <tr>
                    <th>Code</th>
                    <th>Title</th>
                    <th>Category</th>
                </tr>
            </thead>
            <tbody>
                {schools.map((school) => {
                    let categoryClass = "";
                    switch (school.category) {
                        case "MS":
                            categoryClass = "table-primary";
                            break;
                        case "AHS":
                            categoryClass = "table-secondary";
                            break;
                    }
                    return (
                        <tr key={school._id} className={categoryClass}>
                            <td>{school.code}</td>
                            <td>{school.title}</td>
                            <td>{school.category}</td>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
};

SchoolsTable.propTypes = {};

export default SchoolsTable;
