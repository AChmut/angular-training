var express = require('express');
var app = express();
var path = require('path');
app.use(express.static('public'));

require('console-stamp')(console, 'HH:MM:ss.l');

app.listen(8888);

var session = require('express-session');
var bodyParser = require('body-parser');

var Db = require('mongodb').Db;
var Server = require('mongodb').Server;
var ObjectID = require('mongodb').ObjectID;

var db = new Db('tutor',
    new Server("localhost", 27017, {safe: true},
        {auto_reconnect: true}, {}));
db.open(function(){

    db.collection('notes', function(error, notes) {
        db.notes = notes;
        console.log("mongo db is opened! " + notes);
    });
});


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(session({
    secret: 'angular_tutorial',
    resave: true,
    saveUninitialized: true
}));

var getMinOrder = function(cb) {
    db.notes.find().sort( { order: 1 } ).limit(1).toArray(function(err, items) {
        cb(items.length == 0 ? 0 : items[0].order);
    });
}

app.get("/notes", function(req,res) {
    console.log("get notes");
    db.notes.find(req.query).toArray(function(err, items) {
        res.send(items);
    });

});

app.put("/notes", function(req, res) {
    console.log("put notes: " + req.body.text);
    getMinOrder(function(order) {
        req.body.time = new Date();
        req.body.order = order ? order - 1 : 0;
        db.notes.insert(req.body);
        res.end();
    });

});

app.delete("/notes", function(req,res) {
    var id = req.query.id;
    console.log("delete notes: " + id);
    db.notes.remove({_id: new ObjectID(req.query.id)}, function(err) {
        if (err) {
            console.log("Error: " + err);
            res.send("Failed");
        } else {
            res.send("Success");
        }
    })
});

app.post("/notes/sendTotTop", function(req,res) {
    var id = req.body.params.id;
    console.log("post notes/sendTotTop: " + id);



    res.end();
});