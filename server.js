// importing statements
const express = require('express');
const methodOverride = require('method-override');
const session = require('express-session');
const MongoStore = require('connect-mongo');
require('dotenv').config();

// CONTROLLERS IMPORTS
const controllers = require('./controllers/controllers');
const userControllers = require('./controllers/user_controller');
const collabController = require('./controllers/collab_controller');

// app configuration
const app = express();
const PORT = 4000;

app.set('view engine', 'ejs');

// MIDDLEWARE
app.use(express.static('public'));
app.use(methodOverride('_method'));

app.use(
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



// Routers
app.use('/', controllers);
app.use('/users', userControllers);
app.use('/', collabController);

// ROUTES
// home route
app.get('/', (req, res) => {
    res.render('home.ejs');
})

// 404 Wildcard Route
app.route('/*').all((req,res)=>{
    res.render('404')
})




// SERVER
app.listen(PORT, () => {
    console.log('Listening on port 4000...')
});