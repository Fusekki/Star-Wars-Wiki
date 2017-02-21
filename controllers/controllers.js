//CONTROLLERS

angular.module('swApp')

    .controller('homeCtrl', function ($scope, $location, logicService) {

        console.log('in home ctrl');

        $scope.categories = logicService.getCategories();

        $scope.categoryChoice = function(e) {
            $scope.category = e.target.textContent;
            $location.path("/search");
        };

        $scope.$watch('category', function () {
            logicService.category = $scope.category;
        });

        $scope.capitalize = function(word) {
            return logicService.capitalizeThis(word);
        };
    })

    // This is the controller for the realms page
    .controller('searchCtrl', function ($scope, $location, logicService) {

        console.log('in search ctrl');

        $scope.category = logicService.category;

        $scope.$watch('search_term', function () {
            logicService.search_term = $scope.search_term;
        });

        $scope.submit = function() {
            if ($scope.category) {
                var pathCategory = logicService.lowerCaseThis($scope.category);
                $location.path("/" + pathCategory);
                console.log($scope.search_term);
            }

        };
    })

    // This is the controller for the People results
    .controller('resultCtrl', function ($scope, searchService, logicService, apiService, parseService) {

        console.log('in result controller.');

        var self = this;

        var category = logicService.lowerCaseThis(logicService.category);

        self.cache_results = null;

        $scope.search_term = logicService.search_term;


        var triggerResults = function(category) {
            console.log('in trigger results');

            var category = category;

            console.log($scope.search_term);

            self.cache_results = logicService.getCacheItem($scope.search_term);

            // If the cache item does not exist, make the API call.
            if (!self.cache_results) {
                // $scope.film_container_size = [];
                apiService.search_term = $scope.search_term;
                apiService.category = category;
                self.container_size = [];
                console.log('cache doesnt have item. making api call.');
                apiService.getData(function(response) {
                    console.log('in results function after api call.');
                    console.log(response);
                    $scope.results = response.data.results;
                    $scope.results_length = $scope.results.length;
                    // console.log($scope.results);
                    // console.log(self.container_size);
                    logicService.setCacheItem($scope.search_term, $scope.results);
                    parseService.parseResults($scope.results, category);
                }, function(err) {
                    console.log(err.status);
                });
            } else {
                console.log('item is cached.  retrieving values from cache.');
                // console.log(self.cache_results);
                $scope.results = self.cache_results;
                parseService.parseResults($scope.results, category);
            }
        }

        $scope.$watch('search_term', function() {
            console.log('ITEM CHANGE');
            $scope.search_term = logicService.search_term;
            triggerResults(category);
        });



        $scope.$watch('homeworlds', function () {
            // console.log('homeworlds has changed');
            $scope.homeworlds = parseService.homeworlds;
            // console.log(parseService.homeworlds);
            // console.log($scope.homeworlds);
        });

        $scope.$watch('species', function () {
            $scope.species = parseService.species;
        });

        $scope.$watch('pilots', function () {
            $scope.pilots = parseService.pilots;
        });

        $scope.$watch('people', function () {
            $scope.people = parseService.people;
        });

        $scope.$watch('planets', function () {
            $scope.planets = parseService.planets;
        });

        $scope.$watch('characters', function () {
            $scope.characters = parseService.characters;
        });

        $scope.$watch('starships', function () {
            $scope.starships = parseService.starships;
        });

        $scope.$watch('vehicles', function () {
            $scope.vehicles = parseService.vehicles;
        });


        $scope.$watch('films', function () {
            console.log('film_list has changed');
            $scope.films = parseService.film_list;
        }, true);

        $scope.convertToLocal = function(some_date) {
            return logicService.localizeThis(some_date);
        };

        $scope.convertWeight = function(mass) {
            return logicService.weightThis(mass);
        };

        $scope.callUrl = function(url) {
            console.log('we are going to call the api for ' + url);
        }

    })

    // This is the controller for the People results
    .controller('peopleCtrl', function ($scope, searchService, logicService, apiService, parseService) {

        console.log('in people controller.');

        var self = this;
        self.cache_results = null;

        $scope.search_term = logicService.search_term;

        apiService.search_term = $scope.search_term;
        apiService.category = logicService.lowerCaseThis(logicService.category);

        self.cache_results = logicService.getCacheItem($scope.search_term);

        // If the cache item does not exist, make the API call.
        if (!self.cache_results) {
            $scope.film_container_size = [];
            console.log('cache doesnt have item. making api call.');
            apiService.getData(function(response) {
                $scope.results = response.data.results;
                $scope.results_length = response.data.results.length;
                // console.log($scope.core_results.length);
                // console.log($scope.film_container_size);
                logicService.setCacheItem($scope.search_term, $scope.results);
                parseService.parseResults($scope.results);
            }, function(err) {
                console.log(err.status);
            });
        } else {
            console.log('item is cached.  retrieving values from cache.');
            // console.log(self.cache_results);
            $scope.results = self.cache_results;
            parseService.parseResults($scope.results);
        }

        $scope.$watch('films', function () {
            $scope.films = parseService.film_list;
        });


        $scope.$watch('homeworlds', function () {
            $scope.homeworlds = parseService.homeworlds;
        });

        $scope.convertToLocal = function(some_date) {
            return logicService.localizeThis(some_date);
        };

        $scope.convertWeight = function(mass) {
            return logicService.weightThis(mass);
        };

        $scope.callUrl = function(url) {
            console.log('we are going to call the api for ' + url);
        }

    })

    // This is the controller for the Vehicle results
    .controller('vehicleCtrl', function ($scope, searchService, apiService, logicService, parseService) {

        console.log('in vehicle controller.');

        var self = this;
        self.cache_results = null;

        $scope.search_term = logicService.search_term;

        apiService.search_term = $scope.search_term;
        apiService.category = logicService.lowerCaseThis(logicService.category);

        self.cache_results = logicService.getCacheItem($scope.search_term);

        // If the cache item does not exist, make the API call.
        if (!self.cache_results) {
            $scope.film_container_size = [];
            console.log('cache doesnt have item. making api call.');
            apiService.getData(function(response) {
                $scope.vehicle_results = response.data.results;
                $scope.vehicle_results_length = response.data.results.length;
                console.log($scope.vehicle_results.length);
                console.log($scope.vehicle_results);
                logicService.setCacheItem($scope.search_term, $scope.vehicle_results);
                parseService.parseResults($scope.vehicle_results);
            }, function(err) {
                console.log(err.status);
            });
        } else {
            console.log('item is cached.  retrieving values from cache.');
            // console.log(self.cache_results);
            $scope.vehicle_results = self.cache_results;
            parseService.parseResults($scope.vehicle_results);
        }

        $scope.$watch('films', function () {
            $scope.films = parseService.film_list;
        });

        $scope.$watch('pilots', function () {
            $scope.pilots = parseService.pilot_list;
        });

        $scope.convertToLocal = function(some_date) {
            return logicService.localizeThis(some_date);
        };

        $scope.convertWeight = function(mass) {
            return logicService.weightThis(mass);
        };

        $scope.callUrl = function(url) {
            console.log('we are going to call the api for ' + url);
        }
    })
