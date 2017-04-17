const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const app = express();
const http = require('http');

const server = http.createServer(app);

// ENV
dotenv.load({ path: '.env' });

// CONFIG
mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);
mongoose.connection.on('error', () => {
    process.exit();
});

// Routes
const index = require('../routes/index');
const api = require('../routes/api');
const partials = require('../routes/partials');

// View engine
app.set('views', './views');
app.set('view engine', 'pug');

// Form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Middleware
app.use(express.static('./public'));
app.use(express.static('./node_modules'));

// Routen
app.use('/', index);
app.use('/api', api);
app.use('/partials', partials);


// Error Handling
app.use(function(req, res){
    res.type('text/plain');
    res.status(404);
    res.redirect('/')
});

app.use(function(err, req, res, next){
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Internal error');
});

app.set('port', process.env.PORT || 9001);
exports.start = function() {
    server.listen(app.get('port'), function(){
        console.log( 'Express ready on http://127.0.0.1:' + app.get('port'));
    });
};