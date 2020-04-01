const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')

//models
const User = require('../models/user')

//signing up user
router.post('/users', async (req, res) => {
    const user = new User(req.body)
    // console.log("Request Body , "+req.body)
    try {
        const token = await user.generateAuthToken()
        await user.save()
        res.status(201).send({user , token})
    } catch (e) {
        res.status(400).send(e)
    }
})


//Logging in user 
// findByCredentials lives as a static method on the model "User"
// generateAuthToken lives as an instance method on the object "user"
router.post('/users/login' , async (req,res) => {

    try {
        const userFromDatabase = await User.findByCredentials(req.body.email , req.body.password);
        const token = await userFromDatabase.generateAuthToken()
        console.log(token)
        res.send({userFromDatabase , token})
    }
    catch(e) {
        res.status(400).send("Login failed")
    }
})

// router.post('/users', (req, res) => {
//     // const user = new User(req.body)
//     console.log(req.body)

//     res.send()
// })

//To add middleware to an individual route pass "auth" as an argument
router.get('/users', auth ,  async (req, res) => {
    try {
        const users = await User.find({})
        res.send({users})
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/users/:id',  async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {

        const user = await User.findById(req.params.id)
        
        updates.forEach((update) => {
            user[update] = req.body[update]
        })

        await user.save()

        // const user = await User.find ByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    
        if (!user) {
            console.log("No such user")
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})


module.exports = router