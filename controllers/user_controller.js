const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { User } = require('../models');
const mongoose = require('mongoose');
require('../connection/db.connection');


router.use(express.json());

router.use(express.urlencoded({ extended: false }));


router.get('/login', (req, res) => {
    res.render('users/login.ejs');
})

router.get('/register', (req, res) => {
    res.render('users/register.ejs');
})

router.post('/login', async (req, res, next) => {
    try {
        let formData = req.body;
        console.log(formData.username);
        let foundUser = await User.findOne({username: formData.username});
        if(!foundUser) {
            return res.redirect('/users/register')
        } else {
            const match = await bcrypt.compare(formData.password, foundUser.password);
            console.log(match);
            if(!match) return res.send("Email or password doesn't match!");
            req.session.currentUser = {
                id: foundUser._id,
                username: foundUser.username,
            };
            console.log(req.session)
            console.log(req.session.currentUser);
            return res.redirect('/home');
        }
         } catch(err) {
           console.log(err);
           next();
    }
})

router.post('/register', async (req, res, next) => {
    try {
        let formData = req.body;
        let foundUser = await User.exists({username: formData.username});
        if(foundUser) {
            return res.redirect('/users/login')
        } else {
            let salt = await bcrypt.genSalt(12);
            console.log(`My salt is ${salt}`)
            let hash = await bcrypt.hash(formData.password, salt);
            console.log(`My hash is ${hash}`)
            formData.password = hash;

            const newUser = await User.create(formData);
            console.log(`My new user is ${newUser}`)
            return res.redirect('/users/login')
        }
        } catch(err) {
           console.log(err);
            next();
    }
})

router.get("/logout", async function (req, res) {
    try {
        console.log(req.session);
        await req.session.destroy();
        //res.render('users/logout.ejs');
        res.redirect('/users/login');
    } catch(error) {
        console.log(error);
    }
});

module.exports = router;


