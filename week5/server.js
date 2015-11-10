var express = require('express');
var bodyParser = require('body-parser');
var Datastore = require('nedb');

var app = express();
app.use(express.static("public"));
app.use(bodyParser.json());

var db = new Datastore({filename:"todos.db", autoload: true});

app.get("/todos", function(req, res) {
    db.find({}, function(err, recs) {
        var todos = [];
        for (record of recs) {
            todos.push(record.todo);
        }
        res.send(todos);
    });
});

app.post("/todos", function(req, res) { 
    var todo = req.body.todo;
    db.insert({"todo": todo});
    res.send("");
});

app.listen(5000);
