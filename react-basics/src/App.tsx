import "./App.css";

import { useState } from "react";
import React from "react";

import TaskCard, { Task } from "./TaskCard";
import Placeholder from "./Placeholder";
import ColumnVisibilityControl from "./ColumnVisibilityControl";

import MyFirstApp from "./school/react-intro/MyFirstApp";

import HomeworkEightA from "./homework/h08a-react-nested-components-and-props/HomeworkEightA";
import HomeworkEightB from "./homework/h08b-react-rendering-and-state/HomeworkEightB";

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
            key: "h08a",
            title: "h08a",
            desc: "React nested components and props",
            component: <HomeworkEightA />,
        },
        {
            key: "h08b",
            title: "h08b",
            desc: "React rendering and state",
            component: <HomeworkEightB />,
        },
    ];

    function openTask(task: Task) {
        setCurrentTask(task);
    }

    const [currentTask, setCurrentTask] = useState<Task>();
    const [columnsToShow, setColumnsToShow] = useState({
        showHome: true,
        showSchool: true,
        showComponent: true,
    });

    const changeColumnToShow: React.ChangeEventHandler<HTMLInputElement> =
        function (event) {
            const newState = { ...columnsToShow };

            switch (event.target.id) {
                case "showSchool":
                    newState.showSchool = !newState.showSchool;
                    break;
                case "showHome":
                    newState.showHome = !newState.showHome;
                    break;
                case "showComponent":
                    newState.showComponent = !newState.showComponent;
                    break;
                default:
                    throw new TypeError("Invalid event target id!");
            }

            setColumnsToShow(newState);
        };

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
                            {currentTask?.key && (
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
