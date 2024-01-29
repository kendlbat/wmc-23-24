import "./App.css";

import { useState } from "react";

import TaskCard from "./TaskCard.jsx";
import Placeholder from "./Placeholder.jsx";
import ColumnVisibilityControl from "./ColumnVisibilityControl.jsx";

import MyFirstApp from "./school/react-intro/MyFirstApp.js";

export default function App() {
    const SCHOOLS_TASKS = [
        {
            key: "s02",
            title: "Placeholder 02",
            component: <Placeholder />,
        },
        {
            key: "s01",
            title: "React Intro",
            desc: "Based on React Tutorial",
            component: <MyFirstApp />,
        },
    ];

    const HOME_TASKS = [
        {
            key: "h02",
            title: "Placeholder 02",
            component: <Placeholder />,
        },
        {
            key: "h01",
            title: "Placeholder 01",
            component: <Placeholder />,
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
                    <h1>WMC4 - React Basics 2024</h1>
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
                                    {currentTask.component}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
