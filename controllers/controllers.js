//CONTROLLERS

angular.module('swApp')

    .controller('homeCtrl', function ($scope, $location, logicService) {

        // console.log('in home ctrl');

        $scope.categories = logicService.getCategories();

        $scope.categoryChoice = function(e) {
            if (e.target.parentElement.id) {
                $scope.category = e.target.parentElement.id;
                console.log(e.target.parentElement.id);
            } else if (e.target.id) {
                $scope.category = e.target.id;
                console.log(e.target.id);
            } else {
                console.log(e.target.textContent);
                $scope.category = e.target.textContent;
            }

            $location.path("/search");
        };

        $scope.$watch('category', function () {
            logicService.category = $scope.category;
        });

        $scope.capitalize = function(word) {
            return logicService.capitalizeThis(word);
        };

        $scope.highlightCategory = function(e) {
            var text = $scope.capitalize(e.target.id);
            $("#category_text").text(text);
            $("#category_text").addClass('animated pulse yellow_text');
            console.log(text);
        };

        $scope.leaveCategory = function(e) {
            $("#category_text").text("Select a category:");
            $("#category_text").removeClass('animated pulse yellow_text');
        }


        // uncomment this function and add masterApiService to dependencies to get lists for autocomplete
        // masterApiService.getAllData(function(response) {
        //     console.log('in results function after api call.');
        //     console.log(response);
        //     var results = response.data.results;
        //     results.forEach(function(result) {
        //         $('#totalResults').append('\'' + result.name + '\',');
        //     });
        //     }, function(err) {
        //         console.log(err.status);
        //     });

    })

    // This is the controller for the realms page
    .controller('searchCtrl', function ($scope, $location, logicService, modelService) {

        // console.log('in search ctrl');

        $scope.category = logicService.category;

        $scope.$watch('search_term', function () {
            logicService.search_term = $scope.search_term;
        });

        $scope.submit = function() {
            if ($scope.category) {
                var pathCategory = logicService.lowerCaseThis($scope.category);
                $location.path("/results");
                // console.log($scope.search_term);
            }

        };

        $scope.getItems = function() {
            switch ($scope.category) {
                case "films":
                    return $scope.entries.films;
                    break;
                case "people":
                    return $scope.entries.people;
                    break;
                case "starships":
                    return $scope.entries.starships;
                    break;
                case "vehicles":
                    return $scope.entries.vehicles;
                    break;
                case "species":
                    return $scope.entries.species;
                    break;
                case "planets":
                    return $scope.entries.planets;
                    break;
            }
        };

        $scope.entries = modelService.getData();

    })

    // This is the controller for the People results
    .controller('resultCtrl', function ($rootScope, $scope, searchService, logicService, apiService, parseService, $location, $timeout) {

        var screen_size = logicService.getWindowSize();

        var setBackgroundSize = function() {
            console.log($('.results_inner_wrapper').height());
            // console.log(height);

        }

        // $timeout(function(){
        //     console.log("Running after the digest cycle");
        //     setBackgroundSize();
        // },0,false);

        // function postDigest(callback){
        //     var unregister = $rootScope.$watch(function(){
        //         unregister();
        //         $timeout(function(){
        //             callback();
        //             postDigest(callback);
        //         },0,false);
        //     });
        // }
        //
        // postDigest(function(){
        //     console.log('do something');
        // })

        // setBackgroundSize();

        console.log('in result controller.');

        var self = this;

        $scope.category = logicService.lowerCaseThis(logicService.category);
        // console.log(category);

        self.cache_results = null;

        $scope.search_term = logicService.search_term;

        $scope.loading = false;

        $scope.getTemplateUrl = function() {
            // console.log('here');
            if ($scope.category == "films")
                return 'templates/filmResult.htm';
            if ($scope.category == "people")
                return 'templates/peopleResult.htm';
            if ($scope.category == "planets")
                return 'templates/planetResult.htm';
            if ($scope.category == "species")
                return 'templates/speciesResult.htm';
            if ($scope.category == "starships")
                return 'templates/starshipResult.htm';
            if ($scope.category == "vehicles")
                return 'templates/vehicleResult.htm';
        };

        var triggerResults = function(category) {
            // console.log('in trigger results');

            var category = category;

            // console.log($scope.search_term);

            self.cache_results = logicService.getCacheItem(category + ':' + $scope.search_term);

            // If the cache item does not exist, make the API call.
            if (!self.cache_results) {
                // $scope.film_container_size = [];
                apiService.search_term = $scope.search_term;
                apiService.category = category;
                self.container_size = [];
                // console.log('cache doesnt have item. making api call.');
                apiService.getData(function(response) {
                    // console.log('in results function after api call.');
                    // console.log(response);
                    $scope.results = response.data.results;
                    $scope.results_length = $scope.results.length;
                    // console.log($scope.results);
                    // console.log(self.container_size);
                    logicService.setCacheItem(category + ':' + $scope.search_term, $scope.results);
                    // This is the only call to the parseService made.
                    parseService.parseResults($scope.results, category);
                }, function(err) {
                    console.log(err.status);
                });
            } else {
                // console.log('item is cached.  retrieving values from cache.');
                // This is the only call to the parseService made.
                $scope.results = self.cache_results;
                parseService.parseResults($scope.results, category);
                logicService.setSpinner(false);
                // console.log($('.results_inner_wrapper').height());

            }
        }

        $scope.$watch('search_term', function() {
            // console.log('ITEM CHANGE');
            $scope.search_term = logicService.search_term;
            triggerResults($scope.category);
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

        $scope.$watch(function () {
            // console.log(logicService.getSpinner());
            $scope.loading = logicService.getSpinner();
            if (!$scope.loading) {
                console.log('done with spinner');
                // Using .css('height') vs height().  .css includes border and padding.
                var height = $('.results_inner_wrapper').css('height');
                console.log(height);
                $('.bg_result_underlay:first-of-type').height(height);
                console.log($scope.results_length);
                // Need to cycle through each result and do calculations
                for (var x = 2; x <= $scope.results_length; x++) {

                    console.log($('.results_inner_wrapper:nth-of-type(' + x + ')'));
                    console.log( $('.bg_result_underlay:nth-of-type(' + x + ')').height(height));
                    // need to perform calculations based off the number of results.
                    // get height of next result
                    var h = $('.results_inner_wrapper:nth-of-type(x)').css('height');
                    // Apply height to bg element.
                    $('.bg_result_underlay:nth-of-type(x)').height(height);
                }

            }
        });

        $scope.$watch('films', function () {
            // console.log('film_list has changed');
            $scope.films = parseService.film_list;
        }, true);

        $scope.convertToLocal = function(some_date) {
            return logicService.localizeThis(some_date);
        };

        $scope.convertWeight = function(mass) {
            return logicService.weightThis(mass);
        };

        $scope.callUrl = function(name, url) {
            // console.log('----------------------------------------------------------------------');
            // console.log('we are going to call the api for ' + url);
            // console.log(name);
            // var url_string = url.toString();
            var _slice = url.lastIndexOf('/');
            var _url = url.substr(0, _slice);
            var __slice = _url.lastIndexOf('/')
            var __url = _url.substr(0, __slice);
            var ___slice = __url.lastIndexOf('/') + 1;
            var category = url.substr(0, _slice)
                    .substr(0, __slice)
                    .substr(___slice, __url.length);

            console.log(category);
            console.log(name);


            logicService.category = category;
            $scope.category = category;
            logicService.search_term = name;
            $scope.search_term = name;
            // $location.path("/" + category);
            $location.path("/results");
        };

        $scope.checkValue = function(receivedValue) {
            return logicService.checkValue(receivedValue);

        };

        $scope.checkTerm = function() {
            if (!$scope.search_term) {
                console.log('return true');
                return false;
            } else {
                console.log('return false');
                return true;
            }
        };

        $scope.checkLineLength = function(line_length) {

            console.log(line_length);

            switch (screen_size) {
                case "xs":
                    // console.log('xs screen size');
                    if (line_length >= 26) {
                        // console.log('return true');
                        return true
                    } else {
                        // console.log('return false');
                        return false;
                    }
                    // return $scope.entries.films;
                    break;
                case "xs+":
                    // console.log('xs+ screen size');
                    if (line_length >= 50) {
                        // console.log('return true');
                        return true
                    } else {
                        // console.log('return false');
                        return false;
                    }
                    // return $scope.entries.films;
                    break;
                case "sm":
                    // console.log('small screen size');
                    if (line_length >= 32) {
                        // console.log('return true');
                        return true
                    } else {
                        // console.log('return false');
                        return false;
                    }
                    break;
                case "sm+":
                    // console.log('small+ screen size');
                    if (line_length >= 68) {
                        // console.log('return true');
                        return true
                    } else {
                        // console.log('return false');
                        return false;
                    }
                    break;
                case "med":
                    // console.log('med screen size');
                    if (line_length >= 40) {
                        // console.log('return true');
                        return true
                    } else {
                        // console.log('return false');
                        return false;
                    }

                    break;
                case "med+":
                    // console.log('med+ screen size');
                    if (line_length >= 72) {
                        // console.log('return true');
                        return true
                    } else {
                        // console.log('return false');
                        return false;
                    }
                    break;
                case "lrg":
                    // console.log('lrg screen size');
                    if (line_length >= 73) {
                        // console.log('return true');
                        return true
                    } else {
                        // console.log('return false');
                        return false;
                    }
                    break;
                case "lrg+":
                    // console.log('lrg+ screen size');
                    if (line_length >= 104) {
                        // console.log('return true');
                        return true
                    } else {
                        // console.log('return false');
                        return false;
                    }
                    break;
            }
        };
    })

    .controller('errorCtrl', function ($scope, $timeout, $location) {
        // console.log('in error ctrl');
        $scope.counter = 5;
        var stopped;

        var countdown = function() {
            stopped = $timeout(function() {
                // console.log($scope.counter);
                $scope.counter--;
                if ($scope.counter == 0) {
                    $('#redirection_notice').addClass('animated fadeIn');
                    $timeout(function() {
                            $location.path('/');
                        }, 1000);
                } else
                    countdown();
            }, 1000);
        };

        countdown();


        })
