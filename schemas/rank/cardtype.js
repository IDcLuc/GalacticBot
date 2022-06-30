const mongoose = require('mongoose');
const cardtype = new mongoose.Schema({
    //get ID
    userID: {
        type: String,
        required: true
    },
    //get type 
    cardType: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('cardtype', cardtype);