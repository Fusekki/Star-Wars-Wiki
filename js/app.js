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

    $rootScope.$on('$routeChangeStart', function (event, next, current) {
        console.log(next.$$route.controller);
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
});




