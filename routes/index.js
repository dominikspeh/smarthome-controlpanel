var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('index', { title: 'Hey', message: 'Hello there!'});
});
router.get('/songs', function(req, res) {
    res.render('index', {});
});
router.get('/settings', function(req, res) {
    res.render('index', {});
});
router.get('/news', function(req, res) {
    res.render('index', {});
});
module.exports = router;
