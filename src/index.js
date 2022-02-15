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

app.get('/users', function (req, res) {
    User.find({}).then(function (result) {
        res.send(result)
    }).catch(function (error) {
        res.status(500).send()
    })
})

app.get('/user/:id', function (req, res) {
    const _id = req.params.id
    User.findById(_id).then(function (user) {
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    }).catch(function (error) {
        res.status(500).send()
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

app.get('/tasks', function (req, res) {
    Task.find({}).then(function (result) {
        res.send(result)
    }).catch(function (error) {
        res.status(500).send()
    })
})

app.get('/task/:id', function (req, res) {
    const _id = req.params.id
    Task.findById(_id).then(function (task) {
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    }).catch(function (error) {
        res.status(500).send()
    })
})

app.listen(port, function () {
    console.log("Server is running on port: " + port)
})