require('dotenv').config()
const mongoose = require('mongoose')

const connectToMongo = async () => {
    await mongoose.connect(process.env.MONGO_URL).then(() => console.log('connected to MongoDB'))
        .catch(error => console.log(error))
}

module.exports = connectToMongo