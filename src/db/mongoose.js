const mongoose = require('mongoose')

const connectionURL = process.env.MONGODB_URL
const databaseName = process.env.DATABASE_NAME
mongoose.connect(connectionURL + "/" + databaseName)