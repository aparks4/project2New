const mongoose = require('mongoose')

const collabData = new mongoose.Schema(
    {
        tripId:{type:String},
        userId:{type:String},
        comments:{type:Array},
    })

const Cities = mongoose.model('Collab', locationData)
module.exports = Cities