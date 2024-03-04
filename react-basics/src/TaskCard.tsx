import React from "react";

export interface Task {
    title: string;
    desc?: string;
    key: string;
    component: React.ReactElement;
}

const TaskCard: React.FunctionComponent<{
    task: Task;
    onClick: (task: Task) => unknown;
}> = function ({ task, onClick }) {
    return (
        <div className="card " role="button" onClick={() => onClick(task)}>
            <div className="card-body p-2">
                <h6 className="card-title">{task.title}</h6>
                <p className="card-text">
                    <small>{task.desc}</small>
                </p>
            </div>
        </div>
    );
};

export default TaskCard;
