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
            templateUrl: 'results.htm',
            controller: 'resultCtrl'
        })

        // .when('/people', {
        //     templateUrl: 'templates/peopleResult.htm',
        //     controller: 'resultCtrl'
        // })
        //
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