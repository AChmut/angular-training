var myapp = angular.module("myapp", []);
myapp.controller("HelloController", function($scope) {

    $scope.greeting = "";
    $scope.update = function() {
        if ($scope.name) {
            $scope.greeting = "Hello, "+$scope.name+"!";
        }
    }

});
myapp.controller("BirdsController", function($scope) {

    $scope.birds = [
        {name: 'A', count: 123},
        {name: 'B', count: 17},
        {name: 'C', count: '999+'},
        {name: 'D', count: 447},
        {name: 'E', count: '999+'},
        {name: 'F', count: 429}
    ];
});