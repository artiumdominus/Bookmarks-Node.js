var express = require('express');
var router = express.Router();

router.get('/folder/', function (req, res) {
 res.send('You got some folder.');
});

router.get('/folder/:id/', function (req, res) {
  res.send('You got the folder ' + req.params.id + '.');
});

router.post('/folder/', function (req, res) {
  res.send('You created some folder.');
});

router.put('/folder/:id/', function (req, res) {
  res.send('You updated the folder ' + req.params.id + '.');
});

router.delete('/folder/:id/', function (req, res) {
  res.send('You deleted the folder ' + req.params.id + '.');
});

router.get('/tag/', (req, res) => {});

router.get('/tag/:id/', (req, res) => {});

router.post('/tag/', (req, res) => {});

router.put('/tag/:id/', (req, res) => {});

router.delete('/tag/:id/', (req, res) => {});

router.get('/bookmark/', (req, res) => {});

router.get('/bookmark/:id/', (req, res) => {});

router.post('/bookmark/', (req, res) => {});

router.put('/bookmark/:id/', (req, res) => {});

router.delete('/bookmark/:id/', (req, res) => {});

module.exports = router;
