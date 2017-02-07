//SERVICES

angular.module('swApp')

// Assigning the cachFactory to 'myCache'
//     .factory('myCache', function($cacheFactory) {
//         return $cacheFactory('myCache');
//     })

    .service('logicService', function () {
        var self = this;

        var categories = ["people", "films", "starships", "vehicles", "species", "planets"];

        var capitalize = function(word) {
            return word.charAt(0).toUpperCase() + word.slice(1);
        };

        var lowerCase = function(word) {
            return word.charAt(0).toLowerCase() + word.slice(1);
        };

        var convertToLocal = function(some_date) {
            return new Date(some_date).toLocaleString().replace(/(.*)\D\d+/, '$1');
        };

        var convertToLbs = function (mass) {
            var approx = mass/0.45359237;
            var lbs = Math.floor(approx);
            var oz = Math.floor((approx - lbs) * 16);
            // return {
            //     pounds: lbs,
            //     ounces: oz
            // };
            return lbs + " lbs " + oz +  " oz";
        };


        // Public variables

        return {

            getCategories: function() {
                return categories;
            },

            capitalizeThis: function(word) {
                return capitalize(word);
            },

            lowerCaseThis: function(word) {
                return lowerCase(word);
            },

            localizeThis: function(some_date) {
                return convertToLocal(some_date);
            },

            weightThis: function(mass) {
                return convertToLbs(mass);
            }

        };


    })

    .service('searchService', function (apiService) {
        // var self = this;
        // //
       // / / apiService.getData();



    })

    .service('apiService', function($http) {


        this.getData = function(callback, err) {
            $http.get('https://swapi.co/api/' + this.category + '/?search='+ this.search_term)
                 .then(callback,err);
        }

        // this.getData = function(callback, err) {
        //     $http.get('https://swapi.co/api/people/?search=luke')
        //         .then(callback,err);
        // }
        this.getDataUrl = function(url, callback, err) {
            $http.get(url)
                .then(callback,err);
        }


    })
