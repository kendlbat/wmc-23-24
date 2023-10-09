const fs = require("fs");
const fsPromises = fs.promises;

fsPromises.readFile("user-info.json")
    .then((buffer) => buffer.toString())
    .then((raw) => JSON.parse(raw))
    .then((data) => fetch(`https://gitlab.com/api/v4/users?username=${data.name}`))
    .then((response) => response.json())
    .then((gitUser) => fsPromises.writeFile("gitlab-info.json", gitUser))
    .catch(console.error);