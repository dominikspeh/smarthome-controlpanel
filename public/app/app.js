'use strict';
angular.module('smartHome',['mediaPlayer','angular-loading-bar','ngRoute','smarthome.filters','smarthome.controllers.main','smarthome.controllers.dashboard','smarthome.controllers.features','smarthome.controllers.settings','ngDialog']).

config(function ($routeProvider, $locationProvider ) {

    $routeProvider.
    when('/', {
        templateUrl: '/partials/index'
    }).
    when('/songs', {
        templateUrl: '/partials/songs'
    }).
    when('/news', {
        templateUrl: '/partials/news'
    }).
    when('/settings', {
        templateUrl: '/partials/settings'
    });

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

}).
config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
}]);