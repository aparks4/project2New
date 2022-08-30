// importing statements
const express = require('express');
const methodOverride = require('method-override');


// app configuration
const app = express();
const PORT = 4000;

app.set('view engine', 'ejs');

// MIDDLEWARE
app.use(express.static('public'));
app.use(methodOverride('_method'));


// ROUTES
// home route
app.get('/', (req, res) => {
    res.render('home.ejs');
})

app.get('/new', (req, res) => {
    res.render('new.ejs');
})

// 404 Wildcard Route
app.route('/*').all((req,res)=>{
    res.render('404')
})




// SERVER
app.listen(PORT, () => {
    console.log('Listening on port 4000...')
});