//ROUTES

(function () {
    // We need to wrap this in an anonymous function for use strict.  If not and we leave use strict for just the app.js, it will error out in iOS.
    // using the function form of use-strict...
    'use strict';

    var swApp = angular.module('swApp');
    swApp.config(function ($routeProvider) {

        $routeProvider
            .when('/', {
                templateUrl: 'templates/home.tmpl.htm',
                controller: 'homeCtrl'
            })
            .when('/search', {
                templateUrl: 'templates/search.tmpl.htm',
                controller: 'searchCtrl'
            })
            .when('/results', {
                templateUrl: 'templates/results.tmpl.htm',
                controller: 'resultCtrl'
            })
            .when('/restart', {
                templateUrl: 'templates/home.tmpl.htm',
                controller: 'homeCtrl'
            })
            .when('/error', {
                templateUrl: 'templates/error.tmpl.htm',
                controller: 'errorCtrl'
            })
            .when('/home', {
                templateUrl: 'templates/home.tmpl.htm',
                controller: 'homeCtrl'
            })
            .when('/noresults', {
                templateUrl: 'templates/noresults.tmpl.htm',
                controller: 'errorCtrl'
            })
    });
})();