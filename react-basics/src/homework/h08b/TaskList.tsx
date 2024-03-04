import React from "react";
import Task from "./model/Task";

const TaskList: React.FC<{
    tasks: Array<Task>;
    colors: Record<Task["prio"], string>;
}> = ({ tasks, colors }) => {
    /*

    Implementieren Sie eine Unordered List <ul>, welche die übergebenen Tasks 
    als List Items <li> darstellt. 
    Die Verwendung der Komponente sieht wie folgt aus:

        <TaskList
            tasks={
                [{ id: 1, text: "do It", prio: "HIGH" },
                 { id: 2, text: "Less important", prio: "LOW" }]
            }
            colors={
                { HIGH: "#ff0032", LOW: "#ffff00" }
            } />
        
    Die Tasks sollen abhängig nach Task-Priorität farblich dargestellt werden.
    Die Tasks müssen NICHT nach Priorität sortiert werden.

    <ul>
        <li style="color:#ff0000;">do It - HIGH</li>
        <li style="color:#ffff00;">Less important - LOW</li>
    </ul>

    */
    return (
        <ul>
            {tasks.map((task) => (
                <li key={task.id} style={{ color: colors[task.prio] }}>
                    {task.text}
                </li>
            ))}
        </ul>
    );
};

export default TaskList;
