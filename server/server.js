var express = require('express');
var app = express();
var path = require('path');
app.use(express.static('public'));

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:63342');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
require('console-stamp')(console, 'HH:MM:ss.l');

app.listen(30000);

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