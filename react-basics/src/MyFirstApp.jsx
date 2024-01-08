import Gallery from "./Gallery";
import Profile from "./Profile";

export default function MyFirstApp() {
    return (
        <>
            <h1>MyFirstApp</h1>
            <h2>Single component</h2>
            <Profile></Profile>

            <h2>Nested component</h2>
            <Gallery></Gallery>
        </>
    );
}
