//CONTROLLERS

angular.module('swApp')

// The home controller handles the home.htm page

    .controller('homeCtrl', function ($scope, $location, logicService) {

/*        // Uncomment following lines and add debugService to each controller
        // Debug Tools Area

        $scope.$watch('debug', function() {
            $scope.debug = debugService.isDebug();
        });

        $scope.$watch('screen_pixels', function() {
            $scope.screen_pixels = debugService.getScreenPixels();
        });

        // End debug*/

        // Watch variables

        $scope.$watch('screen_size', function() {
            $scope.screen_size = logicService.getWindowSize();
        });

        // This watch designates the logicService to always keep current with the category chosen.
        $scope.$watch('category', function () {
            logicService.category = $scope.category;
        });

        // Listener for device orientation change

        $scope.$on('orientation_change', function() {
            console.log('in broadcast');
            $scope.screen_orientation = logicService.getOrientation();
            $scope.screen_size = logicService.getWindowSize();
            // $scope.screen_pixels = debugService.getScreenPixels();
            // Need to add digest otherwise the view does not update
            $scope.$digest();
        });

        // Grabs the categories from the logicService for the home page

        $scope.categories = logicService.getCategories();

        // This function forwards to the correct category whether they click on the category or elements related to the category.
        $scope.categoryChoice = function(e) {
            console.log('here');
            console.log(e);
            if (e.target.parentElement.id) {
                $scope.category = e.target.parentElement.id;
            } else if (e.target.id) {
                $scope.category = e.target.id;
            } else {
                $scope.category = e.target.textContent;
            }
            console.log($scope.category);

            logicService.navTo("/search");
       };



        $scope.catChoice = function(e) {
            console.log(e);
        };

        // Wrapper function for shared logicService

        $scope.capitalize = function(word) {
            return logicService.capitalizeThis(word);
        };

        // This animates the category when mouse enters category element
        $scope.highlightCategory = function(e) {
            var text = $scope.capitalize(e.currentTarget.id);
            $("#category_name").text(text);
            $("#category_name").css('opacity', '1');
        };

        // This in turn removes the animation on mouse leave of category
        $scope.leaveCategory = function(e) {
            $("#category_name").css('opacity', '0');
        };


    })

    // The search controller handles the search.htm page

    .controller('searchCtrl', function ($scope, $location, logicService, modelService) {

        console.log('here in search');
        // Watches

        // First wire the category tracked by the logic service.
        $scope.category = logicService.category;

        // This watch designates the logicService to always keep current with search term entered on this page.
        $scope.$watch('search_term', function () {
            logicService.search_term = $scope.search_term;
        });

        // function for when user clicks submit.  It grabs the category from the logic Service since it is always current via the watch.
        // It then forwards to the /results path.

        $scope.submit = function() {
            if ($scope.category) {
                // var pathCategory = logicService.lowerCaseThis($scope.category);
                $location.path("/results");
            }

        };
        // This function populates the entries scope with all the model data used for the autocomplete.
        $scope.entries = modelService.getData();

        // This function is used to return the sub-object of the entries based on the category previously chosen for the autocomplete.
        $scope.getItems = function() {
            // Add the logic service call to lowercase the value because if it is selected via top nav, the category is capitalized.
            switch (logicService.lowerCaseThis($scope.category)) {
                case "films":
                    return $scope.entries.films;
                case "people":
                    return $scope.entries.people;
                case "starships":
                    return $scope.entries.starships;
                case "vehicles":
                    return $scope.entries.vehicles;
                case "species":
                    return $scope.entries.species;
                case "planets":
                    return $scope.entries.planets;
            }
        };
    })

    // This is the controller for the People results
    .controller('resultCtrl', function ($rootScope, $scope, searchService, logicService, apiService, parseService, $location) {

        var self = this;

        // Grab the window size from the shared logic service.  This is necessary to perform calculations that determine the placing of elements via JS to CSS.
        var screen_size = logicService.getWindowSize();

        // var setBackgroundSize = function() {
        //     console.log($('.results_inner_wrapper').height());
        // };

        // These wire the category and search term in this controller to the logic Service.  Again, the logic Service is a shared service that stores variables and functions shared throughout controllers.
        $scope.category = logicService.lowerCaseThis(logicService.category);
        $scope.search_term = logicService.search_term;

        self.cache_results = null;

        // This variable dictates whether the loading spinner should be displayed.
        $scope.loading = false;

        // This is used for the results-object directive.  It determines the template to load based off the category that was searched.
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

        // This function triggers the populating of the data on the template.
        var triggerResults = function(category) {

            // var category = category;

            // Check the cache results first to see if this search was performed before and saved.

            self.cache_results = logicService.getCacheItem(category + ':' + $scope.search_term);

            // If the cache item does not exist, make the API call.
            if (!self.cache_results) {
                apiService.search_term = $scope.search_term;
                apiService.category = category;
                self.container_size = [];
                apiService.getData(function(response) {
                    $scope.results = response.data.results;
                    // This determines whether any results were returned.  This variable dictates if the noresults template should be used.
                    $scope.results_length = $scope.results.length;
                    if (!$scope.results_length) {
                        $location.path("/noresults");
                    }
                    // Cache the successful results as returned by the JSON.
                    logicService.setCacheItem(category + ':' + $scope.search_term, $scope.results);
                    // This parses the results returned by the JSON into the template.
                    parseService.parseResults($scope.results, category);
                }, function(err) {
                    // On API error call, redirect to error template.
                    $location.path("/error");
                    // Display error in console for debugging purposes.
                    console.log(err.status);
                });
            } else {
                // The cache has the search saved so we are going to store that and than parse those results as the cache only stores the original JSON object.
                // This is the only call to the parseService made.
                $scope.results = self.cache_results;
                parseService.parseResults($scope.results, category);
                // Set the loading spinner to false since no loading is taking place.
                logicService.setSpinner(false);
            }
        };


        // Watches

        // This grabs the search term from the logic service.  It also initiates the trigger results function defined above.
        $scope.$watch('search_term', function() {
            $scope.search_term = logicService.search_term;
            triggerResults($scope.category);
        });

        // These series of watches wires the template variables to the results returned via the parse Service.  This is neceessary because many of the JSON objects returned require additional
        // API calls before the data is ready for the template.

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
            $scope.films = parseService.film_list;
        }, true);


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

        //  This watch does not contain a watch expression.  This is a hack because when including the watch expression of 'loading', the watch does not propery update for some reason.
        // The calculations after the switch statement set the size and position of the background image.
        $scope.$watch(function () {
            $scope.loading = logicService.getSpinner();
            if (!$scope.loading) {
                // Using .css('height') vs height().  .css includes border and padding.
                var height = $('.results_inner_wrapper').css('height');
                $('.bg_result_underlay:first-of-type').height(height);
                // Need to cycle through each result and do calculations
                for (var x = 0; x <= $scope.results_length - 1; x++) {
                    // need to perform calculations based off the number of results.
                    // define variables needed for this.
                    var h;
                    var top;
                    var h_new;
                    var new_top;
                    switch (screen_size) {
                        case 'xs':
                        case 'xs+':
                        case 'sm':
                        case 'sm+':
                        case 'med':
                        case 'med+':
                        case 'lrg':
                            h = $('.results_inner_wrapper').eq(x).css('height');
                            top = $('.bg_result_underlay').eq(x).css('top');
                            h_new = $('.results_inner_wrapper').eq(x + 1).css('height');
                            new_top = top + ' + ' + h + ' + 14px + 2em + 14px + 40px';
                            $('.bg_result_underlay').eq(x + 1).css('top', 'calc(' + new_top + ')');
                            $('.bg_result_underlay').eq(x + 1).css('height', h_new);
                            break;
                        case 'lrg+':
                            h = $('.results_inner_wrapper').eq(x).css('height');
                            top = $('.bg_result_underlay').eq(x).css('top');
                            h_new = $('.results_inner_wrapper').eq(x + 1).css('height');
                            new_top = top + ' + ' + h + ' + 14px + 2em + 14px + 40px';
                            $('.bg_result_underlay').eq(x + 1).css('top', 'calc(' + new_top + ')');
                            $('.bg_result_underlay').eq(x + 1).css('height', h_new);
                            break;
                    }
                }
            }
        });

        // These are wrapper functions for shared logic service functions.
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
        };

        // This is the wrapper function for clicking an A tag in the results.
        // It grabs the url as well as the category name from the element.
        // After, it sets the logic service variables to the elements grabbed.
        // Finally, it sets the path to /results which via the routes
        // reinitializes the result controller
        $scope.callUrl = function(name, url) {
            var _slice = url.lastIndexOf('/');
            var _url = url.substr(0, _slice);
            var __slice = _url.lastIndexOf('/');
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


        // This function checks the value returned to see if it is basically a meaningless value.  For instance, 'N/A' or 'unknown' are some values that
        // offer no value.  If this is the case, the template is directed to hide the value and the field.
        $scope.checkValue = function(receivedValue) {
            return logicService.checkValue(receivedValue);

        };

        // $scope.checkTerm = function() {
        //     if (!$scope.search_term) {
        //         console.log('return true');
        //         return false;
        //     } else {
        //         console.log('return false');
        //         return true;
        //     }
        // };
    })

    // This controller handles the error.htm and noresult.htm

    .controller('errorCtrl', function ($scope, $timeout, $location, logicService) {

        // First populate the $scope with values from the logic service.

        $scope.category = logicService.category;
        $scope.search_term = logicService.search_term;

        $scope.counter = 5;
        var stopped;

        // This function is used to countdown from 5 for the automatic redirection.
        var countdown = function() {
            stopped = $timeout(function() {
                $scope.counter--;
                if ($scope.counter === 0) {
                    $('#redirection_notice').addClass('animated fadeIn');
                    $timeout(function() {
                            $location.path('/');
                        }, 1000);
                } else
                    countdown();
            }, 1000);
        };

        // This launches the countdown.
        countdown();
        });
