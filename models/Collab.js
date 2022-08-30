const mongoose = require('mongoose')

const collabData = new mongoose.Schema(
    {
        tripName:{type:String},
        tripId:{type:String},
        userId:{type:String},
        comments:{type:Array},
    })

const Reviews = mongoose.model('Collab', collabData)
module.exports = Reviews