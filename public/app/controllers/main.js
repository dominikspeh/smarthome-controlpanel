'use strict';
angular.module('smarthome.controllers.main', []).

controller('naviCtrl', function ($scope, $http, $location) {
    $scope.goToDashboard = function () {
        $location.path('/');
    };
    $scope.goToSongs = function () {
        $location.path('/songs');
    };
    $scope.goToNews = function () {
        $location.path('/news');
    };
    $scope.goToSettings = function () {
        $location.path('/settings');
    };




}).
controller('globalCtrl', function ($scope, $http, $location) {
    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };


});




