//CONTROLLERS

angular.module('swApp')

    .controller('homeCtrl', function ($scope, $location, logicService) {

        // Uncomment following lines and add debugService to each controller
        // Debug Tools Area

        // $scope.$watch('debug', function() {
        //     $scope.debug = debugService.isDebug();
        // });

        // $scope.$watch('screen_pixels', function() {
        //     $scope.screen_pixels = debugService.getScreenPixels();
        // });

        // End debug

        $scope.$watch('screen_size', function() {
            $scope.screen_size = logicService.getWindowSize();
        });





        $scope.$on('orientation_change', function() {
            console.log('in broadcast');
            $scope.screen_orientation = logicService.getOrientation();
            $scope.screen_size = logicService.getWindowSize();
            $scope.screen_pixels = debugService.getScreenPixels();
            // Need to add digest otherwise the view does not update
            $scope.$digest();
        });

        // End Debug tools.

        $scope.categories = logicService.getCategories();

        $scope.categoryChoice = function(e) {
            if (e.target.parentElement.id) {
                $scope.category = e.target.parentElement.id;
            } else if (e.target.id) {
                $scope.category = e.target.id;
            } else {
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
        };

        $scope.leaveCategory = function(e) {
            $("#category_text").text("Select a category:");
            $("#category_text").removeClass('animated pulse yellow_text');
        };
    })

    .controller('searchCtrl', function ($scope, $location, logicService, modelService) {


        $scope.category = logicService.category;

        $scope.$watch('search_term', function () {
            logicService.search_term = $scope.search_term;
        });

        $scope.submit = function() {
            if ($scope.category) {
                var pathCategory = logicService.lowerCaseThis($scope.category);
                $location.path("/results");
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
    .controller('resultCtrl', function ($rootScope, $scope, searchService, logicService, apiService, parseService, $location) {


        var screen_size = logicService.getWindowSize();

        var setBackgroundSize = function() {
            console.log($('.results_inner_wrapper').height());
        };

        var self = this;

        $scope.category = logicService.lowerCaseThis(logicService.category);

        self.cache_results = null;

        $scope.search_term = logicService.search_term;

        $scope.loading = false;

        $scope.getTemplateUrl = function() {
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

            var category = category;

            self.cache_results = logicService.getCacheItem(category + ':' + $scope.search_term);

            // If the cache item does not exist, make the API call.
            if (!self.cache_results) {
                apiService.search_term = $scope.search_term;
                apiService.category = category;
                self.container_size = [];
                apiService.getData(function(response) {
                    $scope.results = response.data.results;
                    $scope.results_length = $scope.results.length;
                    if (!$scope.results_length) {
                        $location.path("/noresults");
                    }
                    logicService.setCacheItem(category + ':' + $scope.search_term, $scope.results);
                    parseService.parseResults($scope.results, category);
                }, function(err) {
                    $location.path("/error");
                    console.log(err.status);
                });
            } else {
                // This is the only call to the parseService made.
                $scope.results = self.cache_results;
                parseService.parseResults($scope.results, category);
                logicService.setSpinner(false);
            }
        }


        $scope.$watch('search_term', function() {
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
        // Calculations used for function below:
        /*!*margin-top: 6em*!*/
        /*!*margin-top contents 20px;*!*/
        /*!*flex results top margin 2em*!*/
        /*!*results_inner_wrapper 18px*!*/
        /*!*height of previous background: 297.59px*!*/

        // previous item height
        //
        /*!*flex-results 14px bottom*!*/
        // +10 px padding
        /*!*flex-results top margin 2em*!*/
        /*!*results hdr 40px;*!*/


        $scope.$watch(function () {
            $scope.loading = logicService.getSpinner();
            if (!$scope.loading) {
                // Using .css('height') vs height().  .css includes border and padding.
                var height = $('.results_inner_wrapper').css('height');
                $('.bg_result_underlay:first-of-type').height(height);
                // Need to cycle through each result and do calculations
                for (var x = 0; x <= $scope.results_length - 1; x++) {
                    // need to perform calculations based off the number of results.
                    // get height of next result
                    switch (screen_size) {
                        case 'xs':
                        case 'xs+':
                        case 'sm':
                        case 'sm+':
                        case 'med':
                        case 'med+':
                        case 'lrg':
                            var h = $('.results_inner_wrapper').eq(x).css('height');
                            var top = $('.bg_result_underlay').eq(x).css('top');
                            var h_new = $('.results_inner_wrapper').eq(x + 1).css('height');
                            var new_top = top + ' + ' + h + ' + 14px + 2em + 14px + 40px';
                            $('.bg_result_underlay').eq(x + 1).css('top', 'calc(' + new_top + ')');
                            $('.bg_result_underlay').eq(x + 1).css('height', h_new);
                            break;
                        case 'lrg+':
                            var h = $('.results_inner_wrapper').eq(x).css('height');
                            var top = $('.bg_result_underlay').eq(x).css('top');
                            var h_new = $('.results_inner_wrapper').eq(x + 1).css('height');
                            var new_top = top + ' + ' + h + ' + 14px + 2em + 14px + 40px';
                            $('.bg_result_underlay').eq(x + 1).css('top', 'calc(' + new_top + ')');
                            $('.bg_result_underlay').eq(x + 1).css('height', h_new);
                            break;
                    }
                }
            }
        });

        $scope.$watch('films', function () {
            $scope.films = parseService.film_list;
        }, true);

        $scope.convertToLocal = function(some_date) {
            return logicService.localizeThis(some_date);
        };

        $scope.convertToLocalDate = function(some_date) {
            return logicService.localizeThisDate(some_date);
        };

        $scope.convertWeight = function(mass) {
            return logicService.weightThis(mass);
        };

        $scope.convertHeight = function(height) {
            return logicService.heightThis(height);
        }

        $scope.callUrl = function(name, url) {
            var _slice = url.lastIndexOf('/');
            var _url = url.substr(0, _slice);
            var __slice = _url.lastIndexOf('/')
            var __url = _url.substr(0, __slice);
            var ___slice = __url.lastIndexOf('/') + 1;
            var category = url.substr(0, _slice)
                    .substr(0, __slice)
                    .substr(___slice, __url.length);

            logicService.category = category;
            $scope.category = category;
            logicService.search_term = name;
            $scope.search_term = name;
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
    })

    .controller('errorCtrl', function ($scope, $timeout, $location, logicService) {

        $scope.category = logicService.category;
        $scope.search_term = logicService.search_term;
        $scope.counter = 5;
        var stopped;

        var countdown = function() {
            stopped = $timeout(function() {
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
