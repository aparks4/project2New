const mongoose = require('mongoose')

const collabData = new mongoose.Schema(
    {
        tripName:{type:String},
        tripId:{
            type: mongoose.Types.ObjectId,
            ref: "Trips"
        },
        userId:{
            type:mongoose.Types.ObjectId,
            ref: "User"
        },
        comments: [{type: String}],
        user: {type: String},
    })

const Collab = mongoose.model('Collab', collabData)
module.exports = Collab