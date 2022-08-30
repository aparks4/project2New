const mongoose = require('mongoose')

const tripData = new mongoose.Schema(
    {
        tripName:{
            type:String},
        city: {
            type:String,
            required:true
        },
        state:{
            type:String,
            required:true,
            maxLength: 2
            
        },
        activities:{type:Array},
        photos:{type:String},
        active:{type:Boolean},
        user:{type:String},

})

const Trip = mongoose.model('Trip', tripData)
module.exports = Trip