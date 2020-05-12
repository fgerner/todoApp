const express = require('express');
const bodyParser = require('body-parser');

const port = 3000;
let items = [];

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (req, res) {

    let today = new Date();

    let options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    };

    let day = today.toLocaleDateString("en-AU", options);
    res.render('list', {dayOfWeek: day, newListItems: items})

});

app.post('/', function (req, res) {
    items.push(req.body.newItem);
    res.redirect('/')

})

app.listen(port, function () {
    console.log(`Server listening on port ${port}`);
})