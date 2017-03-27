//MODULE

(function() {
    // using the function form of use-strict...
    "use strict";
    var swApp = angular.module('swApp', ['ui.bootstrap', 'ngRoute', 'ngResource', 'angularSpinners']);


    swApp.run(function ($rootScope, $route, $window, $location) {

        $rootScope.$on('$routeChangeStart', function (event, next, current) {
            if (next.$$route.controller == "homeCtrl" || next.$$route.controller == undefined) {
                $location.path('/');
            } else if (!current) {
                $location.path('/error');
            }
        });
    });
})();





