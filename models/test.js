require('../connection/db.connection')
const db = require('./index.js')
const mongoose = require('mongoose');


db.Cities.create({
    city: "Kansas City",
    state: "MO"
})

db.Trip.create({
    tripName:"Family Reunion",
        
    city:"Branson",
    
    state:"MO",
        
    activities:"Hiking, carnival, dinners",
    photos:"https://unsplash.com/photos/zej4HPQLR5o",
    active:true,
    user:"Samantha",

})