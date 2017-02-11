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

        var getCacheItem = function (item) {
            return myCache.get(item);
        };

        var setCacheItem = function (cache, items) {
            myCache.put(cache, items);
        };


        // Public variables

        return {

            showCacheLengthWrapper: function() {
                var info = myCache.info();
                return info.size;
            },

            setCacheItem: function(name, contents) {
                setCacheItem(name, contents);
            },

            getCacheItem: function(cacheName) {
                // console.log(cacheName);
                return getCacheItem(cacheName);
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

        console.log(logicService.search_term);

        self.category = logicService.lowerCaseThis(logicService.category);
        self.search_term = logicService.search_term;

        // console.log(self.search_term);
        // console.log(self.category);

        apiService.category = logicService.lowerCaseThis(self.category);
        apiService.search_term = self.search_term;

    })

    .service('apiService', function($http, logicService) {

        console.log('in api service');
        var self = this;

        self.category = logicService.lowerCaseThis(logicService.category);
        self.search_term = logicService.search_term;
        console.log(self.search_term);
        // console.log(self.category);




        this.getData = function(callback, err) {
            $http.get('https://swapi.co/api/' + self.category + '/?search='+ self.search_term)
                 .then(callback,err);
        }

        this.getDataUrl = function(url, callback, err) {
            $http.get(url)
                .then(callback,err);
        }

        this.test = function(url) {
            // console.log(url);
            return url + "1";
        }

    })

    .service('parseService', function (apiService, logicService) {
        var self = this;
        console.log('in parseService');

        self.categories_with_url = ["homeworld"];

        self.categories_with_array = ["films"];

        self.film_array = [];
        self.films = [];
        self.homeworlds = [];


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

            // var film_array = [];

            if (self.film_array) {
                console.log('self.film_array has data. clearing.');
                self.film_array = [];
            }


            if (self.homeworlds.length) {
                console.log('self.homeworlds has data. clearing.');
                self.homeworlds = [];
            }

            if (self.films.length) {
                console.log('self.films has data. clearing.');
                self.films = [];

            }


            // console.log(film_array);

            // We need to cycle through object returned in the event there are many.
            results_to_parse.forEach(function(result_item) {


                // For each result, we need to check for specific fields that require additional API calls.
                // These categories should be stored in an object.

                // For each homeworld, for example
                self.categories_with_url.forEach(function(category) {
                    console.log(category);
                    if (result_item[category]) {
                        // make api call
                        var url = result_item[category];
                        // console.log(url);
                        // Before any API calls, we need to check the cache.
                        var cache_results = logicService.getCacheItem(url);
                        // console.log(cache_results);
                        if (!cache_results) {
                            apiService.getDataUrl(url, function(response) {
                                console.log('homeworld is not in cache');
                                // Store the name for the resolved URL in a variable.
                                var homeworld_name = response.data.name;
                                self.homeworlds.push(homeworld_name);
                                // Push the URL and result to the Cache
                                logicService.setCacheItem(url, response);

                            }, function(err) {
                                console.log(err.status);
                            });
                        } else {
                            console.log('homeworld is in cache');
                            // console.log(cache_results);
                            var homeworld_name = cache_results.data.name;
                            // console.log(homeworld_name);
                            self.homeworlds.push(homeworld_name);
                        }
                        // console.log(self.homeworlds);
                    }
                });

                // Like films, for example
                self.categories_with_array.forEach(function(category) {
                    // console.log(category);
                    if (result_item[category]) {
                        // make api call
                        var some_url = result_item[category];
                        // console.log(some_url);

                        // For each film in the results

                        some_url.forEach(function(url) {
                            // console.log(url);
                            var cache_results = logicService.getCacheItem(url);
                            if (!cache_results) {
                                apiService.getDataUrl(url, function(response) {
                                    console.log('films is not in cache');
                                    // Store the name for the resolved URL in a variable.
                                    // console.log(category);
                                    switch (category) {
                                        case 'films':
                                            // console.log('they are films');
                                            var film_name = response.data.title;
                                            // console.log(film_name);

                                            self.film_array.push(film_name);
                                        // self.films.push(film_name);
                                    }
                                    // Push the URL and result to the Cache
                                    logicService.setCacheItem(url, response);
                                    // console.log(logicService.getCacheItem(url));

                                }, function(err) {
                                    console.log(err.status);
                                });
                            } else {
                                // console.log(category);
                                console.log('films are in cache');
                                switch (category) {
                                    case 'films':
                                        // console.log('they are films');
                                        // console.log(cache_results);
                                        var film_name = cache_results.data.title;
                                        // console.log(film_name);

                                        self.film_array.push(film_name);
                                    // self.films.push(film_name);
                                }

                            }
                            // console.log(self.films);
                        });

                        // self.films.push(self.film_array);
                    }
                });
                self.films.push(self.film_array);
                // console.log(self.films);
            });


            // console.log(self.films);
            // console.log(self.homeworlds);

        }
    })
