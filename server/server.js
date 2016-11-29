var express = require('express');
var app = express();
var path = require('path');
app.use(express.static('public'));

require('console-stamp')(console, 'HH:MM:ss.l');

app.listen(8888);

app.get("/greeting", function (req, res) {
    var name = req.query.name;
    console.log("get greeting: " + name);
    res.send(name == null ? "Hello!" : "Hello, " + name + "!");
})

app.get("/notes", function(req,res) {
    console.log("get notes");
    res.send([
        {text: "First note"},
        {text: "Second note"},
        {text: "Third note"},
        {text: "Fourth note"},
        {text: "Fifth note"}
    ]);
});