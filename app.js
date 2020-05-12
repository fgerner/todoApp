const express = require('express');
const bodyParser = require('body-parser');

const port = 3000;

const app = express();
app.set("view engine", "ejs");

app.get('/', function (req, res) {

    let today = new Date();

    let options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    };

    let day = today.toLocaleDateString("en-AU", options);
    res.render('list', {dayOfWeek: day})

});

app.listen(port, function () {
    console.log(`Server listening on port ${port}`);
})