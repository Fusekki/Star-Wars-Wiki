//SERVICES

angular.module('swApp')


// Assigning the cachFactory to 'myCache'
    .factory('myCache', function($cacheFactory) {
        return $cacheFactory('myCache');
    })

    .service('modelService', function() {

        var self = this;

        var data =  {
            films: [
                'A Bew Hope',
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
                'Sly Moore'
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

            getData: function () {
                return data;
            }
        };




    })


    .service('logicService', function (myCache) {
        var self = this;

        // console.log('in logic service');

        var categories = ["people", "films", "starships", "vehicles", "species", "planets"];

        var values_to_not_show = ["unknown", "N/A", "n/a", "unknown years", "none"];

        var api_count = null;

        var spinner = null;

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

            getSpinner: function() {
                return spinner;
            },

            setSpinner: function(activate) {
                spinner = activate;
            },

            getApiCount: function() {
                return api_count;
            },

            setApiCount: function(num) {
                api_count = num;
                return true;
            },

            incrementApiCount: function() {
                api_count++;
                if (api_count === 1) {
                    spinner = true;
                    // console.log('activating spinner');
                }
                return true;
            },

            decrementApiCount: function() {
                api_count--;
                if (!api_count) {
                    spinner = false;
                    // console.log('deactivating spinner');
                    return false;
                }
                return true;
            },

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

        // console.log('in search service');

        var self=this;

        self.category = logicService.lowerCaseThis(logicService.category);
        self.search_term = logicService.search_term;
        apiService.category = logicService.lowerCaseThis(self.category);
        apiService.search_term = self.search_term;
     })




    .service('apiService', function($http, logicService) {


        // console.log('in api service');
        var self = this;

        self.category = logicService.lowerCaseThis(logicService.category);
        self.search_term = logicService.search_term;

        this.getData = function(callback, err) {
            // console.log('starting API call');
            if (logicService.incrementApiCount()) {
                // console.log('succesfully increased API count.');
                // console.log('API total is now at ' + logicService.getApiCount() );
            }
            $http.get('https://swapi.co/api/' + self.category + '/?search='+ self.search_term)
                .then(callback,err)
                .finally(function() {
                        // console.log('DONE LOADING');
                        if (logicService.decrementApiCount()) {
                            // console.log('successfully decremented API count.');
                            // console.log('API count now at '+ logicService.getApiCount());
                        } else {
                            // console.log('API count is reached zero.  Trigger spinner to stop.');
                            // logicService.spinner = false;
                            logicService.setSpinner(false);
                        }

                    }
                )
        }

        this.getDataUrl = function(url, callback, err) {
            // console.log('starting API call');
            if (logicService.incrementApiCount()) {
                // console.log('succesfully increased API count.');
                // console.log('API total is now at ' + logicService.getApiCount() );
            }
            $http.get(url)
                .then(callback,err)
                .finally(function() {
                        // console.log('DONE LOADING');
                        if (logicService.decrementApiCount()) {
                            // console.log('successfully decremented API count.');
                            // console.log('API count now at '+ logicService.getApiCount());
                        } else {
                            // console.log('API count is reached zero.  Trigger spinner to stop.');
                            // logicService.spinner = false;
                            // logicService.setSpinner(false);
                        }

                    }
                )
        }

    })

    .service('parseService', function (apiService, logicService, $log) {
        var self = this;

        // self.new_search = true;

        self.item_number = 0;
        self.array_count = 0;

        self.a_list = [];

        // console.log('in parseService');

        self.categories_with_url = ["homeworld"];

        self.categories_with_array = ["characters", "films", "people", "pilots", "planets", "residents", "species", "starships", "vehicles"];


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

        // We ate going to use this variable to store the number of api calls.

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

            // console.log('in ParseResults for ' + original_category);
            // console.log(results_length + ' total results to process.');


            if (self.a_list.length) {
                self.a_list.length = 0;
            }

            if (self.characters.length) {
                self.characters.length = 0;
            }
            if (self.film_list.length) {
                self.film_list.length  = 0;
            }

            if (self.pilot_list.length) {
                self.pilot_list.length = 0;
            }
            // console.log(results_to_parse);

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
                    console.log('successfully set API count to 0.');
                };

            }

            // console.log('creating arrays for results.');


            switch (original_category) {
                // 0 "people",
                // 1 "films",
                // 2 "starships",
                // 3 "vehicles",
                // 4 "species",
                // 5 "planets"
                case (category_list[0]):
                    // console.log('people');
                    // console.log('creating films, starships and vehicles arrays.');
                    for (var x = 0; x < results_length; x++) {
                        self.film_list[x] = [];
                        self.species[x] = [];
                        self.starships[x] = [];
                        self.vehicles[x] = [];
                    };
                    break;
                case (category_list[1]):
                    // console.log('films');
                    // console.log('creating characters, planets, species, starships and vehicles arrays.');
                    for (var x = 0; x < results_length; x++) {
                        self.characters[x] = [];
                        self.planets[x] = [];
                        self.species[x] = [];
                        self.starships[x] = [];
                        self.vehicles[x] = [];
                    };

                    break;

                case (category_list[2]):
                    // console.log('starships');
                    // console.log('creating films and pilots arrays.');
                    for (var x = 0; x < results_length; x++) {
                        self.pilots[x] = [];
                        self.film_list[x] = [];
                    };

                    break;
                case (category_list[3]):
                    // console.log('vehicles');
                    for (var x = 0; x < results_length; x++) {
                        self.pilots[x] = [];
                        self.film_list[x] = [];
                    };

                    break;

                case (category_list[4]):
                    // console.log('species');
                    for (var x = 0; x < results_length; x++) {
                        self.people[x] = [];
                        self.film_list[x] = [];
                    };

                    break;
                case (category_list[5]):
                    // console.log('planets');
                    for (var x = 0; x < results_length; x++) {
                        self.people[x] = [];
                        self.film_list[x] = [];
                    };

                    break;
            }

            // We need to cycle through object returned in the event there are many.
            results_to_parse.forEach(function(result_item, i, arr) {

                // console.log('in resultstoParse for ' + original_category);
                // console.log(result_item);

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
                        // console.log(url.length)
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

                // Like films, for example
                self.categories_with_array.forEach(function(category) {

                    if (result_item[category]) {

                        // 0 "characters",
                        // 1 "films",
                        // 2 "people"
                        // 3 "pilots",
                        // 4 "planets",
                        // 5 "residents"
                        // 6 "species",
                        // 7 "starships",
                        // 8 "vehicles"

                        switch (category) {
                            case (self.categories_with_array[0]):
                                // characters
                                // console.log('in ' + self.categories_with_array[0].toString());
                                self.processCatArray(category, self.characters, result_item, a_length, a_index);
                                break;
                            case (self.categories_with_array[1]):
                                // films
                                // console.log('in ' + self.categories_with_array[1].toString());
                                self.processCatArray(category, self.films, result_item, a_length, a_index);
                                break;
                            case (self.categories_with_array[2]):
                                // People
                                // console.log('in ' + self.categories_with_array[2].toString());
                                self.processCatArray(category, self.people, result_item, a_length, a_index);
                                break;
                            case (self.categories_with_array[3]):
                                // pilots
                                // console.log('in ' + self.categories_with_array[3].toString());
                                // console.log('total results to parse is ' + a_length);
                                // console.log('the index of this result is ' + a_index);
                                // console.log('triggering populatePilotArray');
                                // self.populatePilotArray(self.pilots, result_item, a_length, a_index);
                                self.processCatArray(category, self.pilots, result_item, a_length, a_index);

                                break;
                            case (self.categories_with_array[4]):
                                // planets
                                // console.log('in ' + self.categories_with_array[4].toString());
                                self.processCatArray(category, self.planets, result_item, a_length, a_index);
                                break;
                            case (self.categories_with_array[5]):
                                // Residents
                                // console.log('in ' + self.categories_with_array[5].toString());
                                self.processCatArray(category, self.people, result_item, a_length, a_index);
                                break;
                            case (self.categories_with_array[6]):
                                // species
                                // console.log('in ' + self.categories_with_array[6].toString());
                                self.processCatArray(category, self.species, result_item, a_length, a_index);
                                break;
                            case (self.categories_with_array[7]):
                                // starships
                                // console.log('in ' + self.categories_with_array[7].toString());
                                self.processCatArray(category, self.starships, result_item, a_length, a_index);
                                break;
                            case (self.categories_with_array[8]):
                                // vehicles
                                // console.log('in ' + self.categories_with_array[8].toString());
                                self.processCatArray(category, self.vehicles, result_item, a_length, a_index);
                                break;


                        }

                    }
                });
                // if (a_index === a_length - 1) {
                // // console.log('detecting end of search!!!!!!!!!!!!!!!!!!!');
                // self.new_search = true;
                // }
            });

        }

        self.processCatArray = function(category, array_name, obj, a_length, a_index) {


            // console.log('process cat array start for ' + category);
            // console.log(self.species);

            var item_array = [];
            var items_in_object = null;


            // 0 "characters",
            // 1 "films",
            // 2 "people"
            // 3 "pilots",
            // 4 "planets",
            // 5 "residents"
            // 6 "species",
            // 7 "starships",
            // 8 "vehicles"



            switch (category) {
                case (self.categories_with_array[0]):
                    // characters
                    // console.log('in ' + self.categories_with_array[0].toString());
                    item_array = obj.characters;
                    break;
                case (self.categories_with_array[1]):
                    // films
                    // console.log('in ' + self.categories_with_array[1].toString());
                    item_array = obj.films;
                    break;
                case (self.categories_with_array[2]):
                    // people
                    // console.log('in ' + self.categories_with_array[2].toString());
                    item_array = obj.people;
                    break;
                case (self.categories_with_array[3]):
                    // pilots
                    // console.log('in ' + self.categories_with_array[3].toString());
                    item_array = obj.pilots;
                    break;
                case (self.categories_with_array[4]):
                    // planets
                    // console.log('in ' + self.categories_with_array[4].toString());
                    item_array = obj.planets;
                    break;
                case (self.categories_with_array[5]):
                    // residents
                    // console.log('in ' + self.categories_with_array[5].toString());
                    item_array = obj.residents;
                    break;
                case (self.categories_with_array[6]):
                    // species
                    // console.log('in ' + self.categories_with_array[6].toString());
                    item_array = obj.species;
                    break;
                case (self.categories_with_array[7]):
                    // starships
                    // console.log('in ' + self.categories_with_array[7].toString());
                    item_array = obj.starships;
                    break;
                case (self.categories_with_array[8]):
                    // vehicles
                    // console.log('in ' + self.categories_with_array[8].toString());
                    item_array = obj.vehicles;
                    break;

            }

            // console.log('in processcatararry for ' + category);

            // console.log(item_array);

            item_array.forEach(function(url) {

                var cache_results = logicService.getCacheItem(url);
                // if the cache is not created, we need to make an API call.
                if (!cache_results) {
                    apiService.getDataUrl(url, function (response) {
                        // Push the URL and result to the Cache
                        logicService.setCacheItem(url, response.data);
                        var trimmed_result = response.data;
                        switch (category) {
                            case (self.categories_with_array[0]):
                                // console.log('characters');
                                /// films
                                self.populate_array(self.characters, trimmed_result, a_index, self.categories_with_array[0]);
                                break;
                            case (self.categories_with_array[1]):
                                // console.log('films');
                                /// films
                                self.populate_array(self.film_list, trimmed_result, a_index, self.categories_with_array[1]);
                                break;
                            case (self.categories_with_array[2]):
                                // people
                                self.populate_array(self.people, trimmed_result, a_index, self.categories_with_array[2]);
                                break;
                            case (self.categories_with_array[3]):
                                // pilots
                                self.populate_array(self.pilots, trimmed_result, a_index, self.categories_with_array[3]);
                                break;
                            case (self.categories_with_array[4]):
                                // console.log('planets');
                                /// films
                                self.populate_array(self.planets, trimmed_result, a_index, self.categories_with_array[4]);
                                break;
                            case (self.categories_with_array[5]):
                                // console.log('residents');
                                /// films
                                self.populate_array(self.people, trimmed_result, a_index, self.categories_with_array[5]);
                                break;
                            case (self.categories_with_array[6]):
                                // console.log('species');
                                /// films
                                self.populate_array(self.species, trimmed_result, a_index, self.categories_with_array[6]);
                                break;
                            case (self.categories_with_array[7]):
                                // console.log('starships');
                                /// films
                                self.populate_array(self.starships, trimmed_result, a_index, self.categories_with_array[7]);
                                break;
                            case (self.categories_with_array[8]):
                                // console.log('vehicles');
                                /// films
                                self.populate_array(self.vehicles, trimmed_result, a_index, self.categories_with_array[8]);
                                break;
                        }

                    }, function (err) {
                        console.log(err.status);
                    });
                } else {
                    // console.log(category + ' in cache');
                    switch (category) {
                        case (self.categories_with_array[0]):
                            // console.log('characters');
                            /// films
                            self.populate_array(self.characters,cache_results, a_index, self.categories_with_array[0]);
                            break;
                        case (self.categories_with_array[1]):
                            // console.log('films');
                            /// films
                            self.populate_array(self.film_list, cache_results, a_index, self.categories_with_array[1]);
                            break;
                        case (self.categories_with_array[2]):
                            // people
                            self.populate_array(self.people, cache_results, a_index, self.categories_with_array[2]);
                            break;
                        case (self.categories_with_array[3]):
                            // pilots
                            self.populate_array(self.pilots, cache_results, a_index, self.categories_with_array[3]);

                            break;
                        case (self.categories_with_array[4]):
                            // console.log('planets');
                            /// films
                            self.populate_array(self.planets, cache_results, a_index, self.categories_with_array[4]);
                            break;
                        case (self.categories_with_array[5]):
                            // console.log('residents');
                            /// films
                            self.populate_array(self.people, cache_results, a_index, self.categories_with_array[5]);
                            break;
                        case (self.categories_with_array[6]):
                            // console.log('species');
                            /// films
                            self.populate_array(self.species, cache_results, a_index, self.categories_with_array[6]);
                            break;
                        case (self.categories_with_array[7]):
                            // console.log('starships');
                            /// films
                            self.populate_array(self.starships, cache_results, a_index, self.categories_with_array[7]);
                            break;
                        case (self.categories_with_array[8]):
                            // console.log('vehicles');
                            /// films
                            self.populate_array(self.vehicles, cache_results, a_index, self.categories_with_array[8]);
                            break;

                    }
                }
            });
        }

        self.processCatUrl =  function(category, obj, array_destination) {
            // console.log(obj);

            switch (category) {
                case (self.categories_with_url[0]):
                    // homeworlds
                    var homeworld_name = obj.name;
                    array_destination.push({
                        name: obj.name,
                        url: obj.url
                    });
                    break;
            }
        }

        self.populate_array = function(array, obj, idx, type) {
            // console.log('in populate_array function.');
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
                    // console.log(self.species);
                    break;
                case self.categories_with_array[4]:
                    array[idx].push({
                        name: obj.name,
                        url: obj.url
                    });
                    // console.log(self.people);
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
            }
        }
    })

    // uncomment this service to use it to easily build the arrays for the autocomplete
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



