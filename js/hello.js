angular.module("myapp", []) .controller("HelloController", function($scope) {
    $scope.greeting = ""; $scope.update = function() {
        if ($scope.name) {
            $scope.greeting = "Hello, "+$scope.name+"!";
        } }
});