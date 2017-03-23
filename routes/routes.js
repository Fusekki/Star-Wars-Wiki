//ROUTES

swApp.config(function ($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl: 'templates/home.htm',
            controller: 'homeCtrl'
        })
        .when('/search', {
            templateUrl: 'templates/search.htm',
            controller: 'searchCtrl'
        })
        .when('/results', {
            templateUrl: 'templates/results.htm',
            controller: 'resultCtrl'
        })
        .when('/restart', {
            templateUrl: 'templates/home.htm',
            controller: 'homeCtrl'
        })
        .when('/error', {
            templateUrl: 'templates/error.htm',
            controller: 'errorCtrl'
        })
        .when('/home', {
            templateUrl: 'templates/home.htm',
            controller: 'homeCtrl'
        })
        .when('/noresults', {
            templateUrl: 'templates/noresults.htm',
            controller: 'errorCtrl'
        })
});