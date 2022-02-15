const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users', (req, res) => {
    const user = new User(req.body)

    user.save()
        .then(function (result) {
            res.status(201).send(user)
        })
        .catch(function (error) {
            res.status(400).send(error)
        })
})

app.post('/tasks', function (req, res) {
    const task = new Task(req.body)

    task.save()
        .then(function (result) {
            res.status(201).send(result)
        })
        .catch(function (error) {
            res.status(400).send(error)
        })
})

app.listen(port, function () {
    console.log("Server is running on port: " + port)
})