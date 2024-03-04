import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";
import Spinner from "react-bootstrap/Spinner";

import { type EmployeesType, fetchEmployees } from "./api";

const EmployeeList: React.FC = () => {
    const [employees, setEmployees] = useState<EmployeesType>([]);
    const [page, setPage] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const pagesize = 10;

    useEffect(() => {
        setIsLoading(true);
        fetchEmployees(page, pagesize).then((data) => {
            setIsLoading(false);
            setEmployees(data);
        });
    }, [page]);

    return (
        <div>
            {/* not the best approach - but ok to demonstrate useEffect with the dependency - array */}
            <h2>Employee List</h2>
            <Pagination>
                <Pagination.Prev
                    disabled={page == 0}
                    onClick={() => setPage((p) => p - 1)}
                />
                <Pagination.Item active>{page + 1}</Pagination.Item>
                <Pagination.Item>{page + 2}</Pagination.Item>
                <Pagination.Item>{page + 3}</Pagination.Item>
                <Pagination.Ellipsis />
                <Pagination.Next
                    disabled={employees.length < pagesize}
                    onClick={() => setPage((p) => p + 1)}
                />
            </Pagination>

            <Table striped hover>
                <thead>
                    <tr>
                        <th>Nr</th>
                        <th>User</th>
                        <th>Name</th>
                    </tr>
                </thead>

                <tbody>
                    {isLoading ? (
                        <tr>
                            <td colSpan={3}>
                                <Spinner animation="grow" />
                            </td>
                        </tr>
                    ) : (
                        employees.map((e) => (
                            <tr key={e.id}>
                                <td>{e.email}</td>
                                <td>{e.username}</td>
                                <td>{e.profile.name}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </Table>
        </div>
    );
};

export default EmployeeList;
