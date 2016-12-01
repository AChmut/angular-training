module.controller("UserFormController", function($scope, $http) {
    $scope.user = {};

});

module.directive("matchTo", function() {
    return {
        require: "ngModel",
        scope: {
            otherValue: "=matchTo"
        },
        link: function(scope, element, attributes, ngModel) {
            ngModel.$validators.matchTo = function(modelValue) {
                return modelValue == scope.otherValue;
            };
            scope.$watch("otherValue", function() {
                ngModel.$validate();
            });
        }
    };
});