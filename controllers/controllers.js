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
                $scope.core_results = response.data.results;
                $scope.core_results_length = response.data.results.length;
                // console.log($scope.core_results.length);
                // console.log($scope.film_container_size);
                logicService.setCacheItem($scope.search_term, $scope.core_results);
                parseService.parseResults($scope.core_results);
            }, function(err) {
                console.log(err.status);
            });
        } else {
            console.log('item is cached.  retrieving values from cache.');
            // console.log(self.cache_results);
            $scope.core_results = self.cache_results;
            parseService.parseResults($scope.core_results);
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
