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

        self.new_search = true;

        self.item_number = 0;
        self.array_count = 0;

        self.a_list = [];

        console.log('in parseService');

        self.categories_with_url = ["homeworld"];

        self.categories_with_array = ["characters", "films", "people", "pilots", "planets", "species", "starships", "vehicles"];


        // Used for all controllers. This stores the array that the $scope.films is wired to.
        self.films = [];
        self.films_in_object = 0;
        self.film_list = [];

        // Used for people
        self.homeworlds = [];
        self.species = [];
        self.starships = [];

        // used for films
        self.characters = [];
        self.planets = [];


        // Used for vehicle
        self.vehicles = [];
        self.pilots = [];
        self.pilot_list = [];

        // Used for species

        self.people = [];

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


        // This is called once per search.  It holds the entire results in results_to_parse.
        self.parseResults = function(results_to_parse, category) {

            var results_length = results_to_parse.length;

            var original_category = category;

            var category_list = logicService.getCategories();

            console.log('in ParseResults for ' + original_category);
            console.log(results_length + ' total results to process.');


            if (self.a_list.length) {
                self.a_list = [];
            }

            if (self.characters.length) {
                self.characters = [];
            }
            if (self.film_list.length) {
                self.film_list = [];
            }

            if (self.pilot_list.length) {
                self.pilot_list = [];
            }
            // console.log(results_to_parse);

            if (self.homeworlds.length) {
                self.homeworlds = [];
            }

            if (self.films.length) {
                self.films = [];
            }

            if (self.people.length) {
                self.people = [];
            }

            if (self.pilots.length) {
                self.pilots = [];
            }

            if (self.planets.length) {
                self.planets = [];
            }

            if (self.species.length) {
                self.species = [];
            }

            if (self.starships.length) {
                self.starships = [];
            }

            console.log('creating arrays for results.');


            switch (original_category) {
                // 0 "people",
                // 1 "films",
                // 2 "starships",
                // 3 "vehicles",
                // 4 "species",
                // 5 "planets"
                case (category_list[0]):
                    console.log('people');
                    console.log('creating films, starships and vehicles arrays.');
                    for (var x = 0; x < results_length; x++) {
                        self.film_list[x] = [];
                        self.species[x] = [];
                        self.starships[x] = [];
                        self.vehicles[x] = [];
                    };
                    break;
                case (category_list[1]):
                    console.log('films');
                    console.log('creating characters, planets, species, starships and vehicles arrays.');
                    for (var x = 0; x < results_length; x++) {
                        self.characters[x] = [];
                        self.planets[x] = [];
                        self.species[x] = [];
                        self.starships[x] = [];
                        self.vehicles[x] = [];
                    };

                    break;

                case (category_list[2]):
                    console.log('starships');
                    console.log('creating films and pilots arrays.');
                    for (var x = 0; x < results_length; x++) {
                        self.pilots[x] = [];
                        self.film_list[x] = [];
                    };

                    break;
                case (category_list[3]):
                    console.log('vehicles');
                    for (var x = 0; x < results_length; x++) {
                        self.pilots[x] = [];
                        self.film_list[x] = [];
                    };

                    break;

                case (category_list[4]):
                    console.log('species');
                    for (var x = 0; x < results_length; x++) {
                        self.people[x] = [];
                        self.film_list[x] = [];
                    };

                    break;
                case (category_list[5]):
                    console.log('planets');

                    break;
            }

            // We need to cycle through object returned in the event there are many.
            results_to_parse.forEach(function(result_item, i, arr) {

                console.log('in resultstoParse for ' + original_category);
                console.log(result_item);

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
                        console.log(url);
                        console.log(url.length)
                        // Before any API calls, we need to check the cache.
                        var cache_results = logicService.getCacheItem(url);
                        if (!cache_results) {
                            apiService.getDataUrl(url, function(response) {
                                self.processCatUrl(category, response, self.homeworlds);
                                // Despite the category, Push the URL and result to the Cache
                                logicService.setCacheItem(url, response);
                            }, function(err) {
                                console.log(err.status);
                            });
                        } else {
                            self.processCatUrl(category, cache_results, self.homeworlds);
                        }
                    }
                });

                // Like films, for example
                self.categories_with_array.forEach(function(category) {

                    if (result_item[category]) {

                        // 0 "characters",
                        // 1 "films",
                        // 2 "people"
                        // 3 "pilots",
                        // 4 "planets",
                        // 5 "species",
                        // 6 "starships",
                        // 7 "vehicles"

                        switch (category) {
                            case (self.categories_with_array[0]):
                                // characters
                                console.log('in ' + self.categories_with_array[0].toString());
                                self.processCatArray(category, self.characters, result_item, a_length, a_index);
                                break;
                            case (self.categories_with_array[1]):
                                // films
                                console.log('in ' + self.categories_with_array[1].toString());
                                self.processCatArray(category, self.films, result_item, a_length, a_index);
                                break;
                            case (self.categories_with_array[2]):
                                // People
                                console.log('in ' + self.categories_with_array[2].toString());
                                self.processCatArray(category, self.people, result_item, a_length, a_index);
                                break;
                            case (self.categories_with_array[3]):
                                // pilots
                                console.log('in ' + self.categories_with_array[3].toString());
                                console.log('total results to parse is ' + a_length);
                                console.log('the index of this result is ' + a_index);
                                console.log('triggering populatePilotArray');
                                // self.populatePilotArray(self.pilots, result_item, a_length, a_index);
                                self.processCatArray(category, self.pilots, result_item, a_length, a_index);

                                break;
                            case (self.categories_with_array[4]):
                                // planets
                                console.log('in ' + self.categories_with_array[4].toString());
                                break;
                            case (self.categories_with_array[5]):
                                // species
                                console.log('in ' + self.categories_with_array[5].toString());
                                self.processCatArray(category, self.species, result_item, a_length, a_index);
                                break;
                            case (self.categories_with_array[6]):
                                // starships
                                console.log('in ' + self.categories_with_array[6].toString());
                                self.processCatArray(category, self.starships, result_item, a_length, a_index);
                                break;
                            case (self.categories_with_array[7]):
                                // vehicles
                                console.log('in ' + self.categories_with_array[7].toString());
                                break;

                        }

                    }
                });
                if (a_index === a_length - 1) {
                console.log('detecting end of search!!!!!!!!!!!!!!!!!!!');
                self.new_search = true;
                }
            });

        }

        self.processCatArray = function(category, array_name, obj, a_length, a_index) {


            console.log('process cat array start for ' + category);
            console.log(self.species);

            var item_array = [];
            var items_in_object = null;

            // 0 "characters",
            // 1 "films",
            // 2 "people"
            // 3 "pilots",
            // 4 "planets",
            // 5 "species",
            // 6 "starships",
            // 7 "vehicles"



            switch (category) {
                case (self.categories_with_array[0]):
                    // characters
                    console.log('in ' + self.categories_with_array[0].toString());
                    item_array = obj.characters;
                    break;
                case (self.categories_with_array[1]):
                    // films
                    console.log('in ' + self.categories_with_array[1].toString());
                    item_array = obj.films;
                    break;
                case (self.categories_with_array[2]):
                    // people
                    console.log('in ' + self.categories_with_array[2].toString());
                    item_array = obj.people;
                    break;
                case (self.categories_with_array[3]):
                    // pilots
                    console.log('in ' + self.categories_with_array[3].toString());
                    item_array = obj.pilots;

                    break;
                case (self.categories_with_array[4]):
                    // planets
                    console.log('in ' + self.categories_with_array[4].toString());
                    item_array = obj.planets;
                    break;
                case (self.categories_with_array[5]):
                    // species
                    console.log('in ' + self.categories_with_array[5].toString());
                    item_array = obj.species;
                    break;
                case (self.categories_with_array[6]):
                    // starships
                    console.log('in ' + self.categories_with_array[6].toString());
                    item_array = obj.starships;
                    break;
                case (self.categories_with_array[7]):
                    // vehicles
                    console.log('in ' + self.categories_with_array[7].toString());
                    item_array = obj.vehicles;
                    break;
            }

            console.log('in processcatararry for ' + category);

            console.log(item_array);

            item_array.forEach(function(url) {

                var cache_results = logicService.getCacheItem(url);
                // if the cache is not created, we need to make an API call.
                if (!cache_results) {
                    apiService.getDataUrl(url, function (response) {
                        // Push the URL and result to the Cache
                        logicService.setCacheItem(url, response.data);
                        var trimmed_result = response.data;
                        switch (category) {
                            case (self.categories_with_array[1]):
                                console.log('films');
                                /// films
                                self.populate_array(self.film_list, trimmed_result, a_index, "film");
                                break;
                            case (self.categories_with_array[2]):
                                // people
                                self.populate_array(self.people, trimmed_result, a_index, "people");
                                break;
                            case (self.categories_with_array[3]):
                                // pilots
                                self.populate_array(self.pilots, trimmed_result, a_index, "pilots");

                                break;
                            case (self.categories_with_array[4]):
                                console.log('planets');
                                /// films
                                self.populate_array(self.planets, trimmed_result, a_index, "planets");
                                break;
                            case (self.categories_with_array[5]):
                                console.log('species');
                                /// films
                                self.populate_array(self.species, trimmed_result, a_index, "species");
                                break;
                        }

                    }, function (err) {
                        console.log(err.status);
                    });
                } else {
                    console.log('films in cache');
                    switch (category) {
                        case (self.categories_with_array[1]):
                            console.log('films');
                            /// films
                            self.populate_array(self.film_list, cache_results, a_index, "film");
                            break;

                    }
                }
            });
        }

        self.processCatUrl =  function(category, response, array_destination) {

            switch (category) {
                case (self.categories_with_url[0]):
                    // homeworlds
                    var homeworld_name = response.data.name;
                    array_destination.push({
                        name: response.data.name,
                        url: response.data.url
                    });
                    break;
            }
        }

        self.populate_array = function(array, obj, idx, type) {
            console.log('in populate_array function.');
            switch(type) {
                case "film":
                    array[idx].push({
                        title: obj.title,
                        url: obj.url
                    });
                    break;
                case "pilots":
                    array[idx].push({
                        name: obj.name,
                        url: obj.url
                    });
                    break;
                case "species":
                    array[idx].push({
                        name: obj.name,
                        url: obj.url
                    });
                    console.log(self.species);
                    break;
                case "people":
                    array[idx].push({
                        name: obj.name,
                        url: obj.url
                    });
                    console.log(self.people);
                    break;
                case "planets":
                    array[idx].push({
                        name: obj.name,
                        url: obj.url
                    });
                    break;
            }
        }
    })


