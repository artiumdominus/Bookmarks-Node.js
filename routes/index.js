var express = require('express');
var router = express.Router();

var api_rest = require('./api_rest');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login/', function (req, res) {
  res.send('Login screen');
});

router.get('/bookmarks/', function (req, res) {
  if (typeof req.query.id === "undefined") {
    res.send('Bookmarks panel');
  } else {
    res.send('Bookmarks panel at folder ' + req.query.id);
  }
});

router.use('/api-rest/', api_rest);

module.exports = router;
