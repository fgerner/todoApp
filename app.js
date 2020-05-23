const express = require('express');
const bodyParser = require('body-parser');
require(__dirname + '/date');
const mongoose = require('mongoose');

const port = 3000;
const workItems = [];

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect('mongodb://localhost:27017/todolistDB', {useUnifiedTopology: true, useNewUrlParser: true})

const itemSchema = {
    name: String
}
const Item = mongoose.model("Item", itemSchema);

const listSchema = {
    name: String,
    items: [itemSchema]
}
const List = mongoose.model("List", listSchema);

app.get('/', function (req, res) {
    Item.find({}, function (err, foundItems) {
        if (err) {
            console.log(err)
        } else {
            res.render('list', {listTitle: 'Today', newListItems: foundItems})
        }
    })

});

app.get('/:customListName', function (req, res) {
    const customListName = req.params.customListName;

    List.findOne({name: customListName}, function (err, foundList) {
        if (err) {
            console.log(err)
        } else if (!foundList) {
            const newList = new List({
                name: customListName,
                items: []
            })
            newList.save()
            res.redirect('/' + customListName);
        } else {
            res.render('list', {listTitle: foundList.name, newListItems: foundList.items});
        }
    })
})

app.post('/', function (req, res) {
    const itemName = req.body.newItem;
    const newItem = new Item({
        name: itemName
    });
    newItem.save()
    res.redirect('/')
});

app.post('/delete', function (req, res) {
    const checkedItemId = req.body.checkbox;
    Item.findByIdAndRemove(checkedItemId, function (err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/")
        }
    });
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