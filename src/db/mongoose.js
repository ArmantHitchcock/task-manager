const mongoose = require('mongoose')

const connectionURL = "mongodb://127.0.0.1:27017"
const databaseName = "task-manager-api"
mongoose.connect(connectionURL + "/" + databaseName)



const User = mongoose.model('User', {
    name: {
        type: String
    },
    age: {
        type: Number
    }
})

const me = new User({
    name: "Armant",
    age: 31
})

me.save()
    .then(function (result) {
        console.log(result)
    })
    .catch(function (error) {
        console.log(error)
    })