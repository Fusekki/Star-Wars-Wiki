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

        .when('/people', {
            templateUrl: 'templates/peopleResult.htm',
            controller: 'peopleCtrl'
        })
});