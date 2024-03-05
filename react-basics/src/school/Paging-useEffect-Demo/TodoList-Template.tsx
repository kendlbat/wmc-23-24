// Docu-Link:
// https://react.dev/learn/synchronizing-with-effects
// useEffect(setup, dependencies?)

// Translation

// Die setup function enthält die Logik des Effekts.
// Die setup function kann optional auch eine cleanUp function zurückgeben (Returnwert).
// Wenn die Komponente dem DOM hinzugefügt wird, führt React
// die setup function aus.

// Nach jedem Render-Vorgang (weil sich dependencies geändert haben),
// führt mit geänderten Abhängigkeiten wird React zuerst cleanUp function (falls vorhanden) mit den alten Werten ausführen
// und (wieder) die setup function mit den neuen Werten aufrufen.
// Wird die Komponente aus dem DOM entfernt, wird die cleanup - function ebenfalls aufgerufen.

// https://jsonplaceholder.typicode.com/todos

import React, { useState } from "react";
import { Table } from "react-bootstrap";

const TodoList: React.FC = () => {
    const [todos] = useState<
        Array<{
            id: string;
            title: string;
            completed: boolean;
        }>
    >([]);

    return (
        <div>
            <h2>Pupil List</h2>
            <Table striped hover>
                <thead>
                    <tr>
                        <th>title</th>
                        <th>completed</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map((todo) => (
                        <tr key={todo.id}>
                            <td>{todo.title}</td>
                            <td>{todo.completed}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default TodoList;
