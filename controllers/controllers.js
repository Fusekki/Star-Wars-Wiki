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
    .controller('resultCtrl', function ($scope, searchService, logicService, apiService, parseService, $location) {

        console.log('in result controller.');

        var self = this;

        var category = logicService.lowerCaseThis(logicService.category);
        console.log(category);

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
            $scope.homeworlds = parseService.homeworlds;
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

        $scope.callUrl = function(name, url) {
            console.log('----------------------------------------------------------------------');
            console.log('we are going to call the api for ' + url);
            console.log(name);
            var url_string = url.toString();
            var end_slice = url_string.lastIndexOf('/');
            var temp_slice = url_string.substr(0, end_slice);
            console.log(temp_slice);
            var new_end_slice = temp_slice.lastIndexOf('/')
            var new_temp_slice = temp_slice.substr(0, new_end_slice);
            console.log(new_temp_slice);
            var new_new_end_slice = new_temp_slice.lastIndexOf('/') + 1;
            var new_url_string = new_temp_slice.substr(new_new_end_slice, new_temp_slice.length);
            console.log(new_url_string);
            // var category =  url.splice(19, x);
            logicService.category = new_url_string;
            $scope.category = new_url_string;
            logicService.search_term = name;
            $location.path("/" + new_url_string);
        };

    })
