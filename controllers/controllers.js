//CONTROLLERS

angular.module('swApp')

    .controller('homeCtrl', function ($scope, $location, logicService) {

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
            }

        };
    })

    // This is the controller for the People results
    .controller('peopleCtrl', function ($scope, searchService, logicService, apiService) {

        var apiResults = [];
        var hw = null;
        var f_array = [];

        var returned_results = [];
        $scope.films = [];

        console.log('in people controller.');




        $scope.search_term = searchService.search_term;

        $scope.category = searchService.category;


        console.log($scope.search_term);
        console.log($scope.category);

        if (!logicService.getCacheItems($scope.search_term)) {
            apiService.getData(function(response) {
                var trimmed_results = response.data.results;
                // Trimmed_results contains an object for each separate item returned.
                trimmed_results.forEach(function(obj){
                    parseHwUrl(obj);
                    obj.homeworld = hw;

                    populateFArray(obj);

                    apiResults.push(obj);
                });

                $scope.item = apiResults;
                logicService.setCacheItems($scope.search_term, apiResults);


                console.log($scope.item.length);

                console.log(response);
            }, function(err) {
                console.log(err.status);
            });
        } else {
            $scope.item = logicService.getCacheItems($scope.search_term);
            populateHwArray($scope.item);
            populateFArray($scope.item);
        }



        $scope.convertToLocal = function(some_date) {
            return logicService.localizeThis(some_date);
        };

        $scope.convertWeight = function(mass) {
            return logicService.weightThis(mass);
        };

        var parseHwUrl = function(obj) {
{
            console.log(obj.homeworld);
            apiService.getDataUrl(obj.homeworld, function(response) {

                // $scope.homeworld = response.data.name;
                console.log(response);
                hw = response.data.name;
            }, function(err) {
                console.log(err.status);
            });


        };

        var populateFArray = function(items_returned) {
            items_returned.forEach(function(item) {
                console.log(item.films);
                item.films.forEach(function(film_url) {
                    apiService.getDataUrl(film_url, function(response) {
                        $scope.films.push(response.data.title);
                        console.log(response);
                    }, function(err) {
                        console.log(err.status);
                    });
                });

            })

        };


    })

    // This is the controller for the Vehicle results
    .controller('vehicleCtrl', function ($scope, searchService, apiService, logicService) {

        console.log('here');




    })




