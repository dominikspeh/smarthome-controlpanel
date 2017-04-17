const Feed = require('rss-to-json');



function loadFeedVfb() {
    return new Promise((resolve, reject) => {
        Feed.load('http://www.stuttgarter-nachrichten.de/vfb.rss.feed', function(err, rss){
            var data = {
                logo: "img/stn-logo.png",
                feed: rss
            };
            resolve(data);
        });
    });
};

function loadFeedSport1() {
    return new Promise((resolve, reject) => {
        Feed.load('http://www.sport1.de/fussball/news.rss', function(err, rss){
            var data = {
                logo: "img/stn-logo.png",
                feed: rss
            };
            resolve(data);
        });
    });
}
module.exports = {
    loadFeedVfb,
    loadFeedSport1
};