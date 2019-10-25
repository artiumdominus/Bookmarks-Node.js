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

// router.use(bodyParser.urlencoded({extended : true}));
// router.use(bodyParser.json());

// Connection URL
const url = 'mongodb://localhost:27017';

// Database name
const dbName = 'bookmarks';

// Database config
const dbConfig = { useNewUrlParser: true, useUnifiedTopology: true }

var api_rest = require('./api_rest');

/* GET home page. */
router.get('/', function (req, res, next) {
  console.log(req.session)
  console.log(req.session.loggedin)
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

router.post('/login/auth', function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  if (username && password) {
    // TODO
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
  if (typeof req.query.id === "undefined") {
    res.send('Bookmarks panel');
  } else {
    res.send('Bookmarks panel at folder ' + req.query.id);
  }
});

router.use('/api-rest/', api_rest);

module.exports = router;
