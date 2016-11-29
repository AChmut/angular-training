var express = require('express');
var app = express();
var path = require('path');
app.use(express.static('public'));

require('console-stamp')(console, 'HH:MM:ss.l');

app.listen(8888);

var session = require('express-session');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(session({
    secret: 'angular_tutorial',
    resave: true,
    saveUninitialized: true
}));

app.get("/notes", function(req,res) {
    console.log("get notes");
    res.send(req.session.notes||[]);
});

app.put("/notes", function(req, res) {
    console.log("put notes: " + req.body.text);
    if (!req.session.notes) {
        req.session.notes = [];
        req.session.last_note_id = 0;
    }
    var note = req.body;
    note.id = req.session.last_note_id;
    req.session.last_note_id++;
    req.session.notes.push(note);
    res.end();
});

app.delete("/notes", function(req,res) {
    var id = req.query.id;
    console.log("delete notes: " + req.query.id);
    var notes = req.session.notes||[];
    var updatedNotesList = [];
    for (var i=0; i<notes.length; i++) {
        if (notes[i].id != id) {
            updatedNotesList.push(notes[i]);
        }
    }
    req.session.notes = updatedNotesList;
    res.end();
});

app.post("/notes/sendTotTop", function(req,res) {
    var id = req.body.params.id;
    console.log("post notes/sendTotTop: " + id);
    var notes = req.session.notes||[];
    var updatedNotesList = [];
    for (var i=0; i<notes.length; i++) {
        if (notes[i].id == id) {
            updatedNotesList.push(notes[i]);
            break;
        }
    }
    for (var i=0; i<notes.length; i++) {
        if (notes[i].id != id) {
            updatedNotesList.push(notes[i]);
        }
    }
    req.session.notes = updatedNotesList;
    res.end();
});