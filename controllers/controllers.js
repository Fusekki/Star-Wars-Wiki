//CONTROLLERS

angular.module('swApp')

    .controller('homeCtrl', function ($scope, $location, logicService) {

        // console.log('in home ctrl');

        $scope.categories = logicService.getCategories();

        $scope.categoryChoice = function(e) {
            if (e.target.parentElement.id) {
                $scope.category = e.target.parentElement.id;
            } else {
                $scope.category = e.target.id;
            }
            $location.path("/search");
        };

        $scope.$watch('category', function () {
            logicService.category = $scope.category;
        });

        $scope.capitalize = function(word) {
            return logicService.capitalizeThis(word);
        };

        $scope.highlightCategory = function(e) {
            var text = $scope.capitalize(e.target.id);
            $("#category_text").text(text);
            $("#category_text").addClass('animated pulse yellow_text');
        };

        $scope.leaveCategory = function(e) {
            $("#category_text").text("Select a category:");
            $("#category_text").removeClass('animated pulse yellow_text');
        }

        // uncomment this function and add masterApiService to dependencies to get lists for autocomplete
        // masterApiService.getAllData(function(response) {
        //     console.log('in results function after api call.');
        //     console.log(response);
        //     var results = response.data.results;
        //     results.forEach(function(result) {
        //         $('#totalResults').append('\'' + result.name + '\',');
        //     });
        //     }, function(err) {
        //         console.log(err.status);
        //     });

    })

    // This is the controller for the realms page
    .controller('searchCtrl', function ($scope, $location, logicService) {

        // console.log('in search ctrl');

        $scope.category = logicService.category;

        $scope.$watch('search_term', function () {
            logicService.search_term = $scope.search_term;
        });

        $scope.submit = function() {
            if ($scope.category) {
                var pathCategory = logicService.lowerCaseThis($scope.category);
                $location.path("/" + pathCategory);
                // console.log($scope.search_term);
            }

        };

        $scope.getItems = function() {
            switch ($scope.category) {
                case "films":
                    return $scope.entries.films;
                case "people":
                    return $scope.entries.people;
                case "starships":
                    return $scope.entries.starships;
                case "vehicles":
                    return $scope.entries.vehicles;
                case "species":
                    return $scope.entries.species;
                case "planets":
                    return $scope.entries.planets;
            }
        };

        $scope.entries = {
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
    })

    // This is the controller for the People results
    .controller('resultCtrl', function ($scope, searchService, logicService, apiService, parseService, $location) {

        // console.log('in result controller.');

        var self = this;

        var category = logicService.lowerCaseThis(logicService.category);
        // console.log(category);

        self.cache_results = null;

        $scope.search_term = logicService.search_term;

        $scope.loading = false;

        var triggerResults = function(category) {
            // console.log('in trigger results');

            var category = category;

            // console.log($scope.search_term);

            self.cache_results = logicService.getCacheItem(category + ':' + $scope.search_term);

            // If the cache item does not exist, make the API call.
            if (!self.cache_results) {
                // $scope.film_container_size = [];
                apiService.search_term = $scope.search_term;
                apiService.category = category;
                self.container_size = [];
                // console.log('cache doesnt have item. making api call.');
                apiService.getData(function(response) {
                    // console.log('in results function after api call.');
                    // console.log(response);
                    $scope.results = response.data.results;
                    $scope.results_length = $scope.results.length;
                    // console.log($scope.results);
                    // console.log(self.container_size);
                    logicService.setCacheItem(category + ':' + $scope.search_term, $scope.results);
                    // This is the only call to the parseService made.
                    parseService.parseResults($scope.results, category);
                }, function(err) {
                    console.log(err.status);
                });
            } else {
                // console.log('item is cached.  retrieving values from cache.');
                // This is the only call to the parseService made.
                $scope.results = self.cache_results;
                parseService.parseResults($scope.results, category);
                logicService.setSpinner(false);
            }
        }

        $scope.$watch('search_term', function() {
            // console.log('ITEM CHANGE');
            $scope.search_term = logicService.search_term;
            triggerResults(category);
        });

        $scope.$watch('homeworlds', function () {
            $scope.homeworlds = parseService.homeworlds;
        });

        $scope.$watch('species', function () {
            $scope.species = parseService.species;
        });

        $scope.$watch('pilots', function () {
            $scope.pilots = parseService.pilots;
        });

        $scope.$watch('people', function () {
            $scope.people = parseService.people;
        });

        $scope.$watch('planets', function () {
            $scope.planets = parseService.planets;
        });

        $scope.$watch('characters', function () {
            $scope.characters = parseService.characters;
        });

        $scope.$watch('starships', function () {
            $scope.starships = parseService.starships;
        });

        $scope.$watch('vehicles', function () {
            $scope.vehicles = parseService.vehicles;
        });

        $scope.$watch(function () {
            // console.log(logicService.getSpinner());
            $scope.loading = logicService.getSpinner();
            // return logicService.getSpinner();
        // }, function (newVal, oldVal) {
        //     if ( newVal !== oldVal ) {
        //         $scope.loading = newVal;
        //         console.log('value has changed for LOADING');
        //     }
        });

        $scope.$watch('films', function () {
            // console.log('film_list has changed');
            $scope.films = parseService.film_list;
        }, true);

        $scope.convertToLocal = function(some_date) {
            return logicService.localizeThis(some_date);
        };

        $scope.convertWeight = function(mass) {
            return logicService.weightThis(mass);
        };

        $scope.callUrl = function(name, url) {
            // console.log('----------------------------------------------------------------------');
            // console.log('we are going to call the api for ' + url);
            // console.log(name);
            // var url_string = url.toString();
            var _slice = url.lastIndexOf('/');
            var _url = url.substr(0, _slice);
            var __slice = _url.lastIndexOf('/')
            var __url = _url.substr(0, __slice);
            var ___slice = __url.lastIndexOf('/') + 1;
            var category = url.substr(0, _slice)
                    .substr(0, __slice)
                    .substr(___slice, __url.length);

            // console.log(category);


            logicService.category = category;
            $scope.category = category;
            logicService.search_term = name;
            $location.path("/" + category);
        };

        $scope.checkValue = function(receivedValue) {
            return logicService.checkValue(receivedValue);

        };


    })
