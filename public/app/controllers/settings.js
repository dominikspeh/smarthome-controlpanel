'use strict';
angular.module('smarthome.controllers.settings', []).

controller('settingsCtrl', function ($scope, $http, ngDialog) {

    $scope.activeTab;

    $http.get('/api/get/user').then(function (res) {
        $scope.user = res.data[0];
    });


    // SOCKETS

    $scope.addSocket = function () {
        ngDialog.open({ template: 'addSocket', width: 880, scope: $scope});
    };

    $scope.editSockets = function () {
        $http.get('/api/get/sockets').then(function (res) {
            $scope.sockets = res.data;
            $scope.activeTab = "Sockets"
        });
    };

    $scope.editSocket = function (socket) {
        $scope.edit =  angular.copy(socket);
        ngDialog.open({ template: 'editSocket', width: 600, scope: $scope});
    };

    $scope.removeSocket = function (socket) {
        $scope.rm =  angular.copy(socket);
        ngDialog.open({ template: 'removeSocket', width: 600, scope: $scope});
    };

    $scope.saveSocket = function (socket) {
        const data = socket;

        $http.post('/api/post/update/socket', data).then(function () {

            $http.get('/api/get/sockets').then(function (res) {
                $scope.sockets = res.data;
                $scope.edit = null;
                ngDialog.close();
            });

        })
    };

    $scope.deleteSocket = function (socket) {
        const data = socket;

        $http.post('/api/post/delete/socket', data).then(function () {

            $http.get('/api/get/sockets').then(function (res) {
                $scope.sockets = res.data;
                $scope.rm = null;
                ngDialog.close();
            });

        })
    }

    $scope.newSocket = function (socket) {
        const data = {
            name: socket.name,
            code: socket.code
        };

        $http.post('/api/post/add/socket', data).then(function () {
            $scope.socket = null;
            $http.get('/api/get/sockets').then(function (res) {
                $scope.sockets = res.data;
                $scope.rm = null;
                ngDialog.close();
            });
        })
    }


    // Location
    $scope.editLocation = function () {
        $scope.activeTab = "Location"
    };

    $scope.newLocation = function () {

        const data = {
            city : $scope.user.location[0].formattedAddress
        };

        $http.post('/api/post/submit/location', data).then(function (result) {
            if(result.data[0]){
                $scope.newLocation.city = {
                    formattedAddress : result.data[0].formattedAddress,
                    city : result.data[0].city,
                    lat :result.data[0].latitude,
                    lng: result.data[0].longitude

                };
                console.log($scope.newLocation.city);

                //TODO Map Preview
                ngDialog.open({ template: 'submitLocation', width: 880, scope: $scope});

            }
            else {
                //TODO Custom alert box
                alert("Nicht bekannt")
            }


        })
    };

    $scope.noSubmit = function () {
        $scope.newLocation.city = null;
        $scope.user.location.city = "";
        ngDialog.close();

    };

    $scope.submitLocation = function () {
        const data = {
            _id : $scope.user._id,
            newLocation : $scope.newLocation.city
        };

        $http.post('/api/post/add/location', data).then(function (result) {
            $http.get('/api/get/user').then(function (res) {
                $scope.user = res.data[0];
                $scope.activeTab = null;
                ngDialog.close();
            });

        })
    };


    // GAS
    $scope.editGas = function () {
        $scope.newGas =  angular.copy($scope.user.gas);
        $scope.activeTab = "Gas"
        console.log($scope.newGas );
    };

    $scope.changeGasMode = function () {
        const data = {
            _id : $scope.user._id,
            gas : {
                type : $scope.newGas[0].type,
                radius: $scope.newGas[0].radius
            }
        };

        $http.post('/api/post/edit/gas', data).then(function (result) {
            $http.get('/api/get/user').then(function (res) {
                $scope.user = res.data[0];
                $scope.activeTab = null;
                ngDialog.close();
            });

        })
    };





});
