//MODULE

(function() {
    // using the function form of use-strict...
    // "use strict";

    // jQuery to collapse the navbar on scroll
    function collapseNavbar() {
        if ($(".navbar").offset().top > 50) {
            $(".navbar-fixed-top").addClass("top-nav-collapse");
        } else {
            $(".navbar-fixed-top").removeClass("top-nav-collapse");
        }
    }

    $(window).scroll(collapseNavbar);
    $(document).ready(collapseNavbar);

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function() {
        if ($(this).attr('class') != 'dropdown-toggle active' && $(this).attr('class') != 'dropdown-toggle') {
            $('.navbar-toggle:visible').click();
        }
    });

    var swApp = angular.module('swApp', ['ui.bootstrap', 'ngRoute', 'ngResource', 'angularSpinners']);
    // console.log('here');

    swApp.run(function ($rootScope, $route, $window, $location) {
        // console.log('here');

        $rootScope.$on('$routeChangeStart', function (event, next, current) {
            // console.log(event);

            // console.log('here');
            if (next.$$route.controller == "homeCtrl" || next.$$route.controller == undefined) {
                // console.log('here');
                // console.log(next);
                // console.log(event);
                // console.log(current);
                $location.path('/');
            } else if (!current) {
                $location.path('/error');
            }
        });

        // $rootScope.$on('$routeChangeSuccess', function(event, currentRoute, prevRoute){
        //     console.log('here');
        // });


        // I am attempting to add logic for the back button via watches.  These two functions represent this.
        // $rootScope.$on('$locationChangeSuccess', function() {
        //     console.log('here');
        //     $rootScope.actualLocation = $location.path();
        // });
        //
        //
        // $rootScope.$watch(function () {
        //     return $location.path()}, function (newLocation) {
        //     if($rootScope.actualLocation === newLocation) {
        //
        //         // run a function or perform a reload
        //         console.log('here');
        //     }
        // });

    });
})();





