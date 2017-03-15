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



        // .when('/planets', {
        //     templateUrl: 'templates/planetResult.htm',
        //     controller: 'resultCtrl'
        // })
        //
        // .when('/species', {
        //     templateUrl: 'templates/speciesResult.htm',
        //     controller: 'resultCtrl'
        // })
        //
        // .when('/starships', {
        //     templateUrl: 'templates/starshipResult.htm',
        //     controller: 'resultCtrl'
        // })
        //
        // .when('/vehicles', {
        //     templateUrl: 'templates/vehicleResult.htm',
        //     controller: 'resultCtrl'
        // })
        //
        // .when('/films', {
        //     templateUrl: 'templates/filmResult.htm',
        //     controller: 'resultCtrl'
        // })
});