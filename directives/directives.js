//DIRECTIVES

angular.module('swApp')


    .directive("resultsObject", function() {

        return {
            template: '<ng-include src="getTemplateUrl()"/>'
            // replace: true
        };
    })