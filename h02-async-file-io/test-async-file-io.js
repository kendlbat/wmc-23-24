async function waitForStart() {
    await fetch("http://localhost:3000/hello");
}