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

    db.collection('sections', function(error, sections) {
        db.sections = sections;
    });
});


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(session({
    secret: 'angular_tutorial',
    resave: true,
    saveUninitialized: true
}));

var getOrderBy = function(by, cb) {
    db.notes.find().sort( { order: by } ).limit(1).toArray(function(err, items) {
        cb(items.length == 0 ? 0 : items[0].order);
    });
}

var getMinOrder = function(cb) {
    getOrderBy(1, cb);
};

var getMaxOrder = function(cb) {
    getOrderBy(-1, cb);
};

app.get("/notes", function(req,res) {
    var sort = req.query.sort;
    console.log("get notes: " + sort);
    var keyOrder = {};
    keyOrder[sort] = 1;
    console.log("get notes, sort: " + keyOrder);
    db.notes.find({section: req.query.section}).sort( keyOrder ).toArray(function(err, items) {
        res.send(items);
    });

});

app.put("/notes", function(req, res) {
    console.log("put notes: " + req.body.text);
    getMaxOrder(function(order) {
        req.body.time = new Date();
        req.body.order = order + 1;
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

    getMinOrder(function(order) {
        db.notes.update(
            {_id: new ObjectID(id)},
            {
                $set:
                 { order: order - 1 }
            },
            {upsert:true}
        );
    });

    res.end();
});

app.get("/sections", function(req,res) {
    console.log("GET sections");
    db.sections.find(req.query).toArray(function(err, items) {
        res.send(items);
    });
});