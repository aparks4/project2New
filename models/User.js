const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required:true, 
            unique:false,
        },
        password: {
            type: String,
            required: [true, "Please Provide A Password"],
        },
       },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;

