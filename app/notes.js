var module = angular.module('myapp', []);

module.controller('NotesController',

    function($scope, $http) {
        $scope.notes = [];
        $scope.error = null;


        var update = function () {
            var url = $http.get("http://localhost:30000/notes");
            url.success(function (notes) {
                    $scope.notes = notes;
                }
            );
            url.error(function () {
                $scope.error = "Can't connect to the server";
            })
        }

        update();
    });
