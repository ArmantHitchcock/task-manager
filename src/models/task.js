const mongoose = require('mongoose')
const validator = require('validator')

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

module.exports = Task