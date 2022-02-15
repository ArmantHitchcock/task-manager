const mongoose = require('mongoose')

const connectionURL = "mongodb://127.0.0.1:27017"
const databaseName = "task-manager-api"
mongoose.connect(connectionURL + "/" + databaseName)


//  mongoose model
const User = mongoose.model('User', {
    name: {
        type: String
    },
    age: {
        type: Number
    }
})


const me = new User({
    name: "bob",
    age: 56
})

me.save()
    .then(function (result) {
        console.log(result)
    })
    .catch(function (error) {
        console.log(error)
    })

//  mongoose model
const Task = mongoose.model('Task', {
    description: {
        type: String
    },
    completed: {
        type: Boolean
    }
})

const task = new Task({
    description: "to do 1",
    completed: false
})

task.save()
    .then(function (result) {
        console.log(result)
    })
    .catch(function (error) {
        console.log(error)
    }) 