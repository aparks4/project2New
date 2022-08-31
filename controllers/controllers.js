const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
require('../connection/db.connection');

// MIDDLEWARE
router.use(express.json());

router.use(express.urlencoded({ extended: false }));

//MODEL IMPORT
const db = require("../models");
// new route
//GET request for new posts template
router.get("/new", (req, res) => {
    res.render("new.ejs");
  });

// create route
// POST request for adding new post to posts DB
router.post('/trips', async (req, res, next) => {
    const createdTrip = req.body;
    try {
        
        const newTrip = await db.Trips.create(createdTrip);
        const newCity = await db.Cities.create({city:newTrip.city,state:newTrip.state,tripId:newTrip._id})
        let foundCity = await db.Cities.findOne({cityId: newCity._id});
        console.log(foundCity)
        res.redirect('/trips');
    } catch (err) {
        console.log(err);
        next()
    }
})

router.post('/trips/:tripIndex', async (req, res, next) => {
    try{
        const newComment = await db.Collab.create(req.body)
       
        res.redirect(`/trips/${req.params.tripIndex}`)
    } catch(err) {
        console.log(err)
        next()
    }
})

// show route
router.get('/trips/:tripIndex', async (req, res, next) => {
    try{
        const foundTrip = await db.Trips.findById(req.params.tripIndex);
        const foundComments = await db.Collab.find({tripId: foundTrip._id});
    
        res.render('show.ejs', { trip: foundTrip, id: foundTrip._id, comments: foundComments});
    } catch(err) {
        console.log(err);
        next()
    }
})


// index route
router.get('/trips', async (req, res, next) => {
    try{
        const allTrips = await db.Trips.find()
        const context = { posts: allTrips };
       
        res.render('index.ejs', context);
    } catch(err) {
        console.log(err);
        next()
    }
})

// destroy route
router.delete('/trips/:tripIndex', async (req, res, next) => {
    try{
        const foundTrip = await db.Trips.findByIdAndDelete(req.params.tripIndex);
       
        return res.redirect('/trips');
    } catch(err) {
        console.log(err);
        next()
    }
})

// edit route
router.get('/trips/:tripIndex/edit', async (req, res, next) => {
    try{
        const foundTrip = await db.Trips.findById(req.params.tripIndex);
      
        res.render('edit.ejs', { trip: foundTrip, id: foundTrip._id });
    } catch(err) {
        console.log(err);
        next()
    }
})

// update route
router.put('/trips/:tripIndex', async (req, res, next) => {
    try{
        const updatedTrip = req.body;
        await db.Trips.findByIdAndUpdate(req.params.tripIndex, updatedTrip, {new: true});
        res.redirect(`/trips/${req.params.tripIndex}`);
    }catch(err){
        console.log(err);
        next()
    }
})



module.exports = router;