import React from "react";
import Gallery from "./Gallery";
import Profile from "./Profile";
import TodoList from "./TodoList";

import "./MyFirstApp.css";

const MyFirstApp: React.FunctionComponent = () => {
    return (
        <>
            <h1>MyFirstApp</h1>
            <div className="border-top m-3 p-2">
                <h2>Single component</h2>
                <Profile></Profile>
            </div>

            <div className="border-top m-3 p-2">
                <h2>Nested component</h2>
                <Gallery></Gallery>
            </div>

            <div className="border-top m-3 p-2">
                <h2>More complex component</h2>
                <TodoList></TodoList>
            </div>

            <div className="border-top m-3 p-2">
                <h2>More complex component w/ props</h2>
                <TodoList
                    person={{
                        name: "Gregorio Y. Zara",
                        avatarUrl: "https://i.imgur.com/7vQD0fPs.jpg",
                        theme: { color: "pink", backgroundColor: "black" },
                        todo: ["Be cool", "Invent stuff"],
                    }}></TodoList>
            </div>
        </>
    );
};
export default MyFirstApp;
