//SERVICES

angular.module('swApp')


// Assigning the cachFactory to 'myCache'.  Cache Factory stores results after each successful search to limit API calls.,
    .factory('myCache', function($cacheFactory) {
        return $cacheFactory('myCache');
    })

    // modelService stores the entries used to populate the autocomplete field in the search form in search.tmpl.htm
    .service('modelService', function() {

        var data =  {
            films: [
                'A New Hope',
                'The Empire Strikes Back',
                'Return of the Jedi',
                'The Phantom Menace',
                'Attack of the Clones',
                'Revenge of the Sith',
                'The Force Awakens'
            ],
            people: [
                'Luke Skywalker',
                'C-3PO',
                'R2-D2',
                'Darth Vader',
                'Leia Organa',
                'Owen Lars',
                'Beru Whitesun lars',
                'R5-D4',
                'Biggs Darklighter',
                'Obi-Wan Kenobi',
                'Anakin Skywalker',
                'Wilhuff Tarkin',
                'Chewbacca',
                'Han Solo',
                'Greedo',
                'Jabba Desilijic Tiure',
                'Wedge Antilles',
                'Jek Tono Porkins',
                'Yoda',
                'Palpatine',
                'Boba Fett',
                'IG-88',
                'Bossk',
                'Lando Calrissian',
                'Lobot',
                'Ackbar',
                'Mon Mothma',
                'Arvel Crynyd',
                'Wicket Systri Warrick',
                'Nien Nunb',
                'Qui-Gon Jinn',
                'Nute Gunray',
                'Finis Valorum',
                'Jar Jar Binks',
                'Roos Tarpals',
                'Rugor Nass',
                'Ric Olié',
                'Watto',
                'Sebulba',
                'Quarsh Panaka',
                'Shmi Skywalker',
                'Darth Maul',
                'Bib Fortuna',
                'Ayla Secura',
                'Dud Bolt',
                'Gasgano',
                'Ben Quadinaros',
                'Mace Windu',
                'Ki-Adi-Mundi',
                'Kit Fisto',
                'Eeth Koth',
                'Adi Gallia',
                'Saesee Tiin',
                'Yarael Poof',
                'Plo Koon',
                'Mas Amedda',
                'Gregar Typho',
                'Cordé',
                'Cliegg Lars',
                'Poggle the Lesser',
                'Luminara Unduli',
                'Barriss Offee',
                'Dormé',
                'Dooku',
                'Bail Prestor Organa',
                'Jango Fett',
                'Zam Wesell',
                'Dexter Jettster',
                'Lama Su',
                'Taun We',
                'Jocasta Nu',
                'Ratts Tyerell',
                'R4-P17',
                'Wat Tambor',
                'San Hill',
                'Shaak Ti',
                'Grievous',
                'Tarfful',
                'Raymus Antilles',
                'Sly Moore',
                'Tion Medon',
                'Finn',
                'Rey',
                'Poe Dameron',
                'BB8',
                'Captain Phasma',
                'Padmé Amidala',


            ],
            starships: [
                'Sentinel-class landing craft',
                'Death Star',
                'Millennium Falcon',
                'Y-wing','X-wing',
                'TIE Advanced x1',
                'Executor',
                'Slave 1',
                'Imperial shuttle',
                'EF76 Nebulon-B escort frigate',
                'Calamari Cruiser',
                'A-wing',
                'B-wing',
                'Republic Cruiser',
                'Naboo fighter',
                'Naboo Royal Starship',
                'Scimitar',
                'J-type diplomatic barge',
                'AA-9 Coruscant freighter',
                'Jedi starfighter',
                'H-type Nubian yacht',
                'Star Destroyer',
                'Trade Federation cruiser',
                'Theta-class T-2c shuttle',
                'T-70 X-wing fighter',
                'Rebel transport',
                'Droid control ship',
                'Republic Assault ship',
                'Solar Sailer',
                'Republic attack cruiser',
                'Naboo star skiff',
                'Jedi Interceptor',
                'arc-170',
                'Banking clan frigte',
                'Belbullab-22 starfighter',
                'V-wing',
                'CR90 corvette'
            ],
            vehicles: [
                'Sand Crawler',
                'T-16 skyhopper',
                'X-34 landspeeder',
                'TIE/LN starfighter',
                'Snowspeeder',
                'TIE bomber',
                'AT-AT',
                'AT-ST',
                'Storm IV Twin-Pod cloud car',
                'Sail barge',
                'Bantha-II cargo skiff',
                'TIE/IN interceptor',
                'Imperial Speeder Bike',
                'Vulture Droid',
                'Multi-Troop Transport',
                'Armored Assault Tank',
                'Single Trooper Aerial Platform',
                'C-9979 landing craft',
                'Tribubble bongo',
                'Sith speeder',
                'Zephyr-G swoop bike',
                'Koro-2 Exodrive airspeeder',
                'XJ-6 airspeeder',
                'LAAT/i',
                'LAAT/c',
                'Tsmeu-6 personal wheel bike',
                'Emergency Firespeeder',
                'Droid tri-fighter',
                'Oevvaor jet catamaran',
                'Raddaugh Gnasp fluttercraft',
                'Clone turbo tank',
                'Corporate Alliance tank droid',
                'Droid gunship',
                'AT-RT',
                'AT-TE',
                'SPHA',
                'Flitknot speeder',
                'Neimoidian shuttle',
                'Geonosian starfighter'
            ],
            species: [
                'Hutt',
                'Yoda' +'\'s' + ' species',
                'Trandoshan',
                'Mon Calamari',
                'Ewok',
                'Sullustan',
                'Neimodian',
                'Gungan',
                'Toydarian',
                'Dug',
                'Hutt',
                'Twi' + '\'' + 'lek',
                'Aleena',
                'Vulptereen',
                'Xexto',
                'Toong',
                'Cerean',
                'Nautolan',
                'Zabrak',
                'Tholothian',
                'Iktotchi',
                'Quermian',
                'Kel Dor',
                'Chagrian',
                'Geonosian',
                'Mirialan',
                'Clawdite',
                'Besalisk',
                'Kaminoan',
                'Skakoan',
                'Muun',
                'Togruta',
                'Kaleesh',
                'Pau'+ '\'' + 'an',
                'Wookiee',
                'Droid',
                'Human',
                'Rodian'
            ],
            planets: [
                'Alderaan',
                'Yavin IV',
                'Hoth',
                'Dagobah',
                'Bespin',
                'Endor',
                'Naboo',
                'Coruscant',
                'Kamino',
                'Geonosis',
                'Utapau',
                'Mustafar',
                'Kashyyyk',
                'Polis Massa',
                'Mygeeto',
                'Felucia',
                'Cato Neimoidia',
                'Saleucami',
                'Stewjon',
                'Eriadu',
                'Corellia',
                'Rodia',
                'Nal Hutta',
                'Dantooine',
                'Bestine IV',
                'Ord Mantell',
                'Trandosha',
                'Socorro',
                'Mon Cala',
                'Chandrila',
                'Sullust',
                'Toydaria',
                'Malastare',
                'Dathomir',
                'Ryloth',
                'Aleen Minor',
                'Vulpter',
                'Troiken',
                'Tund',
                'Haruun Kal',
                'Cerea',
                'Glee Anselm',
                'Iridonia',
                'Tholoth',
                'Iktotch',
                'Quermia',
                'Dorin',
                'Champala',
                'Mirial',
                'Serenno',
                'Concord Dawn',
                'Zolan',
                'Ojom',
                'Skako',
                'Muunilinst',
                'Shili',
                'Kalee',
                'Umbara',
                'Tatooine',
                'Jakku'
            ]
        };

        return {
            // Public function to return the data.
            getData: function () {
                return data;
            }
        };
    })

    // logic service is a shared service between controllers.  It's purpose is twofold.  It functions as the app's memory by storing scope variables between controllers.  If you notice,
    // the controller's first retrieve the category, search term, and various other values.  It's second purpose is to contain commonly used functions (such as capitalize, etc).
    .service('logicService', function (myCache, $rootScope, $location, $route, $templateCache) {
        var self = this;

        var window_sizes = ['xs', 'xs+', 'sm', 'sm+', 'med', 'med+', 'lrg', 'lrg+'];

        var categories = ["people", "films", "starships", "vehicles", "species", "planets"];

        var values_to_not_show = ["unknown", "N/A", "n/a", "unknown years", "none", "0"];

        var api_count = null;

        var spinner = null;

        self.orientation = screen.orientation.angle;

        var capitalize = function(word) {
            return word.charAt(0).toUpperCase() + word.slice(1);
        };

        var lowerCase = function(word) {
            return word.charAt(0).toLowerCase() + word.slice(1);
        };

        // function to convert date from european time to local with hour and minute.
        var convertToLocal = function(some_date) {
            return new Date(some_date).toLocaleString().replace(/(.*)\D\d+/, '$1');
        };

        // function to convert date from european time to local without hour and minute.  Used for film release date in the filmresult template.

        var convertToLocalDate = function(some_date) {
            return new Date(some_date).toLocaleDateString();
        };

        // function to convert european weight to american standard.
        var convertToLbs = function (mass) {
            var approx = mass/0.45359237;
            var lbs = Math.floor(approx);
            var oz = Math.floor((approx - lbs) * 16);
            return lbs + " lbs " + oz +  " oz";
        };

        // function to convert meters to feet and inches
        var convertToFeet = function (height) {
            var actualFeet = ((height * 0.393700) / 12);
            var feet = Math.floor(actualFeet);
            var inches = Math.round((actualFeet - feet) * 12);
            return feet + "'" + inches + '"';
        };

        // function to get a cache item.
        var getCacheItem = function (item) {
            return myCache.get(item);
        };

        // function to set a cache item.
        var setCacheItem = function (cache, items) {
            myCache.put(cache, items);
        };

        var navigateTo = function(url) {
            if ($location.path() === url) {
                // console.log('sending route.reload');
                var currentPageTemplate = $route.current.templateUrl;
                $templateCache.remove(currentPageTemplate);
                $route.reload();
            } else {
                // console.log('path different. sending to new path');
                $location.path(url);
            }
        };

        // Listener for orientation changes on mobile devices.

        $(window).on("orientationchange",function(){
            // Announce the new orientation number
            self.orientation = screen.orientation.angle;
            // console.log(self.orientation);
            $rootScope.$broadcast('orientation_change');
        });

        // This function is so that JS can store the media size.  This is necessary for future CSS calculations set by the JS code.
        var checkWindowSize = function() {
            if (window.matchMedia("(min-width : 768px)").matches) {
            // iPhone6P
                if (window.matchMedia("orientation : portrait").matches) {
                    return window_sizes[6];
                }
                else {
                    return window_sizes[7];
                }
            }
            else if (window.matchMedia("(min-width : 414px)").matches) {
                // iPhone6P
                if (window.matchMedia("orientation : portrait").matches) {
                    return window_sizes[4];
                }
                else {
                    return window_sizes[5];
                }

            }
            else if (window.matchMedia("(min-width : 375px)").matches) {
                // iPhone6
                if (window.matchMedia("orientation: portrait").matches) {
                    return window_sizes[2];
                }
                else {
                    return window_sizes[3];
                }

            }
            else if (window.matchMedia("(min-width: 320px)").matches) {
               // iPhone5
                if (window.matchMedia("orientation: portrait").matches) {
                    return window_sizes[0];
                }
                else {
                    return window_sizes[1];
                }
            }

        };

        // Public variables

        return {

            // Debug area

            getOrientation: function() {
              return screen.orientation.angle;
            },

            getWindowSize: function() {
                return checkWindowSize();
            },

            // End Debug area.

            // get spinner state
            getSpinner: function() {
                return spinner;
            },
            // set spinner state.
            setSpinner: function(activate) {
                spinner = activate;
            },

            // returns the api count.  this is used to track the number of subsequent API calls needed to be made from the original JSON object.  Remember, the JOSN returned containes URLs for
            // some fields
            getApiCount: function() {
                return api_count;
            },

            // Sets the API count.
            // We ate going to use this variable to store the number of api calls.

            setApiCount: function(num) {
                api_count = num;
                return true;
            },

            // After each successful API call is initiated, this function is called to increase the API count.
            incrementApiCount: function() {
                api_count++;
                if (api_count === 1) {
                    spinner = true;
                }
                return true;
            },

            // After each successful API call is returned, this function is called to mark off an API call.
            decrementApiCount: function() {
                api_count--;
                if (!api_count) {
                    spinner = false;
                    return false;
                }
                return true;
            },

            // Public functions for set and get cache.

            setCacheItem: function(name, contents) {
                setCacheItem(name, contents);
            },

            getCacheItem: function(cacheName) {
                return getCacheItem(cacheName);
            },

            // Public function to get categories.
            getCategories: function() {
                return categories;
            },

            heightThis: function(height) {
                return convertToFeet(height);
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

            localizeThisDate: function(some_date) {
                return convertToLocalDate(some_date);
            },

            navTo: function(url) {
                navigateTo(url);
            },

            weightThis: function(mass) {
                return convertToLbs(mass);
            },

            checkValue: function(returnedValue) {
                if (values_to_not_show.includes(returnedValue)) {
                    return false;
                }
                return true;
            }
        };
    })

    .service('searchService', function (logicService, apiService) {

        var self = this;
        // These variables wire the values from the logic service to the search service.
        self.category = logicService.lowerCaseThis(logicService.category);
        self.search_term = logicService.search_term;
        // These variables wire the values from the logic service to the API service.

        // apiService.category = logicService.lowerCaseThis(self.category);
        // apiService.search_term = self.search_term;
     })

    .service('apiService', function($http, logicService) {

        var self = this;

        // These variables wire the values from the logic service to the API service.
        self.category = logicService.lowerCaseThis(logicService.category);
        self.search_term = logicService.search_term;

        // This is the wrapper for the API call when selected from the category from the home page.
        this.getData = function(callback, err) {
            // This increments the API count which in return sets the spinner to true if not already.
            if (logicService.incrementApiCount()) {
                // console.log('succesfully increased API count.');
                // console.log('API total is now at ' + logicService.getApiCount() );
            }
            $http.get('https://swapi.co/api/' + self.category + '/?search='+ self.search_term)
                .then(callback,err)
                .finally(function() {
                        // This lowers the API count.  If it returns true then it sets the spinner to false.  True meaning the API count has reached 0.
                        if (!logicService.decrementApiCount()) {
                            // logicService.setSpinner(false);
                        } else {
                            // console.log('API count is reached zero.  Trigger spinner to stop.');
                            // logicService.spinner = false;
                            //  Add a timeout for setting the spinner to allow the parsing to finish before removing.
                            $timeout(function() {
                                logicService.setSpinner(false);
                            }, 1000);
                        }
                    }
                );
        };
        // This is the wrapper for the API call when used for parsing results.  It passes the URL in the JSON to this funtion.
        this.getDataUrl = function(url, callback, err) {
            // This increments the API count which in return sets the spinner to true if not already.
            if (logicService.incrementApiCount()) {
                // console.log('succesfully increased API count.');
                // console.log('API total is now at ' + logicService.getApiCount() );
            }
            $http.get(url)
                .then(callback,err)
                .finally(function() {
                    // console.log('API count is reached zero.  Trigger spinner to stop.');
                        if (logicService.decrementApiCount()) {
                            // console.log('successfully decremented API count.');
                            // console.log('API count now at '+ logicService.getApiCount());
                        }
                    }
                );
        };

    })


    // The patse Service parses the JSON results returned via the API calls and wires them to the $scope variables for the controller and template.
    .service('parseService', function (apiService, logicService) {
        // The parseService essentially works in the following detailed manner.
        // Whichever category the user oroginally specifies, there may be multiple results.

        // First, the API call is made and then stores all results in some JSON.

        // For each result, we need to check for specific fields that require additional API calls.
        // These categories should be stored in an object array.

        // Once the API call is completed, we store the search term as a key with the URLName as the value in the cache with the returned info.

        // If the category is an array object (such as films), push those items to a subarray, such as self.films.
        // Cycle through each item in subarray, call the API, store the URL into the cache.
        // After, push the result to subarray.

        // Otherwise, just push to a variable.
        // After all calls are done for one object, create a new $scope object that contains the results

        var self = this;

        self.categories_with_url = ["homeworld"];

        self.categories_with_array = ["characters", "films", "people", "pilots", "planets", "residents", "species", "starships", "vehicles"];


        // Used for all JSONs
        self.films = [];
        self.films_in_object = 0;
        self.film_list = [];

        // Used for people JSON
        self.homeworlds = [];
        self.species = [];
        self.starships = [];

        // used for films JSON
        self.characters = [];
        self.planets = [];


        // Used for vehicle
        self.vehicles = [];
        self.pilots = [];
        self.pilot_list = [];

        // Used for species JSON
        self.people = [];

        // This is called once following each API results.  It holds the entire results in results_to_parse.
        self.parseResults = function(results_to_parse, category) {

            // Variable used to define the size of the arrays based on results returned.
            // For instance, a seatch of "darth" yeilds two results.  This then goes to define the arrays as having two dimension.
            var results_length = results_to_parse.length;

            var category_list = logicService.getCategories();


            // These are quick ways to completely erase an array from memory without having to cycle through all the index.
            if (self.characters.length) {
                self.characters.length = 0;
            }
            if (self.film_list.length) {
                self.film_list.length  = 0;
            }

            if (self.pilot_list.length) {
                self.pilot_list.length = 0;
            }

            if (self.homeworlds.length) {
                self.homeworlds.length = 0;
            }

            if (self.films.length) {
                self.films.length = 0;
            }

            if (self.people.length) {
                self.people.length = 0;
            }

            if (self.pilots.length) {
                self.pilots.length = 0;
            }

            if (self.planets.length) {
                self.planets.length = 0;
            }

            if (self.species.length) {
                self.species.length = 0;
            }

            if (self.starships.length) {
                self.starships.length = 0;
            }

            if (!logicService.getApiCount()) {
                if (logicService.setApiCount(0)) {
                    // console.log('successfully set API count to 0.');
                }
            }

            // Based on the category being searched, we will initialize the arrays needed for that category to ensure there is no
            // remaining values from previous searches.
            var x;

            switch (category) {
                case (category_list[0]):
                    for (x = 0; x < results_length; x++) {
                        self.film_list[x] = [];
                        self.species[x] = [];
                        self.starships[x] = [];
                        self.vehicles[x] = [];
                    }
                    break;
                case (category_list[1]):
                    for (x = 0; x < results_length; x++) {
                        self.characters[x] = [];
                        self.planets[x] = [];
                        self.species[x] = [];
                        self.starships[x] = [];
                        self.vehicles[x] = [];
                    }
                    break;

                case (category_list[2]):
                    for (x = 0; x < results_length; x++) {
                        self.pilots[x] = [];
                        self.film_list[x] = [];
                    }
                    break;
                case (category_list[3]):
                    for (x = 0; x < results_length; x++) {
                        self.pilots[x] = [];
                        self.film_list[x] = [];
                    }
                    break;
                case (category_list[4]):
                    for (x = 0; x < results_length; x++) {
                        self.people[x] = [];
                        self.film_list[x] = [];
                    }
                    break;
                case (category_list[5]):
                    for (x = 0; x < results_length; x++) {
                        self.people[x] = [];
                        self.film_list[x] = [];
                    }
                    break;
            }

            // We need to cycle through object returned in the event there are embedded API calls.
            results_to_parse.forEach(function(result_item, i, arr) {

                var a_length = arr.length;
                var a_index = i;

                var current_count = a_index;

                // Search through the results returned looking for fields in the categories_with_url array.
                // For the time being, homeworld is the only field this is used for.
                self.categories_with_url.forEach(function(category) {
                    if (result_item[category]) {
                        current_count++;
                        // make api call
                        var url = result_item[category];
                        // Before any API calls, we need to check the cache.
                        var cache_results = logicService.getCacheItem(url);
                        if (!cache_results) {
                            apiService.getDataUrl(url, function(response) {
                                self.processCatUrl(category, response.data, self.homeworlds);
                                // Despite the category, Push the URL and result to the Cache
                                logicService.setCacheItem(url, response.data);
                            }, function(err) {
                                console.log(err.status);
                            });
                        } else {
                            self.processCatUrl(category, cache_results, self.homeworlds);
                        }
                    }
                });

                // Search through the results returned looking for fields in the categories_with_array array.
                // For example, films and people fall under this area.
                self.categories_with_array.forEach(function(category) {

                    if (result_item[category]) {
                        current_count++;
                        // Based on the category in the categories_with_array array, we are going to pass the predefined array as an object as well as the original length of results
                        // and the current result index of the object we are working on.
                        switch (category) {
                            case (self.categories_with_array[0]):
                                self.processCatArray(category, self.characters, result_item, a_length, a_index);
                                break;
                            case (self.categories_with_array[1]):

                                self.processCatArray(category, self.films, result_item, a_length, a_index);
                                break;
                            case (self.categories_with_array[2]):
                                self.processCatArray(category, self.people, result_item, a_length, a_index);
                                break;
                            case (self.categories_with_array[3]):
                                self.processCatArray(category, self.pilots, result_item, a_length, a_index);
                                break;
                            case (self.categories_with_array[4]):
                                self.processCatArray(category, self.planets, result_item, a_length, a_index);
                                break;
                            case (self.categories_with_array[5]):
                                self.processCatArray(category, self.people, result_item, a_length, a_index);
                                break;
                            case (self.categories_with_array[6]):
                                self.processCatArray(category, self.species, result_item, a_length, a_index);
                                break;
                            case (self.categories_with_array[7]):
                                self.processCatArray(category, self.starships, result_item, a_length, a_index);
                                break;
                            case (self.categories_with_array[8]):
                                self.processCatArray(category, self.vehicles, result_item, a_length, a_index);
                                break;
                        }

                    }
                });
            });
        };

        // This function processes the JSON fields that are stored within object arrays.  It receives the category specified in
        // the categories_with_array array, the array name passed (such as self.films), the JSON object, as well as the original length of full results to parse and the
        // current index number of the original result array.

        self.processCatArray = function(category, array_name, obj, a_length, a_index) {


            var item_array = [];

            //  We use a switch statement to set the item_array to
            switch (category) {
                case (self.categories_with_array[0]):
                    item_array = obj.characters;
                    break;
                case (self.categories_with_array[1]):
                    item_array = obj.films;
                    break;
                case (self.categories_with_array[2]):
                    item_array = obj.people;
                    break;
                case (self.categories_with_array[3]):
                    item_array = obj.pilots;
                    break;
                case (self.categories_with_array[4]):
                    item_array = obj.planets;
                    break;
                case (self.categories_with_array[5]):
                    item_array = obj.residents;
                    break;
                case (self.categories_with_array[6]):
                    item_array = obj.species;
                    break;
                case (self.categories_with_array[7]):
                    item_array = obj.starships;
                    break;
                case (self.categories_with_array[8]):
                    item_array = obj.vehicles;
                    break;
            }
            // We now cycle through each URL specified in the object.
            item_array.forEach(function(url) {

                var cache_results = logicService.getCacheItem(url);
                // if the cache is not created, we need to make an API call.
                if (!cache_results) {
                    // If cache does not contain the data, start the API call.
                    apiService.getDataUrl(url, function (response) {
                        // Push the URL and result to the Cache
                        logicService.setCacheItem(url, response.data);
                        var trimmed_result = response.data;
                        // Based on category, push the object to the populate_array function.
                        switch (category) {
                            case (self.categories_with_array[0]):
                                self.populate_array(self.characters, trimmed_result, a_index, self.categories_with_array[0]);
                                break;
                            case (self.categories_with_array[1]):
                                self.populate_array(self.film_list, trimmed_result, a_index, self.categories_with_array[1]);
                                break;
                            case (self.categories_with_array[2]):
                                self.populate_array(self.people, trimmed_result, a_index, self.categories_with_array[2]);
                                break;
                            case (self.categories_with_array[3]):
                                self.populate_array(self.pilots, trimmed_result, a_index, self.categories_with_array[3]);
                                break;
                            case (self.categories_with_array[4]):
                                self.populate_array(self.planets, trimmed_result, a_index, self.categories_with_array[4]);
                                break;
                            case (self.categories_with_array[5]):
                                self.populate_array(self.people, trimmed_result, a_index, self.categories_with_array[5]);
                                break;
                            case (self.categories_with_array[6]):
                                self.populate_array(self.species, trimmed_result, a_index, self.categories_with_array[6]);
                                break;
                            case (self.categories_with_array[7]):
                                self.populate_array(self.starships, trimmed_result, a_index, self.categories_with_array[7]);
                                break;
                            case (self.categories_with_array[8]):
                                self.populate_array(self.vehicles, trimmed_result, a_index, self.categories_with_array[8]);
                                break;
                        }
                    }, function (err) {
                        console.log(err.status);
                    });
                } else {
                    // This handles the categories if the result is cached.  Remember, the cached item is stored in its original JSON form.
                    // The item still needs to be parsed to values the controller and template can display.
                    switch (category) {
                        case (self.categories_with_array[0]):
                            self.populate_array(self.characters,cache_results, a_index, self.categories_with_array[0]);
                            break;
                        case (self.categories_with_array[1]):
                            self.populate_array(self.film_list, cache_results, a_index, self.categories_with_array[1]);
                            break;
                        case (self.categories_with_array[2]):
                            self.populate_array(self.people, cache_results, a_index, self.categories_with_array[2]);
                            break;
                        case (self.categories_with_array[3]):
                            self.populate_array(self.pilots, cache_results, a_index, self.categories_with_array[3]);
                            break;
                        case (self.categories_with_array[4]):
                            self.populate_array(self.planets, cache_results, a_index, self.categories_with_array[4]);
                            break;
                        case (self.categories_with_array[5]):
                            self.populate_array(self.people, cache_results, a_index, self.categories_with_array[5]);
                            break;
                        case (self.categories_with_array[6]):
                            self.populate_array(self.species, cache_results, a_index, self.categories_with_array[6]);
                            break;
                        case (self.categories_with_array[7]):
                            self.populate_array(self.starships, cache_results, a_index, self.categories_with_array[7]);
                            break;
                        case (self.categories_with_array[8]):
                            self.populate_array(self.vehicles, cache_results, a_index, self.categories_with_array[8]);
                            break;

                    }
                }
            });
        };

        // This is for the homeland field.  It pushes the name and the URL for future API calls.  This all gets placed into an A tag on the template.
        self.processCatUrl =  function(category, obj, array_destination) {
            switch (category) {
                case (self.categories_with_url[0]):
                    // var homeworld_name = obj.name;
                    array_destination.push({
                        name: obj.name,
                        url: obj.url
                    });
                    break;
            }
        };


        // This is for the object arrays that contain URLS. It pushes the name and the URL.  This is so the A tag can pass the correct URL into the API call on click.
        self.populate_array = function(array, obj, idx, type) {
            switch(type) {
                case self.categories_with_array[0]:
                    array[idx].push({
                        name: obj.name,
                        url: obj.url
                    });
                    break;
                case self.categories_with_array[1]:
                    array[idx].push({
                        title: obj.title,
                        url: obj.url
                    });
                    break;
                case self.categories_with_array[2]:
                    array[idx].push({
                        name: obj.name,
                        url: obj.url
                    });
                    break;
                case self.categories_with_array[3]:
                    array[idx].push({
                        name: obj.name,
                        url: obj.url
                    });
                    break;
                case self.categories_with_array[4]:
                    array[idx].push({
                        name: obj.name,
                        url: obj.url
                    });
                    break;
                case self.categories_with_array[5]:
                    array[idx].push({
                        name: obj.name,
                        url: obj.url
                    });
                    break;
                case self.categories_with_array[6]:
                    array[idx].push({
                        name: obj.name,
                        url: obj.url
                    });
                    break;
                case self.categories_with_array[7]:
                    array[idx].push({
                        name: obj.name,
                        url: obj.url
                    });
                    break;
                case self.categories_with_array[8]:
                    array[idx].push({
                        name: obj.name,
                        url: obj.url
                    });
                    break;
            }
        };
    })
    // The master API service can be used as a tool to quickly populate the model service with the autocomplete fields.
    // uncomment this service to use it .

    // .service('masterApiService', function($http) {
    //     // console.log('in api service');
    //     var self = this;
    //
    //
    //     this.getAllData = function(callback, err) {
    //         // var url = 'https://swapi.co/api/planets';
    //         var url = "http://swapi.co/api/planets/?page=8";
    //         console.log('starting API call');
    //         console.log(url);
    //         $http.get(url)
    //             .then(callback,err)
    //     }
    //
    // })

    // The debug service is used for debugging purposes.  For right now, it's use is focused on mobile device orientation and size.  Inject this service into each controller to use
    // and uncomment commented out debug lines as indicated.
    .service('debugService', function () {

        // Set to false to hide debugging window.
        var debug = false;

        var orientation = screen.orientation.type;

        var checkScreenPixels = function() {
            return screen.width + ' x ' + screen.height;

        };

        // Public variables

        return {

            // Debug area

            getOrientation: function() {
                return orientation;
            },

            isDebug: function() {
                return debug;
            },

            getScreenPixels: function() {
                return checkScreenPixels();
            }

            // End Debug area.
        };
    });
