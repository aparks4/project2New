require('../connection/db.connection')
const db = require('./index.js')
const mongoose = require('mongoose');


db.Cities.create({
    city: "Kansas City",
    state: "MO"
})