const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
require('dotenv').config();
require('../connection/db.connection');


// MIDDLEWARE
router.use(express.json());

router.use(express.urlencoded({ extended: false }));

router.use(
    session({
        store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI}),
        secret: 'super secret',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7,
        },
    })
);

//MODEL IMPORT
const db = require("../models");
const { Cities } = require("../models");
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
    } catch (err) {
        console.log(err);
        next()
    }
})

router.post('/trips/:tripIndex', async (req, res, next) => {
    try{
        const newComment = await db.Collab.create(req.body);
        //const foundUser = req.session.currentUser.username;
        console.log(newComment)
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
        const foundUser = req.session.currentUser;
        const otherFoundUser = await db.User.findOne({username: foundUser.username});
        console.log(foundComments);
        res.render('show.ejs', { trip: foundTrip, id: foundTrip._id, comments: foundComments, user: otherFoundUser.username,});
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
        //console.log(allTrips)
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
        console.log(foundTrip);
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
        console.log(foundTrip)
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