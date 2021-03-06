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

    db.collection('users', function(error, users) {
        db.users = users;
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
};

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
    db.notes.find({section: req.query.section, userName: req.session.userName }).
        sort( keyOrder ).toArray(function(err, items) {
        res.send(items);
    });

});

app.put("/notes", function(req, res) {
    console.log("put notes: " + req.body.text);
    getMaxOrder(function(order) {
        req.body.time = new Date();
        req.body.order = order + 1;
        req.body.userName = getUserName(req);
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
    setUserQuery(req);
    db.sections.find({user: getUserName(req)}).toArray(function(err, items) {
        console.log(items);
        res.send(items);
    });
        //res.send(['Default section']);
    return;
});

app.post("/sections/replace", function(req,resp) { // do not clear the list
    console.log("POST sections sections/replace");
    if (req.body.length==0) {
        resp.end();
    }

    var userName = getUserName(req);
    req.body.forEach(function(item) {
        if (item.user == null) {
            item.user = userName;
        }
    });

    db.sections.remove({user : userName}, function(err, res) {
        if (err) console.log(err);
        db.sections.insert(req.body, function(err, res) {
            if (err) console.log("err after insert",err);
            resp.end();
        });
    });
});

app.get("/checkUser", function(req,res) {
    console.log("GET checkUser");
    db.users.find({userName : req.query.user}).count(function (err, cnt) {
        res.send(cnt == 0);
    });

});

app.put("/users", function(req,res) {
    console.log("PUT users");
    db.users.insert(req.body, function(resp) {
        req.session.userName = req.body.userName;
        res.end();
    });
});

app.post("/login", function(req,res) {
    console.log("POST login [" + req.body.login + "]");

    db.users.find( {
        userName : req.body.login,
        password : req.body.password
    }).toArray(function(err, items) {
        if (items.length>0) {
          req.session.userName = req.body.login;
        }
        res.send(items.length>0);
    });
});

app.post("/logout", function(req,res) {
    console.log("POST logout");
    req.session.userName = null;
});


function setUserQuery(req) {
    req.query.userName = req.session.userName;
}

function getUserName(req) {
    var userName = req.session.userName;
    if (userName == null) {
        userName = 'guest';
    }
    return userName;

}