import React from "react";

const TodoList: React.FunctionComponent<{
    person: {
        name: string;
        theme: {
            backgroundColor: string;
            color: string;
        };
        avatarUrl: string;
    };
}> = ({
    person = {
        name: "Hedy Lamarr",
        avatarUrl: "https://i.imgur.com/yXOvdOSs.jpg",
        theme: {
            color: "pink",
            backgroundColor: "black",
        },
    },
}) => {
    return (
        <div style={person.theme}>
            <h3>{person.name}&apos;s Todos</h3>
            <img src={person.avatarUrl} alt={person.name} className="avatar" />
            <ul>
                <li>Invent new traffic lights</li>
                <li>Rehearse a movie scene</li>
                <li>Improve the spectrum technology</li>
            </ul>
        </div>
    );
};

export default TodoList;
