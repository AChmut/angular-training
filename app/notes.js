var module = angular.module('myapp', []);

module.controller('NotesController',

    function($scope, $http, $interval) {
        $scope.notes = [];
        $scope.error = null;


        var update = function () {
            var greetingUrl = $http.get("http://localhost:30000/greeting", {params:
                {
                    name: $scope.name}
                });
            greetingUrl.success(function (greeting) {
                $scope.greeting = greeting;
            })

            var notesUrl = $http.get("http://localhost:30000/notes");
            notesUrl.success(function (notes) {
                    $scope.error = null;
                    $scope.notes = notes;
                }
            );
            notesUrl.error(function () {
                $scope.error = "Can't connect to the server";
            })
        }

        $interval(update, 2000);

        update();
    });
