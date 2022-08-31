const mongoose = require('mongoose')

const tripData = new mongoose.Schema(
    {
        tripName:{
            type:String},
        date:{type:Date},
        city: {
            type:String,
            required:true
        },
        state:{
            type:String,
            required:true,
            maxLength: 2
        },
        activities:[{type:String}],
        photos:{type:String},
        active:{type:Boolean},
        userId:{type: Array},
        comments:{
            type: mongoose.Types.ObjectId,
            ref: "Collab",
        },

})

const Trips = mongoose.model('Trip', tripData)
module.exports = Trips