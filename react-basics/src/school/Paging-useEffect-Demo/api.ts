import PUPILS from "./data/Pupils.json";
import EMPLOYEES from "./data/Employees.json";
const NUMBERED_EMPLOYEES = EMPLOYEES.map((e, idx) => ({ ...e, nr: idx + 1 }));

export type EmployeesType = typeof EMPLOYEES;

/* faked API call (asynchronous) */
function fetchPupils() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(PUPILS);
        }, (Math.random() + 0.5) * 1000);
    });
}

/* faked API call with page and size (asynchronous) */
function fetchEmployees(page: number, size: number): Promise<typeof EMPLOYEES> {
    // demo to show that the missing cleanup function causes a problem (known issue)
    const delay = (Math.random() + 0.5) * 1000;
    // const delay = 100;
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(NUMBERED_EMPLOYEES.slice(page * size, (page + 1) * size));
        }, delay);
    });
}

export { fetchPupils, fetchEmployees };
