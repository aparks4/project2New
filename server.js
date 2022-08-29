const express = require('express');


const app = express();
const PORT = 4000;

app.set('view engine', 'ejs');

// home route
app.get('/', (req, res) => {
    res.render('home.ejs');
})


// SERVER
app.listen(PORT, () => {
    console.log('Listening on port 4000...')
});