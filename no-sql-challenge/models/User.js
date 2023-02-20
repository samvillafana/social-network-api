const mongoose = require('mongoose')
const thoughtSchema = require('./Thought')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/,
    },
    thoughts: [thoughtSchema.schema],
    friends: [mongoose.Schema.ObjectId],

}, {
    virtuals: {
        friendCount: {
            get() {
                return this.friends.length
            }
        }
    }
})

const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User