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

            setCacheItem: function(name, contents) {
                setCacheItem(name, contents);
            },

            getCacheItem: function(cacheName) {
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

        // console.log(logicService.search_term);

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
        // console.log(self.search_term);
        // console.log(self.category);

        this.getData = function(callback, err) {
            $http.get('https://swapi.co/api/' + self.category + '/?search='+ self.search_term)
                 .then(callback,err);
        }

        this.getDataUrl = function(url, callback, err) {
            $http.get(url)
                .then(callback,err);
        }

    })

    .service('parseService', function (apiService, logicService, $log) {
        var self = this;

        self.item_number = 0;
        self.array_count = 0;

        console.log('in parseService');

        self.categories_with_url = ["homeworld"];

        self.categories_with_array = ["characters", "films", "pilots", "planets", "species", "starships", "vehicles"];

        // Used for all controllers. This stores the array that the $scope.films is wired to.
        self.films = [];
        self.films_in_object = 0;
        self.film_list = [];

        // Used for people controller
        self.homeworlds = [];

        // Used for vehicle controller
        self.vehicles = [];
        self.pilots = [];
        self.pilot_list = [];


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

        self.parseResults = function(results_to_parse, category) {

            var original_category = category;

            console.log('in ParseResults for ' + original_category);

            if (self.film_list.length) {
                self.film_list = [];
            }

            if (self.pilot_list.length) {
                self.pilot_list = [];
            }
            console.log(results_to_parse);

            if (self.homeworlds.length) {
                // console.log('self.homeworlds has data. clearing.');
                self.homeworlds = [];
            }

            if (self.films.length) {
                // console.log('self.films has data. clearing.');
                self.films = [];
                // console.log(self.films);
            }

            if (self.pilots.length) {
                // console.log('self.pilots has data. clearing.');
                self.pilots = [];
                // console.log(self.pilots);
            }

            // We need to cycle through object returned in the event there are many.
            results_to_parse.forEach(function(result_item, i, arr) {
                // console.log(result_item);
                // console.log('total results to parse is ' + arr.length);
                // console.log('the index of this result is ' + i);
                console.log('in resultstoParse for ' + original_category);

                var a_length = arr.length;
                var a_index = i;

                // let's define the film array based on the result's length.
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
                                // console.log('homeworld is not in cache');
                                // Store the name for the resolved URL in a variable.
                                $log.debug(response);
                                console.log('in api success response for ' + original_category);
                                console.log('currently doing category ' + category + ' in results.');

                                processCatUrl(category, response, self.homeworlds);
                                // Despite the category, Push the URL and result to the Cache
                                logicService.setCacheItem(url, response);
                            }, function(err) {
                                console.log(err.status);
                            });
                        } else {
                            console.log('homeworld is in cache');
                            processCatUrl(category, cache_results, self.homeworlds);
                        }
                    }
                });

                // Like films, for example
                self.categories_with_array.forEach(function(category) {
                    // console.log(i);
                    if (result_item[category]) {
                        // console.log(result_item[category]);
                        // console.log(category);
                        switch (category) {
                            case (self.categories_with_array[0]):
                                // characters
                                console.log('in ' + self.categories_with_array[0].toString());
                                break;
                            case (self.categories_with_array[1]):
                                // films
                                console.log('in ' + self.categories_with_array[1].toString());
                                // console.log('total results to parse is ' + a_length);
                                // console.log('the index of this result is ' + a_index);
                                // console.log('triggering populateFilmArray');
                                self.populateFilmArray(self.films, result_item, a_length, a_index);
                                break;
                            case (self.categories_with_array[2]):
                                // pilots
                                console.log('in ' + self.categories_with_array[2].toString());
                                console.log('total results to parse is ' + a_length);
                                console.log('the index of this result is ' + a_index);
                                console.log('triggering populatePilotArray');
                                self.populatePilotArray(self.pilots, result_item, a_length, a_index);
                                break;
                            case (self.categories_with_array[3]):
                                // planets
                                console.log('in ' + self.categories_with_array[3].toString());
                                break;
                            case (self.categories_with_array[4]):
                                // species
                                console.log('in ' + self.categories_with_array[4].toString());
                                break;
                            case (self.categories_with_array[5]):
                                // starships
                                console.log('in ' + self.categories_with_array[5].toString());
                                break;
                            case (self.categories_with_array[6]):
                                // vehicles
                                console.log('in ' + self.categories_with_array[6].toString());
                                break;
                        }

                    }
                });
            });

        }

        var processCatUrl =  function(category, response, array_destination) {

            console.log('in processCatUrl');

            console.log(response);
            console.log(array_destination);
            console.log(category);
            console.log(self.categories_with_url[0]);

            switch (category) {
                case (self.categories_with_url[0]):
                    // homeworlds
                    console.log('in ' + self.categories_with_url[0].toString());
                    console.log(response);
                    var homeworld_name = response.data.name;
                    // self.homeworlds.push(homeworld_name);
                    array_destination.push({
                        name: response.data.name,
                        url: response.data.url
                    });
                    break;
            }
        }

        self.populateFilmArray = function(array_name, obj, a_length, a_index) {

            console.log('total results to parse is ' + a_length);
            console.log('the index of this result is ' + a_index);
            // create the film_array with the designated length in a_length;
            for (var x = 0; x < a_length; x++) {
                self.film_list[x] = [];
            };
            // console.log(self.film_list);
            // console.log(self.item_number);
            // console.log('There are a total of ' + items_to_parse + ' arrays.');
            // console.log('This cycle is ' + self.item_number.toString() +'.  This is for ' + obj.name);

            var film_array = obj.films;
            self.films_in_object = obj.films.length;
            // console.log('There are ' + self.films_in_object + ' films for ' + obj.name);

            film_array.forEach(function(film_url) {
                // console.log(film_url + ' for ' + obj.name);
                // console.log('total results to parse is ' + a_length);
                // console.log('the index of this result is ' + a_index);
                var cache_results = logicService.getCacheItem(film_url);
                // if the cache is not created, we need to make an API call.
                if (!cache_results) {
                    // console.log('films is not in cache');
                    apiService.getDataUrl(film_url, function (response) {
                        // console.log('total results to parse is ' + a_length);
                        // console.log('the index of this result is ' + a_index);
                        // Push the URL and result to the Cache
                        logicService.setCacheItem(film_url, response.data);
                        // console.log(response.data.url);
                        // console.log(response.data.title);
                        var trimmed_result = response.data;
                        self.populate_array(self.film_list, trimmed_result, a_index, "film");
                        // console.log(self.film_list);

                    }, function (err) {
                        console.log(err.status);
                    });
                } else {
                    // console.log('films in cache');
                    // console.log(cache_results);
                    self.populate_array(self.film_list, cache_results, a_index, "film");
                }
            });
        }

        self.populatePilotArray = function(array_name, obj, a_length, a_index) {

            console.log(array_name);
            console.log('total results to parse is ' + a_length);
            console.log('the index of this result is ' + a_index);
            // create the film_array with the designated length in a_length;
            for (var x = 0; x < a_length; x++) {
                self.pilot_list[x] = [];
            };
            // console.log(self.film_list);
            // console.log(self.item_number);
            // console.log('There are a total of ' + items_to_parse + ' arrays.');
            // console.log('This cycle is ' + self.item_number.toString() +'.  This is for ' + obj.name);

            var pilot_array = obj.pilots;
            self.pilots_in_object = obj.pilots.length;
            console.log('There are ' + self.pilots_in_object + ' pilots for ' + obj.name);

            pilot_array.forEach(function(pilot_url) {
                console.log(pilot_url + ' for ' + obj.name);
                // console.log('total results to parse is ' + a_length);
                // console.log('the index of this result is ' + a_index);
                var cache_results = logicService.getCacheItem(pilot_url);
                // if the cache is not created, we need to make an API call.
                if (!cache_results) {
                    // console.log('films is not in cache');
                    apiService.getDataUrl(pilot_url, function (response) {
                        // console.log('total results to parse is ' + a_length);
                        // console.log('the index of this result is ' + a_index);
                        // Push the URL and result to the Cache
                        console.log(response);
                        logicService.setCacheItem(pilot_url, response.data);

                        // console.log(response.data.title);
                        var trimmed_result = response.data;
                        self.populate_array(self.pilot_list, trimmed_result, a_index, "pilot");
                        // console.log(self.film_list);

                    }, function (err) {
                        console.log(err.status);
                    });
                } else {
                    // console.log('films in cache');
                    // console.log(cache_results);
                    self.populate_array(self.pilot_list, cache_results, a_index, "pilot");
                }
            });
        }

        self.populate_array = function(array, obj, idx, type) {
            switch(type) {
                case "film":
                    array[idx].push({
                        title: obj.title,
                        url: obj.url
                    });
                    break;
                case "pilot":
                    array[idx].push({
                        name: obj.name,
                        url: obj.url
                    });
                    break;
            }
        }
    })

    .service('parseService1', function (apiService, logicService) {
        var self = this;

        self.item_number = 0;
        self.array_count = 0;

        console.log('in parseService');

        self.categories_with_url = ["homeworld"];

        self.categories_with_array = ["films", "pilots"];

        // Used for all controllers. This stores the array that the $scope.films is wired to.
        self.films = [];
        self.films_in_object = 0;
        self.film_list = [];

        // Used for people controller
        self.homeworlds = [];

        // Used for vehicle controller
        self.vehicles = [];
        self.pilots = [];
        self.pilot_list = [];






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

            if (self.film_list.length) {
                self.film_list = [];
            }

            if (self.pilot_list.length) {
                self.pilot_list = [];
            }
            console.log(results_to_parse);

            if (self.homeworlds.length) {
                // console.log('self.homeworlds has data. clearing.');
                self.homeworlds = [];
            }

            if (self.films.length) {
                // console.log('self.films has data. clearing.');
                self.films = [];
                // console.log(self.films);
            }

            if (self.pilots.length) {
                // console.log('self.pilots has data. clearing.');
                self.pilots = [];
                // console.log(self.pilots);
            }

            // We need to cycle through object returned in the event there are many.
            results_to_parse.forEach(function(result_item, i, arr) {
                // console.log(result_item);
                // console.log('total results to parse is ' + arr.length);
                // console.log('the index of this result is ' + i);
                var a_length = arr.length;
                var a_index = i;

                // let's define the film array based on the result's length.
                // For each result, we need to check for specific fields that require additional API calls.
                // These categories should be stored in an object.
                // For each homeworld, for example
                self.categories_with_url.forEach(function(category) {
                    // console.log(category);
                    if (result_item[category]) {
                        // make api call
                        var url = result_item[category];
                        // console.log(url);
                        // Before any API calls, we need to check the cache.
                        var cache_results = logicService.getCacheItem(url);
                        // console.log(cache_results);
                        if (!cache_results) {
                            apiService.getDataUrl(url, function(response) {
                                // console.log('homeworld is not in cache');
                                // Store the name for the resolved URL in a variable.
                                console.log(response);
                                var homeworld_name = response.data.name;
                                // self.homeworlds.push(homeworld_name);
                                self.homeworlds.push({
                                    name: response.data.name,
                                    url: response.data.url
                                });
                                // Push the URL and result to the Cache
                                logicService.setCacheItem(url, response);
                            }, function(err) {
                                console.log(err.status);
                            });
                        } else {
                            console.log('homeworld is in cache');
                            var homeworld_name = cache_results.data.name;
                            // self.homeworlds.push(homeworld_name);
                            self.homeworlds.push({
                                name: cache_results.data.name,
                                url: cache_results.data.url
                            });
                        }
                    }
                });

                // Like films, for example
                self.categories_with_array.forEach(function(category) {
                     // console.log(i);
                    if (result_item[category]) {
                        // console.log(result_item[category]);
                        // console.log(category);
                        switch (category) {
                            case 'films':
                                // console.log('total results to parse is ' + a_length);
                                // console.log('the index of this result is ' + a_index);
                                // console.log('triggering populateFilmArray');
                                self.populateFilmArray(self.films, result_item, a_length, a_index);
                                break;
                            case 'pilots':
                                console.log('total results to parse is ' + a_length);
                                console.log('the index of this result is ' + a_index);
                                console.log('triggering populatePilotArray');
                                self.populatePilotArray(self.pilots, result_item, a_length, a_index);
                                break;
                        }
                    }
                });
            });

        }

        self.populateFilmArray = function(array_name, obj, a_length, a_index) {

            console.log('total results to parse is ' + a_length);
            console.log('the index of this result is ' + a_index);
            // create the film_array with the designated length in a_length;
            for (var x = 0; x < a_length; x++) {
                self.film_list[x] = [];
            };
            // console.log(self.film_list);
            // console.log(self.item_number);
            // console.log('There are a total of ' + items_to_parse + ' arrays.');
            // console.log('This cycle is ' + self.item_number.toString() +'.  This is for ' + obj.name);

            var film_array = obj.films;
            self.films_in_object = obj.films.length;
            // console.log('There are ' + self.films_in_object + ' films for ' + obj.name);

            film_array.forEach(function(film_url) {
                // console.log(film_url + ' for ' + obj.name);
                // console.log('total results to parse is ' + a_length);
                // console.log('the index of this result is ' + a_index);
                var cache_results = logicService.getCacheItem(film_url);
                // if the cache is not created, we need to make an API call.
                if (!cache_results) {
                    // console.log('films is not in cache');
                    apiService.getDataUrl(film_url, function (response) {
                        // console.log('total results to parse is ' + a_length);
                        // console.log('the index of this result is ' + a_index);
                        // Push the URL and result to the Cache
                        logicService.setCacheItem(film_url, response.data);
                        // console.log(response.data.url);
                        // console.log(response.data.title);
                        var trimmed_result = response.data;
                        self.populate_array(self.film_list, trimmed_result, a_index, "film");
                        // console.log(self.film_list);

                    }, function (err) {
                        console.log(err.status);
                    });
                } else {
                    // console.log('films in cache');
                    // console.log(cache_results);
                    self.populate_array(self.film_list, cache_results, a_index, "film");
                }
            });
        }

        self.populatePilotArray = function(array_name, obj, a_length, a_index) {

            console.log(array_name);
            console.log('total results to parse is ' + a_length);
            console.log('the index of this result is ' + a_index);
            // create the film_array with the designated length in a_length;
            for (var x = 0; x < a_length; x++) {
                self.pilot_list[x] = [];
            };
            // console.log(self.film_list);
            // console.log(self.item_number);
            // console.log('There are a total of ' + items_to_parse + ' arrays.');
            // console.log('This cycle is ' + self.item_number.toString() +'.  This is for ' + obj.name);

            var pilot_array = obj.pilots;
            self.pilots_in_object = obj.pilots.length;
            console.log('There are ' + self.pilots_in_object + ' pilots for ' + obj.name);

            pilot_array.forEach(function(pilot_url) {
                console.log(pilot_url + ' for ' + obj.name);
                // console.log('total results to parse is ' + a_length);
                // console.log('the index of this result is ' + a_index);
                var cache_results = logicService.getCacheItem(pilot_url);
                // if the cache is not created, we need to make an API call.
                if (!cache_results) {
                    // console.log('films is not in cache');
                    apiService.getDataUrl(pilot_url, function (response) {
                        // console.log('total results to parse is ' + a_length);
                        // console.log('the index of this result is ' + a_index);
                        // Push the URL and result to the Cache
                        console.log(response);
                        logicService.setCacheItem(pilot_url, response.data);

                        // console.log(response.data.title);
                        var trimmed_result = response.data;
                        self.populate_array(self.pilot_list, trimmed_result, a_index, "pilot");
                        // console.log(self.film_list);

                    }, function (err) {
                        console.log(err.status);
                    });
                } else {
                    // console.log('films in cache');
                    // console.log(cache_results);
                    self.populate_array(self.pilot_list, cache_results, a_index, "pilot");
                }
            });
        }

        self.populate_array = function(array, obj, idx, type) {
            switch(type) {
                case "film":
                    array[idx].push({
                        title: obj.title,
                        url: obj.url
                    });
                    break;
                case "pilot":
                    array[idx].push({
                        name: obj.name,
                        url: obj.url
                    });
                    break;
            }
        }
    })
