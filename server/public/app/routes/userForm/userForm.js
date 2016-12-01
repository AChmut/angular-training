module.controller("UserFormController", function($scope, $http, $location) {
    $scope.user = {};


    $scope.submitForm = function(user) {
        var user = $scope.user;
        user.rpassword = null;
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

module.directive("age", function() {
    return {
        require: "ngModel",
        scope: {
            age: "=age"
        },
        link: function(scope, element, attributes, ngModel) {
            ngModel.$validators.age = function(modelValue) {
                if (modelValue == null || modelValue.length < 10) {
                    return true;
                }
                // ugly hack to avoid converting to date
                var input = "" + modelValue.substring(6, 10) + modelValue.substr(3,2) + modelValue.substr(0,2);
                var date = new Date();
                var check = "" +
                    date.getFullYear() - scope.age +
                    (date.getMonth() < 9 ? 0 : "") +
                    (date.getMonth() + 1) +
                    (date.getDate() < 9 ? 0 : "") +
                    date.getDate();

                return check >= input;
            };
        }
    };
});