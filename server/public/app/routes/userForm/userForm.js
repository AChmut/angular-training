module.controller("UserFormController", function($scope, $http) {
    $scope.user = {};


    $scope.submitForm = function() {
        $http.put("/users", $scope.user) .success(function(data) {
            console.log("saved!");
            $location.path("/");
        });
    }

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

module.directive('uniqueUser', function($http, $q) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, elem, attr, ngModel) {
            ngModel.$asyncValidators.unique = function(modelValue, viewValue) {
                var value = modelValue || viewValue;
                return $http.get('/checkUser?user=' + value). then(function(response) {
                    if (!response.data) { return $q.reject();
                    }
                    return true;
                });
            };
        }
    }
});