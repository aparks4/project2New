const express = require('express');


const app = express();
const PORT = 4000;


// home route
app.get('/', (req, res) => {
    res.send('hi there');
})


// SERVER
app.listen(PORT, () => {
    console.log('Listening on port 4000...')
});