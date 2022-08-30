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
        console.log(newTrip);
        res.redirect('/trips');
    } catch (err) {
        console.log(err);
        next()
    }
})

// show route
router.get('/:tripIndex', async (req, res, next) => {
    try{
        const foundTrip = await db.Trips.findById(req.params.tripIndex)
        res.render('show.ejs', { post: foundTrip, id: foundTrip._id});
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
        console.log(allTrips)
        res.render('index.ejs', context);
    } catch(err) {
        console.log(err);
        next()
    }
})

// destroy route
router.delete('/:tripId', async (req, res, next) => {
    try{
        const foundTrip = await db.Trips.findByIdAndDelete(req.params.tripId);
        console.log(foundTrip);
        return res.redirect('/trips');
    } catch(err) {
        console.log(err);
        next()
    }
})

// edit route
router.get('/:tripId/edit', async (req, res, next) => {
    try{
        const foundTrip = await db.Products.findById(req.params.tripId);
        console.log(foundTrip)
        res.render('edit.js', { trip: foundTrip, id: foundTrip._id });
    } catch(err) {
        console.log(err);
        next()
    }
})

// update route
router.put('/:tripId', async (req, res, next) => {
    try{
        const updatedTrip = req.body;
        await db.Trips.findByIdAndUpdate(req.params.tripId, updatedTrip, { new:true})
        res.redirect(`/trips/${req.params.tripId}`)
    }catch(err){
        console.log(err);
        next()
    }
})



module.exports = router;