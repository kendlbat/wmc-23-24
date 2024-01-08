import Gallery from "./Gallery";
import Profile from "./Profile";
import TodoList from "./TodoList";

import "./MyFirstApp.css";

export default function MyFirstApp() {
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
        </>
    );
}
