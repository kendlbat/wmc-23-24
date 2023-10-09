const fs = require("fs");
const fsPromises = fs.promises;

fsPromises.readFile("user-info.json")
    .then((buffer) => buffer.toString())
    .then((raw) => JSON.parse(raw))
    .then((data) => fetch(`https://gitlab.com/api/v4/users?username=${data.name}`))
    .then((response) => response.json())
    .then((gitUsers) => fetch(gitUsers[0].avatar_url))
    .then((response) => response.arrayBuffer())
    .then((arrayBuffer) => Buffer.from(arrayBuffer))
    .then((image) => fsPromises.writeFile("myAvatar.png", image))
    .then(() => console.log("Successfully written!"))
    .catch(console.error);