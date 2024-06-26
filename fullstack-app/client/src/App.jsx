import "./App.css";

import { Suspense, lazy, useState } from "react";

import TaskCard from "./TaskCard";
const Placeholder = lazy(() => import("./Placeholder.jsx"));
const ToursTable = lazy(() => import("./school/ToursTable.jsx"));
const TourForm = lazy(() => import("./school/TourForm.jsx"));
const SchoolsTable = lazy(() => import("./homework/h09b/SchoolsTable.jsx"));
const HomeworkNineC = lazy(() => import("./homework/h09c/HomeworkNineC.jsx"));
const HomeworkNineD = lazy(() => import("./homework/h09d/Schools.jsx"));
import ColumnVisibilityControl from "./ColumnVisibilityControl.jsx";

export default function App() {
    const SCHOOLS_TASKS = [
        {
            key: "s01",
            title: "Tours",
            component: <ToursTable />,
        },
        {
            key: "s02",
            title: "TourForm",
            component: <TourForm />,
        },
    ];

    const HOME_TASKS = [
        {
            key: "h09b",
            title: "h09b",
            desc: "SchoolsTable",
            component: <SchoolsTable />,
        },
        {
            key: "h09c",
            title: "h09c",
            desc: "TourFormExtension",
            component: <HomeworkNineC />,
        },
        {
            key: "h09d",
            title: "h09d",
            desc: "School Create / Edit",
            component: <HomeworkNineD />,
        },
    ];

    function openTask(task) {
        setCurrentTask(task);
    }

    const [currentTask, setCurrentTask] = useState({});
    const [columnsToShow, setColumnsToShow] = useState({
        showHome: true,
        showSchool: true,
        showComponent: true,
    });

    function changeColumnToShow(event) {
        const newState = { ...columnsToShow };
        newState[event.target.id] = !newState[event.target.id];

        setColumnsToShow(newState);
    }

    return (
        <div className="wmc4-app">
            <div className="row bg-dark text-white head-row align-items-center">
                <div className="col p-3">
                    <h1>
                        WMC4&nbsp;-&nbsp;Full&nbsp;Stack&nbsp;App&nbsp;-&nbsp;TDOT&nbsp;2024
                    </h1>
                </div>
                <div className="col p-3 text-end">
                    <ColumnVisibilityControl
                        columnsToShow={columnsToShow}
                        onColumnVisiblityChange={
                            changeColumnToShow
                        }></ColumnVisibilityControl>
                </div>
            </div>
            <div className="row content-row">
                {columnsToShow["showSchool"] && (
                    <div className="col-2 col-scrollable border-end">
                        <div className="p-3">
                            <h2>School</h2>
                            {SCHOOLS_TASKS.map((task) => (
                                <div key={task.key} className="mb-2">
                                    <TaskCard
                                        task={task}
                                        onClick={openTask}></TaskCard>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {columnsToShow["showHome"] && (
                    <div className="col-2 col-scrollable border-end">
                        <div className="p-3">
                            <h2>Home</h2>
                            {HOME_TASKS.map((task) => (
                                <div key={task.key} className="mb-2">
                                    <TaskCard
                                        task={task}
                                        onClick={openTask}></TaskCard>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {columnsToShow["showComponent"] && (
                    <div className="col col-scrollable border-end">
                        <div className="p-3">
                            {currentTask.key && (
                                <div>
                                    <h2>
                                        {currentTask.title} ({currentTask.key})
                                    </h2>
                                    <Suspense fallback={<p>Loading</p>}>
                                        {currentTask.component}
                                    </Suspense>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
