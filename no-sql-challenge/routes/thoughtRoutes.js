const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const multer = require('multer') // v1.0.5
const upload = multer() // for parsing multipart/form-data
const Thought = require('../models/Thought')
const User = require('../models/User')
const Reaction = require('../models/Reaction')
const {
    json
} = require('body-parser')

router.use(bodyParser.json()) // for parsing application/json
router.use(bodyParser.urlencoded({
    extended: true
})) // for parsing application/x-www-form-urlencoded


router.get('/', async (req, res) => {
    await Thought.find().then(thoughts => res.status(200).json(thoughts)).catch(error => res.status(500).send(error.message))
})

router.get('/thought/:id', async (req, res) => {
    console.log(req.params)
    await Thought.findById(req.params.id).then(thought => res.status(200).json(thought)).catch(error => res.status(500).send(error.message))
})

// router.post('/add', async (req, res) => {
//     console.log(req.body)
//     await Thought.create({
//         thoughtText: req.body.thoughtText,
//         username: req.body.username
//     }).then(async response => {
//         console.log(response)
//         const update = {
//             $push: {
//                 thoughts: username
//             }
//         }
//         await User.findByIdAndUpdate(response.username, update).then(response => res.status(200).res.json(response)).catch(error => res.status(500).send(error.message))
//     }).catch(error => res.status(500).res.send(error.message))
// })

router.put('/update/:id', async (req, res) => {
    console.log(req.body)
    console.log(req.params.id)
    await Thought.findByIdAndUpdate(req.params.id, req.body).then(response => res.status(200).send('Thought updated successfully')).catch(error => res.status(500).send(error.message))

})

router.delete('/delete/:id', async (req, res) => {
    console.log(req.params.id)
    await Thought.findByIdAndDelete(req.params.id).then(response => res.status(200).send('Thought deleted successfully')).catch(error => res.status(500).send(error.message))
})

router.post('/:thoughtId/reactions', async (req, res) => {
    console.log(req.params.thoughtId)
    console.log(req.body)
    const update = {
        $set: {
            reactions: [...req.body]
        }
    }
    await Reaction.create(req.body).then(async response => {
        await Thought.findByIdAndUpdate(req.params.thoughtId, update).catch(error => res.status(500).send(error.message))
    }).catch(error => res.status(500).send(error.message))
})

router.delete('/delete/reactions/:reactionId', async (req, res) => {
    console.log(req.params.id)
    await Reaction.findByIdAndDelete(req.params.reactionId).then(response => res.status(200).send('Reaction deleted successfully')).catch(error => res.status(500).send(error.message))
})


module.exports = router