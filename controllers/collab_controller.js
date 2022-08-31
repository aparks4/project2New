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

router.get('/:id/', async (req, res, next) => {
    try {
        const foundComment = await db.Collab.findById(req.params.id).populate('trips').exec()
        res.render('comments/show.ejs', { comments: foundComment })
    } catch (err) {
        console.log(err)
        next()
    }
})

router.post('/', async (req, res, next) => {
    try{
        const newComment = await db.Collab.create(req.body)
        re.redirect('/comments/' + newComment._id)
    } catch(err) {
        console.log(err)
        next()
    }
})

router.delete('/:id', async (req, res, next) => {
    res.send('comment delete')
  })


module.exports = router;