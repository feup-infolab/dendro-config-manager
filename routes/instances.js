var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render("instances/all", {
    title : "All instances"
  })
});

router.get('/new', function(req, res, next) {
  res.render("instances/new", {
    title : "Create instance"
  })
});

router.post('/new', function(req, res, next) {
  res.render("instances/all", {
    title : "All instances"
  })
});

module.exports = router;
