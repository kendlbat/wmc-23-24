import React from "react";
import ClickTracker from "./ClickTracker";
import StartingList from "./StartingList";
import * as boatData from "./data/StartingList-data";
import TaskList from "./TaskList";
import * as taskData from "./data/TaskList-data";

const HomeworkNine: React.FC = () => {
    return (
        <>
            <h2>Click Tracker</h2>
            <ClickTracker />
            <h2 className="mt-4">Starting List</h2>
            <StartingList
                boats={boatData.BOATS}
                boatClasses={boatData.BOATCLASSES}
            />
            <h2 className="mt-4">Task List</h2>
            <TaskList
                tasks={taskData.TASKS}
                colors={taskData.TASKPRIO_COLORS}
            />
        </>
    );
};

export default HomeworkNine;
