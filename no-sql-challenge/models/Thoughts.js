const mongoose = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new mongoose.Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema.schema]

}, {
    timestamps: true
})

const Thought = mongoose.models.Thought || mongoose.model('Thought', thoughtSchema)

module.exports = Thought