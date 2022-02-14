const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connectionURL = "mongodb://127.0.0.1:27017"
const databaseName = "task-manager"

// MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
//     if (error) {
//         return console.log("connection error happened")
//     }
//     const db = client.db(databaseName)

//     db.collection('users').insertOne({
//         name: "Andrew",
//         age: 27
//     }, (error, result) => {
//         if (error) {
//             return console.log("error happened in insert")
//         }
//         console.log(result.acknowledged)
//         console.log(result.insertedId)
//     })
// })

// MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
//     if (error) {
//         return console.log("connection error happened")
//     }
//     const db = client.db(databaseName)

//     db.collection('users').insertMany([
//         {
//             name: "Jen123",
//             age: 12
//         },
//         {
//             name: "bob123",
//             age: 23
//         }
//     ], (error, result) => {
//         if (error) {
//             return console.log("error happened in insert")
//         }
//         console.log(result.acknowledged)
//         console.log(result.insertedIds)
//     })
// })

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log("connection error happened")
    }
    const db = client.db(databaseName)

    db.collection('tasks').insertMany([
        {
            description: "Task1",
            completed: true
        },
        {
            description: "Task2",
            completed: false
        },
        {
            description: "Task3",
            completed: false
        }
    ], (error, result) => {
        if (error) {
            return console.log("error happened in insert")
        }
        console.log(result.acknowledged)
        console.log(result.insertedIds)
    })
})