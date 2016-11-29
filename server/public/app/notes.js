var module = angular.module('myapp', []);

module.controller('NotesController',

    function($scope, $http, $interval) {
        $scope.notes = [];
        $scope.error = null;


        var update = function () {
            var notesUrl = $http.get("/notes");
            notesUrl.success(function (notes) {
                    $scope.error = null;
                    $scope.notes = notes;
                }
            );
            notesUrl.error(function () {
                $scope.error = "Can't connect to the server";
            })
        };

        $scope.add = function() {
            var note = { text: $scope.text };
            $http.put("/notes", note) .success(function() {
                $scope.text = "";
                update();
            });
        };

        $scope.remove = function(id) {
            $http.delete("/notes", {params: {id:id}}).success(function() {
                update();
            });
        };

        $scope.sendToTop = function(id) {
            $http.post("/notes/sendTotTop", {params: {id:id}}).success(function() {
                update();
            });
        };

        //$interval(update, 200);

        update();
    });
