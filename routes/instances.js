var express = require('express');
var router = express.Router();

var Instance = require("../models/instance.js").Instance;


/* GET instances listing. */
router.get('/', function(req, res, next) {

    var acceptsHTML = req.accepts('html');
    var acceptsJSON = req.accepts('json');

    if(acceptsJSON && !acceptsHTML)  //will be null if the client does not accept html
    {
        Instance.find({},function (err, instances)
        {
            res.json(instances);
        });
    }
    else
    {
        res.render("instances/all", {
            title : "All instances"
        })
    }
});

router.get('/new', function(req, res, next) {
  res.render("instances/one", {
    title : "Create instance"
  })
});

router.get('/instance/:id', function(req, res, next) {
    var acceptsHTML = req.accepts('html');
    var acceptsJSON = req.accepts('json');

    var id = req.params.id;

    if(acceptsJSON && !acceptsHTML)  //will be null if the client does not accept html
    {
        Instance.find({id : newInstance.id}, function (err, instances)
        {
            if (instances.length)
            {
                res.json(instances[0]);
            }
            else
            {
                var msg = "Instance with id " + id + " not found";
                res.status(404).json({
                    result: "Error",
                    message: msg
                })
            }
        });
    }
    else
    {
        res.render("instances/one", {
            title : "Create instance",
            instance : id
        });
    }
});

router.post('/instance/:id', function(req, res, next) {

});

router.post('/new', function(req, res, next) {

    var acceptsHTML = req.accepts('html');
    var acceptsJSON = req.accepts('json');

    if(acceptsJSON && !acceptsHTML)  //will be null if the client does not accept html
    {
        var instanceJSON = req.body;
        var newInstance = new Instance(instanceJSON);

        Instance.find({id: newInstance.id}, function (err, instances)
        {
            if (instances.length)
            {
                var msg = 'Instance with id ' + newInstance.id + ' exists already';
                res.status(400).json({
                    result: "Error",
                    message: msg
                });
            }
            else
            {
                newInstance.save(function (err)
                {
                    if (err)
                    {
                        var msg = "Error occurred saving new instance to MongoDB" + err;
                        res.status(500).json({
                            result: "Error",
                            message: msg
                        });
                    }
                    else
                    {

                        res.json({
                            result: "OK",
                            message: "Instance " + newInstance.id + " saved."
                        });
                    }

                });
            }
        });
    }
    else
    {
        var msg = "This method is only accessible via API. Accepts:\"application/json\" header is missing";
        req.flash('error', "Invalid Request");
        console.log(msg);
        res.status(400).json({
            result : "Error",
            message : msg
        });
    }
});

module.exports = router;
