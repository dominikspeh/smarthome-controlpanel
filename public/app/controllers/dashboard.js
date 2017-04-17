'use strict';
angular.module('smarthome.controllers.dashboard', []).

controller('dashboardCtrl', function ($scope, $http) {

    // GET TEMPERATURE
    $http.get('/api/get/temperature').then(function (res) {
        $scope.temperature = res.data
    });

   // $http.get('/api/get/gasprice').then(function (res) {
      //  $scope.gas = res.data
    //});

    $http.get('/api/get/weather').then(function (res) {
        $scope.weather = res.data
    });

    $http.get('/api/get/sockets').then(function (res) {
        $scope.sockets = res.data
    });

    $scope.changeMode = function (socket) {

        $http.post('/api/post/socket', {
            socket: socket
        })
            .then(
                function(response){
                    $http.get('/api/get/sockets').then(function (res) {
                        $scope.sockets = res.data
                    });

                },
                function(response){
                    console.log("error")

                }
            );

    };

    // Every 5 seconds
    setInterval(function () {
        $http.get('/api/get/sockets').then(function (res) {
            ignoreLoadingBar: true

            $scope.sockets = res.data
        });
    },5000);


    // Every two minutes
    setInterval(function () {
        $http.get('/api/get/temperature').then(function (res) {
            $scope.temperature = res.data
        });

    },120000);


    // Every 10 minutes
    setInterval(function () {

        $http.get('/api/get/weather').then(function (res) {
            $scope.weather = res.data.list
        });
        $http.get('/api/get/gasprice').then(function (res) {
            $scope.gas = res.data.stations
        });
    },600000);

});

