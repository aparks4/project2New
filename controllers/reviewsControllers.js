const express = require('express')

const router = express.Router()

// MIDDLEWARE

router.use(express.json());

router.use(express.urlencoded({ extended: false }));

const db = require('../models')

router.get('/', async (req, res, next) => {
    try{
        const allReviews = await db.Reviews.find().populate('product').exec()
        const allTrips = await db.Trips.find()
        res.render('reviews/index.ejs', {reviews: allReviews, products: allProducts})
    }catch(err){
       console.log(err)
       next()
    }
});