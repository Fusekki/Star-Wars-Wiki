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


//MODULE
var swApp = angular.module('swApp', ['ui.bootstrap', 'ngRoute', 'ngResource', 'angularSpinners']);


swApp.run(function ($rootScope, $route, $window, $location) {
    // var windowElement = angular.element($window);
    // windowElement.on('beforeunload', function (event) {
    //
    //     // do whatever you want in here before the page unloads.
    //     // the following line of code will prevent reload or navigating away.
    //     event.preventDefault();
    //     return "The page will reload and all data will be lost";
    //     // $location.path('/');
    // });
    $rootScope.$on('$routeChangeStart', function (event, next, current) {
        // console.log('$locationChangeSuccess changed!', new Date());
        // $location.path('/');
        console.log(event);
        console.log(next);
        console.log(current);

        console.log(next.$$route.controller);
        if (next.$$route.controller == "homeCtrl") {
            console.log('here');
            $location.path('/');
        } else if (!current) {
            $location.path('/error');
        }


    });
});




