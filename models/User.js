const mongoose = require('mongoose')

const userData = new mongoose.Schema(
    {
        username:{
            type:String,
            required:true,
            unique:false
            
        },
        password:{
            type:String,
            required:true,
        }
})

const User = mongoose.model('User', userData)
module.exports = User