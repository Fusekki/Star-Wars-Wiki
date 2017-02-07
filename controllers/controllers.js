//CONTROLLERS

angular.module('swApp')

    .controller('homeCtrl', function ($scope, $location, searchService, logicService) {

        $scope.categories = logicService.getCategories();

        $scope.categoryChoice = function(e) {
            $scope.category = e.target.textContent;
            $location.path("/search");
        };

        $scope.$watch('category', function () {
            searchService.category = $scope.category;
        });

        $scope.capitalize = function(word) {
            return logicService.capitalizeThis(word);
        };



    })

    // This is the controller for the realms page
    .controller('searchCtrl', function ($scope, $location, searchService, logicService) {
        // $scope.search_term = searchService.search_term;
        $scope.category = searchService.category;

        $scope.$watch('search_term', function () {
            searchService.search_term = $scope.search_term;
        });

        // $scope.submit = function() {
        //     $location.path("/people");
        // };

        $scope.submit = function() {
            var pathCategory = logicService.lowerCaseThis($scope.category);
            $location.path("/" + pathCategory);
        };



        console.log(searchService.category);

    })

    // This is the controller for the People results
    .controller('peopleCtrl', function ($scope, searchService, apiService, logicService) {

        var homeworlds = [];
        var homeworld;

        var films = [];
        var film;

        $scope.search_term = searchService.search_term;


        $scope.convertToLocal = function(some_date) {
            return logicService.localizeThis(some_date);
        };

        $scope.convertWeight = function(mass) {
            return logicService.weightThis(mass);
        };

        apiService.search_term = searchService.search_term;
        apiService.category = logicService.lowerCaseThis(searchService.category);

        apiService.getData(function(response) {
            $scope.item = response.data.results;
            console.log(response);
            // The following code is temporary and should be updated after all controllers are in place.
            var trimmed_results = response.data.results;
            trimmed_results.forEach(function(element) {
                homeworld = element.homeworld;
                element.films.forEach(function(film) {
                    film = film;
                    console.log(film);
                    films.push(film);
                });
            });
            console.log(homeworld);
            getDataWrapper(homeworld, homeworlds);
            films.forEach(function(film) {
                getDataWrapper(film, null);
            });





        }, function(err) {
            console.log(err.status);
        });

        var getDataWrapper = function(some_url, some_array) {
            console.log(some_url);
            apiService.getDataUrl(some_url, function(response) {
                console.log(response);
                console.log(response.data.name);

                switch(some_array) {
                    case homeworlds:
                        $scope.homeworld = response.data.name;
                        break;
                    case null:
                        if (!$scope.films) {
                            $scope.films = [];
                        }
                        $scope.films.push(response.data.title);
                        break;
                }
                console.log($scope.films);

                // $scope.homeworld = response.data.name;

                // return response.data.results;
            }, function(err) {
                console.log(err.status);
            })
        }

        var callUrl = function(some_url) {
            console.log(1);
            console.log(some_url);
        }



    })

    // This is the controller for the Vehicle results
    .controller('vehicleCtrl', function ($scope, searchService, apiService, logicService) {

        console.log('here');

        var films = [];
        var film;

        var pilots = [];
        var pilot;



        $scope.search_term = searchService.search_term;

        $scope.convertToLocal = function(some_date) {
            return logicService.localizeThis(some_date);
        };

        apiService.search_term = searchService.search_term;
        apiService.category = logicService.lowerCaseThis(searchService.category);

        apiService.getData(function(response) {
            $scope.item = response.data.results;
            console.log(response);

            var trimmed_results = response.data.results;
            console.log(trimmed_results);
            trimmed_results.forEach(function(element) {
                film = element.films;
                pilot = element.pilot;
            });
            console.log(film);
            getDataWrapper(film, films);

        }, function(err) {
            console.log(err.status);
        });


        var getDataWrapper = function(some_url, some_array) {
            console.log(some_url);
            apiService.getDataUrl(some_url, function(response) {
                console.log(response.data.name);
                $scope.film = response.data.name;

                // return response.data.results;
            }, function(err) {
                console.log(err.status);
            })
        }


    })




