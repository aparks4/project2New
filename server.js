// importing statements
const express = require('express');
const methodOverride = require('method-override');

// CONTROLLERS IMPORTS
const controllers = require('./controllers/controllers')
const userControllers = require('./controllers/user_controller')

// app configuration
const app = express();
const PORT = 4000;

app.set('view engine', 'ejs');

// MIDDLEWARE
app.use(express.static('public'));
app.use(methodOverride('_method'));





// Routers
app.use('/', controllers);
app.use('/users', userControllers);


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