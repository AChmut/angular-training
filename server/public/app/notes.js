var module = angular.module('myapp', []);

module.controller('NotesController',

    function($scope, $http, $interval) {
        $scope.notes = [];
        $scope.error = null;
        $scope.sort = "order";


        var update = function () {
            var notesUrl = $http.get("/notes");
            /*var notesUrl = $http.get("/notes", {
                params: { sort: $scope.sort }
            });*/
            notesUrl.success(function (notes) {
                    alert('success: '  + notes);
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

        $scope.refresh = function() {
            update();
        };

        $scope.updateSort = function(sort) {
            $scope.sort = sort;
            update();
        }

        //$interval(update, 200);

        update();
    });
