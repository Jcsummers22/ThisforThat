var express = require("express");
var router = express.Router();

var app = require("../models/")

router.get("/", function(req, res){
    app.all(function(data){
        var hbsObject = {
            items: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

router.post("api/items", function(req, res){
    app.create([
        "name", "sell_type"
    ], [
        req.body.name, req.body.sell_type
    ], function(result){
        res.json ({ id: result.insertId });
    });
});

router.put("api/items/:id", function(req, res){
    var condition = "id = " + req.params.id;
    console.log("condition", condition);

    app.update({
        sell_type: req.body.sell_type
    }.condition, function(result){
        if(result.changedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        };
    });

});

app.delete("api/items/:id", function(req, res){
    var condition = "id = " + req.params.id;
    app.delete(condition, function(result){
        if(affectedRows == 0){
            return res.status(404).end();
        } else {
            res.status(200).end();
        };
    });
});

module.exports = router;