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
    .controller('peopleCtrl', function ($scope, searchService, logicService, apiService, parseService) {

        console.log('in people controller.');

        var parsed_objects = [];

        $scope.search_term = searchService.search_term;

        $scope.category = searchService.category;


        apiService.getData(function(response) {
            $scope.core_results = response.data.results;
            parseService.parseResults($scope.core_results);
        }, function(err) {
            console.log(err.status);
        });

        $scope.$watch('films', function () {
            $scope.films = parseService.films;
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


    })

    // This is the controller for the Vehicle results
    .controller('vehicleCtrl', function ($scope, searchService, apiService, logicService) {

        console.log('here');




    })




