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

    console.log("deleteOne:")
    db.collection('users').deleteOne({
        _id: new ObjectId("620b64a9e22636403deae7b4")
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })

    console.log("updateMany:")
    db.collection('users').deleteMany({
        age: 72
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })
})
