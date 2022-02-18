const express = require('express')
const multer = require('multer')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')
const { contentType } = require('express/lib/response')


router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (error) {
        res.status(400).send()
    }
})

router.post('/logout', auth, async function (req, res) {
    try {
        req.user.tokens = req.user.tokens.filter(function (token) {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500), send()
    }
})

router.post('/logoutAll', auth, async function (req, res) {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500), send()
    }
})

router.get('/user/me', auth, async function (req, res) {
    res.send(req.user)
})

router.get('/users', auth, async function (req, res) {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/user/:id', auth, async function (req, res) {
    const _id = req.params.id
    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.patch('/users/:id', auth, async function (req, res) {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', "age"]
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
        res.status(400).send({ error: "Invalid update, only: " + allowedUpdates + " is allowed" })
    }
    try {
        const user = await User.findById(req.params.id)
        updates.forEach((update) => user[update] = req.body[update])
        await user.save()
        //const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.patch('/me', auth, async function (req, res) {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', "age"]
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
        res.status(400).send({ error: "Invalid update, only: " + allowedUpdates + " is allowed" })
    }
    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        //const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        res.send(req.user)
    } catch (error) {
        res.status(400).send(error)
    }
})


router.delete('/user/:id', auth, async function (req, res) {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})

const upload1 = multer({
    limits: {
        fileSize: 4000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|png|jpeg)$/)) {
            return cb(new Error('Please upload a png or jpeg'))
        }
        cb(undefined, true)
    }
})
router.post('/avatar', auth, upload1.single('avatar'), async function (req, res) {
    req.user.avatar = req.file.buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

router.delete('/avatar', auth, async function (req, res) {
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})

router.get('/avatar/:id', async function (req, res) {
    try {
        const user = await User.findById(req.params.id)
        if (!user || !user.avatar) {
            throw new Error()
        }
        res.set('Content-Type', 'image/jpg') //https://www.ibm.com/docs/en/wkc/cloud?topic=catalog-previews
        res.send(user.avatar)
    } catch (error) {
        res.status(404).send()
    }
})

const upload = multer({
    limits: {
        fileSize: 4000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(doc|docx|pdf)$/)) {
            return cb(new Error('Please upload a Word Doc or PDF'))
        }
        cb(undefined, true)
    }
})

router.post('/docUpload', auth, upload.single('Docs'), async function (req, res) {
    req.user.doc = req.file.buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

router.delete('/docUpload', auth, async function (req, res) {
    req.user.doc = undefined
    await req.user.save()
    res.send()
})

router.get('/docUpload/:id', async function (req, res) {
    try {
        const user = await User.findById(req.params.id)
        if (!user || !user.doc) {
            throw new Error()
        }
        res.set('Content-Type', 'application/msword')  //https://www.ibm.com/docs/en/wkc/cloud?topic=catalog-previews
        res.send(user.doc)
    } catch (error) {
        res.status(404).send()
    }
})

module.exports = router