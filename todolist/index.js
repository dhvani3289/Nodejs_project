const express = require('express');
const port = 8485;
const server = express();
const path = require('path');

server.set('view engine', 'ejs');
server.use(express.urlencoded());

const tasks = [{ task: "jhed" }];
const completedTasks = [{ task: "dfj nbfhj  " }];

server.get('/', (request, response) => {
    response.render('index')
});

server.post("/", (request, response) => {

})

server.listen(port, (err) => {
    if (err) {
        console.log('Server not start');
    } else {
        console.log(`Server start at http://localhost:${port}`);
    }
});
