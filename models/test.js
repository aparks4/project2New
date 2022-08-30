require('../connection/db.connection')
const db = require('./index.js')
const mongoose = require('mongoose');


db.Cities.create({
    city: "Kansas City",
    state: "MO"
})

db.Trips.create({
    tripName:"Family Reunion",
    date:'2022/02/05',
    city:"Branson",
    
    state:"MO",
        
    activities:["hiking", "carnival", "dinners"],
    photos:"https://unsplash.com/photos/zej4HPQLR5o",
    active:true,
    userId:["Samantha","Aryn","Nathalie"]

})
db.Collab.create(
{
    tripName:"Family Reunion",
    tripId:"2233",
    userId:"Samantha",
    comments:["Such a good idea","I don't like carnival rides but everyone else should go!"]
})