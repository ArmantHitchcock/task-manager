const { MongoClient, ObjectId } = require('mongodb')
// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient

const connectionURL = "mongodb://127.0.0.1:27017"
const databaseName = "task-manager"

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log("connection error happened")
    }
    const db = client.db(databaseName)

    console.log("findOne:")
    db.collection('users').findOne({
        name: "Andrew",
        _id: new ObjectId("620b64a9e22636403deae7b4")
    }, (error, result) => {
        if (error) {
            return console.log("error happened in findOne")
        }
        console.log(result)
    })

    console.log("find:")
    db.collection('users').find({
        name: "Andrew",
    }).toArray((error, result) => {
        if (error) {
            return console.log("error happened in find")
        }
        console.log(result)
    })
})
