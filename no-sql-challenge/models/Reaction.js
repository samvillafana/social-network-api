const mongoose = require('mongoose')
const {
    ObjectId
} = require('mongodb')

const reactionSchema = new mongoose.Schema({
    reactionId: {
        default: ObjectId
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const Reaction = mongoose.models.Reaction || mongoose.model('Reaction', reactionSchema)

module.exports = Reaction