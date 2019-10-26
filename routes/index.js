var express = require('express');
var session = require('express-session');
const MongoClient = require('mongodb').MongoClient;

var router = express.Router();

router.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Connection URL
const url = 'mongodb://localhost:27017';

// Database name
const dbName = 'bookmarks';

// Database config
const dbConfig = { useNewUrlParser: true, useUnifiedTopology: true }

// RESTful API
var api_rest = require('./api_rest');

/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.session.loggedin) {
    res.redirect('/bookmarks/')
  } else {
    res.redirect('/login/')
  }
  //res.render('index', { title: 'Express' });
});

router.get('/login/', function (req, res) {
  if (!req.session.loggedin) {
    res.render('login')
  } else {
    res.redirect('/bookmarks/')
  }
});

// TODO : implement safety
router.post('/login/auth', function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  if (username && password) {
    MongoClient.connect(url, dbConfig, function (err, client) {
      if (err) throw err;
    
      const db = client.db(dbName);
      
      const accounts = db.collection('accounts');
      
      accounts.find({$and: [{'username' : username}, {'password' : password}]}).toArray((err, docs) => {
        if (err) throw err;
        
        if (docs.length > 0) {
          req.session.loggedin = true;
          req.session.username = username;
          res.redirect('/bookmarks/');
        } else {
          res.send('Incorrect Username and/or Password!');
        }
        res.end();
      });
    });
  } else {
    res.send('Please enter Username and Password!');
    res.end();
  }
})

router.get('/bookmarks/', function (req, res) {
  if (req.session.loggedin) {
    if (typeof req.query.id === "undefined") {
      res.send(req.session.username + ' bookmarks panel');
    } else {
      res.send(req.session.username + ' bookmarks panel at folder ' + req.query.id);
    }
  } else {
    res.redirect('/login/');
  }
});

router.use('/api-rest/', api_rest);

module.exports = router;
