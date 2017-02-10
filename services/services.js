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

        var setCacheItem = function (cache, items) {
            myCache.put(cache, items);
        };

        // Public variables

        return {

            setCacheItems: function(name, contents) {
                setCacheItem(name, contents);
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

        // console.log(self.search_term);
        // console.log(self.category);

        apiService.category = logicService.lowerCaseThis(self.category);
        apiService.search_term = self.search_term;

    })

    .service('apiService', function($http, logicService) {

        var self = this;

        self.category = logicService.lowerCaseThis(logicService.category);
        self.search_term = logicService.search_term;
        // console.log(self.search_term);
        // console.log(self.category);

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

    .service('parseService', function (apiService, logicService) {
        var self = this;
        console.log('in parseService');

        var categories_with_url = ["homeworld"];

        var categories_with_array = ["films"];
        self.homeworlds = [];
        self.films = [];

        // whichever category the user specifies, there may be multiple results.
        // First, let's create the API call and then store all results in some array.

        // Call API, push results to array

        // For each result, we need to check for specific fields that require additional API calls.
        // These categories should be stored in an object.

        // Once the call is completed, store the URLName in the cache with the returned info.

        // If the category is an array object (such as films), push those items to a subarray.
        // Otherwise, just push to a variable.
        // Cycle through each item in subarray, call the API, store the URL into the cache.
        // After, push the result to subarray.

        // After all calls are done for one object, create a new $scope object that contains the results
        // (both from original, and include new variable(s) with the results of those API calls as well as arrays.

        self.parseResults = function(results_to_parse) {

            // We need to cycle through object returned in the event there are many.
            results_to_parse.forEach(function(result_item) {
                var film_array = [];

                // For each result, we need to check for specific fields that require additional API calls.
                // These categories should be stored in an object.
                categories_with_url.forEach(function(category) {
                    if (result_item[category]) {
                        // make api call
                        var url = result_item[category];
                        console.log(url);
                        apiService.getDataUrl(url, function(response) {
                            // Store the name for the resolved URL in a variable.
                            var homeworld_name = response.data.name;
                            self.homeworlds.push(homeworld_name);
                            // Push the URL and result to the Cache
                            logicService.setCacheItems(url, response);
                            }, function(err) {
                                console.log(err.status);
                            });
                        }
                });

                categories_with_array.forEach(function(category) {
                    if (result_item[category]) {
                        // make api call
                        var some_url = result_item[category];
                        console.log(some_url);
                        some_url.forEach(function(url) {
                            console.log(url);
                            apiService.getDataUrl(url, function(response) {
                                // Store the name for the resolved URL in a variable.
                                console.log(category);
                                switch (category) {
                                    case 'films':
                                        console.log('they are films');
                                        var film_name = response.data.title;
                                        console.log(film_name);

                                        film_array.push(film_name);
                                        // self.films.push(film_name);
                                }
                                // Push the URL and result to the Cache
                                logicService.setCacheItems(url, response);
                                console.log(logicService.getCacheItems(url));
                            }, function(err) {
                                console.log(err.status);
                            });
                        });
                    }
                });
                self.films.push(film_array);
            });


            console.log(self.films);
            console.log(self.homeworlds);

        }
    })
