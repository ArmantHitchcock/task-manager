const express = require('express')
require('./db/mongoose')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT

// app.use(function (req, res, next) {
//     res.status(503).send('Site is currently under maintenance')
// })

app.use(express.json())

app.use(userRouter)
app.use(taskRouter)

app.listen(port, function () {
    console.log("Server is running on port: " + port)
})