const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const MemberSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true      
    },
    password: {
        type: String,
        required: true      
    },
    memberGroups: {
        type: Array
    },
    adminGroups: {
        type: Array
    }
})

module.exports = Member = mongoose.model('member', MemberSchema)