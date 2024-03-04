import Task from "../model/Task";

const TASKS: Array<Task> = [
    { id: 1, text: "do It", prio: "HIGH" },
    { id: 2, text: "Less important", prio: "LOW" },
];
const TASKPRIO_COLORS = { HIGH: "#ff0032", LOW: "#ffff00" };

export { TASKS, TASKPRIO_COLORS };
