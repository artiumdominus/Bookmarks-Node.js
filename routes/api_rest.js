var express = require('express');
const MongoClient = require('mongodb').MongoClient;

var router = express.Router();

// Connection URL
const url = 'mongodb://localhost:27017';

// Database name
const dbName = 'bookmarks';

// Database config
const dbConfig = { userNewUrlParser: true, useUnifiedTopology: true }

// Gambiarra overpower
var cache = {}

// Cache middleware
cacheManager = function (req, res, next) {
  if (req.session.loggedin) {
    if (cache[req.session.username] === undefined) {
      MongoClient.connect(url, dbConfig, function (err, client) {
        if (err) throw err;
        
        const db = client.db(dbName);
        
        const accounts = db.collection('accounts');
        
        // Should be findOne?
        accounts.find({ 'username' : req.session.username }).toArray((err, docs) => {
          if (err) throw err;
          
          cache[req.session.username] = docs[0]
          
          next();
        });
      });
    } else {
      next();
    }
  } else {
    res.send('User is not logged in');
  }
}

router.use(cacheManager);

// First endpoint working.
router.get('/folders/', (req, res) => res.json(cache[req.session.username].folders));

// Second endpoint working.
router.get('/tag_enum/', (req, res) => res.json(cache[req.session.username].tag_enum));


// True REST API goes here.
router.get('/folder/', (req, res) => {
  res.send('You got some folder.');
});

router.get('/folder/:id/', (req, res) => {
  res.send('You got the folder ' + req.params.id + '.');
});

router.post('/folder/', (req, res) => {
  res.send('You created some folder.');
});

router.put('/folder/:id/', (req, res) => {
  res.send('You updated the folder ' + req.params.id + '.');
});

router.delete('/folder/:id/', function (req, res) {
  res.send('You deleted the folder ' + req.params.id + '.');
});

router.get('/tag/', (req, res) => {
  res.send('You got some tags.');
});

router.get('/tag/:id/', (req, res) => {
  res.send('You got the tag ' + req.params.id + '.');
});

router.post('/tag/', (req, res) => {
  res.send('You created some tag.');
});

router.put('/tag/:id/', (req, res) => {
  res.send('You updated the tag ' + req.params.id + '.');
});

router.delete('/tag/:id/', (req, res) => {
  res.send('You deleted the tag ' + req.params.id + '.');
});

router.get('/bookmark/', (req, res) => {
  res.send('You got some bookmarks.');
});

router.get('/bookmark/:id/', (req, res) => {
  res.send('You got the bookmark ' + req.params.id + '.');
});

router.post('/bookmark/', (req, res) => {
  res.send('You created some bookmark.');
});

router.put('/bookmark/:id/', (req, res) => {
  res.send('You updated the bookmark ' + req.params.id + '.');
});

router.delete('/bookmark/:id/', (req, res) => {
  res.send('You deleted the bookmark ' + req.params.id + '.');
});

module.exports = router;
