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
                console.log($scope.core_results.length);
                $scope.core_results.forEach(function(obj) {

                    var height = { height:  (obj.films.length * 2) + 'em' };
                    console.log(height);


                    $scope.film_container_size.push(height);
                })
                console.log($scope.film_container_size);
                // console.log($scope.core_results);
                // Cache the item in its orginal form
                // console.log('caching original item before parse.');
                logicService.setCacheItem($scope.search_term, $scope.core_results);
                parseService.parseResults($scope.core_results);
            }, function(err) {
                console.log(err.status);
            });
        } else {
            console.log('item is cached.  retrieving values from cache.');
            console.log(self.cache_results);
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

        // $scope.film_container_height = { height: ($scope.core_results * 2) + 'em' };


        // $scope.film_container_height = { height: ($scope.core_results * 2) + 'em' };
        // $scope.$watch('film_container_height', function() {
        //     console.log($scope.film_container_height);
        // })





    })

    // This is the controller for the Vehicle results
    .controller('vehicleCtrl', function ($scope, searchService, apiService, logicService) {

        console.log('in vehicle controller.');




    })




