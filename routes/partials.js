var express = require('express');
var router = express.Router();



router.get('/:view', function(req, res) {

    var view = req.params.view;
    res.render('partials/' + view);

});

module.exports = router;
