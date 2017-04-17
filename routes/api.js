const express = require('express');
const router = express.Router();
const Songs = require("../models/songs");
const temperature = require("../modules/temperature");
const smartsocket = require('../modules/smartsocket');
const user = require("../models/user");

const news = require('../modules/news');
const getJSON = require('get-json');
const request = require('request');
const NodeGeocoder = require('node-geocoder');
const youtubeThumbnail = require('youtube-thumbnail');

// SONGS
router.get('/get/songs', function(req, res) {
    Songs.find().sort().exec(function (err, results) {

        if (!err) {
            res.status(200).json(results)

        }
    });
});
router.get('/get/song/random', function(req, res) {
    Songs.count().exec(function(err, count){

        var random = Math.floor(Math.random() * count);

        console.log(random);
        Songs.findOne().skip(random).exec(
            function (err, result) {
                res.status(200).json(result)

            });

    });
});
router.post('/post/songthumbnail', function(req, res) {
    const thumbnail = youtubeThumbnail(req.body.url);
    const data = {
        thumb : thumbnail
    };
    res.status(200).json(data)

});

// TEMPERATURE
router.get('/get/temperature', function(req, res) {
    temperature.getHomeTemperature().then(value => {

        res.status(200).json(value);

    });
});

// SPORTTICKER
router.get('/get/vfbfeed', function (req,res) {
    news.loadFeedVfb().then(data => {

        res.status(200).json(data);


    });
});
router.get('/get/sport1feed', function (req,res) {
    news.loadFeedSport1().then(data => {

        res.status(200).json(data);


    });
});

// GAS
router.get('/get/gasprice', function (req,res) {

    user.find().sort().exec(function (err, results) {

        if (!err) {
            const lat = results[0].location[0].lat;
            const lng = results[0].location[0].lng;
            const gas = results[0].gas[0].type;
            const rad = results[0].gas[0].radius;

            const tankkoenig = 'https://creativecommons.tankerkoenig.de/json/list.php?lat='+lat+'&lng='+lng+'&type='+gas+'&rad='+rad+'&apikey='+process.env.tankerkoenigAPI+'&sort=price';

            getJSON(tankkoenig, function(error, response){
                const result = {
                    location: results[0].location[0].city,
                    type: results[0].gas[0].type,
                    gasstations : response
                };
                res.json(result);
            })
        }
    });
});
router.post('/post/edit/gas', function (req,res) {

    user.update({_id : req.body._id }, {
        $set: {
            gas: req.body.gas
        }
    }).exec(function () {
        res.status(200).send()

    });
});
// WEATHER
router.get('/get/weather', function (req,res) {
    user.find().sort().exec(function (err, results) {

        if (!err) {
            const lat = results[0].location[0].lat;
            const lng = results[0].location[0].lng;
            const appID = process.env.weatherAPI;

            const url = 'http://api.openweathermap.org/data/2.5/forecast?lat='+lat+'&lon='+lng+'&appid='+appID+'&lang=de&units=metric&cnt=9';

            getJSON(url, function(error, response){

                if(!error){
                    res.json(response.list);
                }
                else {
                    res.json("");

                }


            })
        }
    });



});

// SOCKETS
router.get('/get/sockets', function (req,res) {
    smartsocket.getSockets().then(sockets => {

        res.status(200).json(sockets);

    })
});
router.post('/post/add/socket', function (req,res) {

    smartsocket.addSocket(req.body.name, req.body.code).then(function () {
        res.status(200).send("added")
    })


});
router.post('/post/socket', function (req,res) {

    smartsocket.turnSocket(req.body.socket._id).then(value => {
        res.status(200).send("ok")
    });


});
router.post('/post/update/socket', function (req,res) {
    smartsocket.updateSocket(req.body).then(function () {
        res.status(200).send("success")

    });
});
router.post('/post/delete/socket', function (req,res) {
    smartsocket.deleteSocket(req.body).then(function () {
        res.status(200).send("success")

    });
});

// USER
router.get('/get/user', function(req, res) {
    user.find().sort().exec(function (err, results) {

        if (!err) {
            res.status(200).json(results)

        }
    });
});
router.get('/get/location', function(req, res) {

});

router.post('/post/submit/location', function (req,res) {
    const options = {
        provider: 'google',
        httpAdapter: 'https',
        apiKey: process.env.googleGeocodingAPI,
        formatter: null
    };
    const geocoder = NodeGeocoder(options);

    geocoder.geocode(req.body.city)
        .then(function(result) {
            res.json(result)
        })
        .catch(function(err) {
            console.log(err);
        });
});

router.post('/post/add/location', function (req,res) {

    user.update({_id : req.body._id }, {
        $set: {
            location: req.body.newLocation
        }
    }).exec(function () {
        res.status(200).send()

    });


});


module.exports = router;
