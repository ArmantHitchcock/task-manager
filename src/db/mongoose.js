const mongoose = require('mongoose')
const validator = require('validator')

const connectionURL = "mongodb://127.0.0.1:27017"
const databaseName = "task-manager-api"
mongoose.connect(connectionURL + "/" + databaseName)


//  mongoose model ______________________________________________________________________________________________________
const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('do not use password as your password')
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('is not valid email address')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    }
})


const me = new User({
    name: "Ann  ",
    email: 'akjshdkjGHGJFJFGF@HJGJG.com'
})

me.save()
    .then(function (result) {
        console.log(result)
    })
    .catch(function (error) {
        console.log(error)
    })

//  mongoose model ______________________________________________________________________________________________________
const Task = mongoose.model('Task', {
    description: {
        type: String,
        trim: true,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

const task = new Task({
    description: "to do 2",
    completed: true
})

task.save()
    .then(function (result) {
        console.log(result)
    })
    .catch(function (error) {
        console.log(error)
    }) 