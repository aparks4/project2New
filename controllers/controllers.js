const express = require("express");
const router = express.Router();

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
router.post('/', async (req, res) => {
    const createdPost = req.body;
    try {
        const newPost = await db.Trips.create(createdPost);
        console.log(newPost);
        res.redirect('/posts');
    } catch (err) {
        console.log(err);
    }
})

// show route
router.get('/:postIndex', async (req, res) => {
    try{
        const foundPost = await db.Trips.findById(req.params.postIndex)
        res.render('show.ejs', { post: foundPost, id: foundPost._id});
    } catch(err) {
        console.log(err);
    }
})



module.exports = router;