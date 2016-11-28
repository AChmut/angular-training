var module = angular.module('myapp', []);

module.controller('NotesController',

    function($scope, $http) {
        $scope.notes = [];


        var update = function () {
            /*$http.get("/notes").success(function (notes) {
                    $scope.notes = notes;
                }
            );*/
            $scope.notes = notes = [
                {text: "First note"},
                {text: "Second note"},
                {text: "Third note"}
            ];
        }

        update();
    });
