const express = require('express');
const server = express();
const port = 3000;

server.set('view engine', 'ejs');
server.use(express.urlencoded());

let todoList = [
    { task: "Sample task 1" },
    { task: "Sample task 2" }
];

let finishedtask = [
    { task: "completed task 1" },
    { task: "completed task 2" }
]

server.get('/', (req, res) => {
    return res.render('index', { todoList, finishedtask });
});

// -------------------------- ADD TASK -----------------------------
server.post("/addTask", (req, res) => {
    let { task } = req.body;
    let newTask = { task }
    if (task) {
        todoList.push(newTask);
        console.log('Task added:');
    } else {
        console.log('Task cannot be empty');
    }
    return res.redirect("/");
});

// -------------------------- DELETE TASK -----------------------------
server.get("/deleteTask/:id", (req, res) => {
    let id = req.params.id
    todoList = todoList.filter((val, index) => {
        return index != id
    })
    return res.redirect("/");
});

// -------------------------- COMPLETED TASK -----------------------------
server.get("/completedtask/:id", (req, res) => {
    let id = req.params.id;
    let checkedOffTask = todoList.splice(id, 1)[0];
    finishedtask.push(checkedOffTask);
    res.redirect("/");
});

// -------------------------- INCOMPLETE TASK -----------------------------
server.get("/incompletedtask/:id", (req, res) => {
    let id = req.params.id;
    let uncheckedTask = finishedtask.splice(id, 1)[0];
    todoList.push(uncheckedTask);
    res.redirect("/");
});

server.listen(port, (err) => {
    if (err) {
        console.log('Server not start');
    } else {
        console.log(`Server start at http://localhost:${port}`);
    }
});


