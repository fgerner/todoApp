const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date');

const port = 3000;
const items = [];
const workItems = [];

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get('/', function (req, res) {
    let day = date.getDate();
    res.render('list', {listTitle: day, newListItems: items})

});

app.post('/', function (req, res) {
    if (req.body.value === 'Work') {
        workItems.push(req.body.newItem);
        res.redirect('/work');
    } else {
        items.push(req.body.newItem);
        res.redirect('/');
    }
});

app.get('/work', function (req, res) {
    res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.post('/work', function (req, res) {
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect('/work');
})

app.get('/about', function (req, res) {
    res.render('about');
})

app.listen(port, function () {
    console.log(`Server listening on port ${port}`);
})