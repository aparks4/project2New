const mongoose = require('mongoose');

module.exports = {
    Cities : require("./Location.js"),
    Trips: require("./Trips.js"),
    Collab: require("./Collab.js"),
    User: require("./User.js")
}
mongoose.connect( process.env.MONGODB_URI || "code101@abnb.o7jlggi.mongodb.net/?retryWrites=true&w=majority" );
