const mongoose = require('mongoose');

const messageCountSchema = new mongoose.Schema({
    //get ID
    userID: {
        type: String,
        required: true
    },
    //get guild id 
    guildID: {
        type: String,
        required: true
    },
    //get message count
    messageCount: {
        type: Number,
        required: true
    }
})
 
module.exports = mongoose.model('message-count', messageCountSchema); 