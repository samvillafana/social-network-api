const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const multer = require('multer') // v1.0.5
const upload = multer() // for parsing multipart/form-data
const User = require('../models/User')

router.use(bodyParser.json()) // for parsing application/json
router.use(bodyParser.urlencoded({
    extended: true
})) // for parsing application/x-www-form-urlencoded

router.get('/', async (req, res) => {
    const users = await User.find();
    res.send(users)
})

router.get('/user/:id', async (req, res) => {
    console.log(req.params)
    await User.findById(req.params.id).then(user => res.status(200).json(user)).catch(error => res.status(500).send(error.message))
})

router.post('/add', async (req, res) => {
    console.log(req.body);
    let user = req.body;
    await User.create(user).then(user => res.status(200).json(user)).catch(err => res.status(500).send(err.message))
})

router.put('/update/:id', async (req, res) => {
    console.log(req.params)
    console.log(req.body)
    let update = req.body;
    await User.findByIdAndUpdate(req.params.id, update).then(response => res.status(200).send('User successfully updated!')).catch(error => res.status(500).send(error.message))

})
router.delete('/delete/:id', async (req, res) => {
    console.log(req.params)
    await User.findByIdAndDelete(req.params.id).then(response => res.status(200).send('User successfully deleted!')).catch(error => res.status(500).send(error.message))

})

module.exports = router