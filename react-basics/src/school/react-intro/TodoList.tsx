import React from "react";

const TodoList: React.FunctionComponent<{
    person?: Partial<{
        name: string;
        theme: Partial<{
            backgroundColor: string;
            color: string;
        }>;
        avatarUrl: string;
        todo: string[];
    }>;
}> = ({ person }) => {
    if (!person) person = {};
    if (!person.avatarUrl)
        person.avatarUrl = "https://i.imgur.com/yXOvdOSs.jpg";
    if (!person.name) person.name = "Hedy Lamarr";
    if (!person.theme) person.theme = {};
    if (!person.theme.color) person.theme.color = "black";
    if (!person.theme.backgroundColor)
        person.theme.backgroundColor = "rgba(0, 0, 0, 0)";
    if (!person.todo)
        person.todo = [
            "Invent new traffic lights",
            "Rehearse a movie scene",
            "Improve the spectrum technology",
        ];

    return (
        <div style={person.theme}>
            <h3>{person.name}&apos;s Todos</h3>
            <img src={person.avatarUrl} alt={person.name} className="avatar" />
            <ul>
                {person.todo.map((todo) => (
                    <li key={todo}>{todo}</li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
