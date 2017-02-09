//SERVICES

angular.module('swApp')

// Assigning the cachFactory to 'myCache'
    .factory('myCache', function($cacheFactory) {
        return $cacheFactory('myCache');
    })

    .service('logicService', function ($rootScope, myCache) {
        var self = this;

        console.log('in logic service');

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
            return lbs + " lbs " + oz +  " oz";
        };

        var getCacheStatus = function (cache) {
            return myCache.get(cache);
        };

        var setCacheStatus = function (cache, items) {
            myCache.put(cache, items);
        };

        // Public variables

        return {

            setCacheItems: function(cacheName, cacheContents) {


            },

            getCacheItems: function(cacheName) {
                return myCache.get(cacheName);
            },

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

    .service('searchService', function (logicService, apiService) {

        console.log('in search service');
        var self=this;

        self.category = logicService.lowerCaseThis(logicService.category);
        self.search_term = logicService.search_term;

        console.log(self.search_term);
        console.log(self.category);

        apiService.category = logicService.lowerCaseThis(self.category);
        apiService.search_term = self.search_term;

    })

    .service('apiService', function($http, logicService) {

        var self = this;

        self.category = logicService.lowerCaseThis(logicService.category);
        self.search_term = logicService.search_term;
        console.log(self.search_term);
        console.log(self.category);

        console.log('in api service');


        this.getData = function(callback, err) {
            $http.get('https://swapi.co/api/' + this.category + '/?search='+ this.search_term)
                 .then(callback,err);
        }

        this.getDataUrl = function(url, callback, err) {
            $http.get(url)
                .then(callback,err);
        }

        this.test = function(url) {
            console.log(url);
            return url + "1";
        }

    })
