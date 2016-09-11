var express = require('express');
var router = express.Router();

var Instance = require("../models/instance.js").Instance;


/* GET instances listing. */
router.get('/', function(req, res, next) {

    var acceptsHTML = req.accepts('html');
    var acceptsJSON = req.accepts('json');

    if(!acceptsHTML && acceptsJSON)  //will be null if the client does not accept html
    {
        Instance.find({}, function (err, instances)
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
    title : "Create instance",
    instance_id: ''
  })
});

router.post('/new', function(req, res, next) {

    var acceptsHTML = req.accepts('html');
    var acceptsJSON = req.accepts('json');

    if(!acceptsHTML && acceptsJSON)  //will be null if the client does not accept html
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

router.get('/:id', function(req, res, next) {
    var acceptsHTML = req.accepts('html');
    var acceptsJSON = req.accepts('json');

    var id = req.params.id;

    Instance.find({id : id}, function (err, instances)
    {
        if(!acceptsHTML && acceptsJSON)  //will be null if the client does not accept html
        {
                if (instances.length)
                {
                    res.json((instances[0].toObject()));
                }
                else
                {
                    var msg = "Instance with id " + id + " not found";
                    res.status(404).json({
                        result: "Error",
                        message: msg
                    })
                }
        }
        else
        {
            res.render("instances/one", {
                title : "Edit instance",
                instance_id : id
            });
        }
    });

});

router.post('/:id', function(req, res, next) {
    var acceptsHTML = req.accepts('html');
    var acceptsJSON = req.accepts('json');

    var id = req.params.id;
    var newInstance = req.body;

    Instance.find({id : id}, function (err, instances)
    {
        if(!acceptsHTML && acceptsJSON)  //will be null if the client does not accept html
        {
            if (instances.length)
            {
                //var instanceToUpdate = instances[0].toObject();

                Instance.findOneAndRemove({id:id}, function(err, result){

                    if(!err)
                    {
                        updatedInstance = new Instance(newInstance);
                        updatedInstance.save(function(err, result) {
                            if(!err)
                            {
                                res.json(updatedInstance.toObject());
                            }
                            else
                            {
                                res.status(500).json({
                                    result: "Error",
                                    message : "Unable to save updated instance : " + err + "\n" + result
                                });
                            }
                        });
                    }
                    else
                    {
                        res.status(500).json({
                            result: "Error",
                            message : "Unable to remove old instance : " + err + "\n" + result
                        });
                    }
                });

            }
            else
            {
                var msg = "Instance with id " + id + " not found";
                res.status(404).json({
                    result: "Error",
                    message: msg
                })
            }
        }
        else
        {
            res.render("instances/one", {
                title : "Edit instance",
                instance_id : id
            });
        }
    });
});

router.post('/:id/install', function(req, res, next) {
    var acceptsHTML = req.accepts('html');
    var acceptsJSON = req.accepts('json');

    var id = req.params.id;

    Instance.find({id : id}, function (err, instances)
    {
        if(!acceptsHTML && acceptsJSON)  //will be null if the client does not accept html
        {
            if (instances.length)
            {
                var instanceToInstall = instances[0];

                instanceToInstall.install();

                res.json(instanceToUpdate);
            }
            else
            {
                var msg = "Instance with id " + id + " not found";
                res.status(404).json({
                    result: "Error",
                    message: msg
                })
            }
        }
        else
        {
            res.render("instances/one", {
                title : "Edit instance",
                instance_id : id
            });
        }
    });
});

module.exports = router;
