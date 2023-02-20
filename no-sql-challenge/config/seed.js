const connectToMongo = require('./connect')
const mongoose = require('mongoose')
const User = require('../models/User')
const {
    generateFromEmail,
    generateUsername
} = require("unique-username-generator");


connectToMongo()
let count = 0;
let records = 10;

const createDoc = async () => {
    let randNum = Math.floor(Math.random() * 10);
    let newUser = new User({
        username: generateUsername('', randNum, randNum),
        email: `${generateFromEmail('test_email@example.com', randNum)}@yahoo.com`,
        thoughts: [{
            thoughtText: 'asdsfdsfdsfsd',
            username: generateUsername('', randNum, randNum),
            reactions: [{
                reactionBody: 'asfsdfdsdfd97ds9',
                username: generateUsername('', randNum, randNum)

            }]
        }]
    })

    try {
        await newUser.save()
    } catch (err) {
        console.log(err.message)
    }

}

for (let i = 0; i < records; i++) {
    createDoc()
    count++
}

setTimeout(() => {
    console.log('Database seeded')
    return mongoose.connection.close()
}, 10000)