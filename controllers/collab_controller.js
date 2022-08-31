const express = require('express')
const router = express.Router()

router.use(express.json());

router.use(express.urlencoded({ extended: false }));

const db = require('../models')

router.get('/', async (req, res, next) => {
    try {
        const allComments = await db.Collab.find().populate('trips').exec()
        const allTrips = await db.Trips.find()
        res.render('comments/index.ejs', { comments: allComments, trips: allTrips })
    } catch (err) {
        console.log(err)
        next()
    }
});

router.get('/trips/:tripIndex', async (req, res, next) => {
    try {
        const allComments = await db.Collab.find().populate('trips').exec();
        res.render('show.ejs', { comments: allComments })
        console.log(allComments);
    } catch (err) {
        console.log(err)
        next()
    }
})

router.post('/trips/:tripIndex', async (req, res, next) => {
    try{
        const newComment = await db.Collab.create(req.body)
        console.log(newComment)
        res.redirect(`/trips/${req.params.tripIndex}`)
    } catch(err) {
        console.log(err)
        next()
    }
})

router.delete('/:id', async (req, res, next) => {
    res.send('comment delete')
    next()
})


module.exports = router;