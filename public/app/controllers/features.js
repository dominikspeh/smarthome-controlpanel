'use strict';
angular.module('smarthome.controllers.features', ['mediaPlayer'])
    .controller('songCtrl', function ($scope, $http) {

    $http.get('/api/get/songs').then(function (res) {
        $scope.songs = res.data;
        $scope.currentPlaylist = res.data.map(function (song, index, array) {
            return { src: "songs/"+song.path, type: 'audio/mp3', title: song.name, url: song.url };
        });

        // On Play Event
        $scope.myPlayer.on('play', function (evt) {
            const index = $scope.myPlayer.currentTrack-1;
            $scope.currentTitle = $scope.currentPlaylist[index].title;
            getThumbnail($scope.currentPlaylist[index].url)
            $scope.activePlayer = true;

        });
    });

    $scope.playSong = function (index) {
        $scope.myPlayer.playPause(index);
    };

    $scope.stopAll = function () {
        $scope.myPlayer.pause();
        $scope.myPlayer.seek(0);
        $scope.activePlayer = false;
    }


    function getThumbnail(url) {
        const data = {
            url : url
        };

        $http.post('/api/post/songthumbnail', data).then(function (result) {
            $scope.currentThumb = result.data.thumb.high.url;
        })
    }



}).controller('newsCtrl', function ($scope, $http) {

    $scope.area = 'sport';


    $http.get('/api/get/vfbfeed').then(function (res) {
        $scope.vfb = res.data.feed.items

    });

    $http.get('/api/get/sport1feed').then(function (res) {
        $scope.sport1 = res.data.feed.items

    });

    setInterval(function () {
        $http.get('/api/get/vfbfeed').then(function (res) {
            $scope.vfb = res.data.feed.items

        });
        $http.get('/api/get/sport1feed').then(function (res) {
            $scope.sport1 = res.data.feed.items

        });
    },120000)

});



