var module = angular.module('myapp', []);

module.controller('NotesController',

    function($scope, $http, $interval) {
        $scope.notes = [];
        $scope.error = null;
        $scope.sort = "order";


        var update = function () {
            $http.get("/notes", {
                params: {
                    sort: $scope.sort,
                    section: $scope.activeSection
                }
            }).then(
                function (response) {
                        $scope.error = null;
                        $scope.notes = response.data;
                    },
                function (error) {
                     $scope.error = "Can't connect to the server: " + error;
                });
        };

        $scope.add = function() {
            var note = { text: $scope.text };
            $http.put("/notes", note).then(update);
        };

        $scope.remove = function(id) {
            $http.delete("/notes", {params: {id:id}}).success(update);
        };

        $scope.sendToTop = function(id) {
            $http.post("/notes/sendTotTop", {params: {id:id}}).success(update);
        };

        $scope.refresh = update;

        $scope.updateSort = function(sort) {
            $scope.sort = sort;
            update();
        }

        //$interval(update, 200);

        update();

        var readSections = function() {

            $http.get("/sections")
                .success(function(sections) {
                    $scope.sections = sections;
                    if ($scope.activeSection == null &&
                        $scope.sections.length>0) {
                        $scope.activeSection =
                            $scope.sections[0].title;
                    }
                    update();
                });
        };

        $scope.showSection = function(section) {
            $scope.activeSection = section.title;
            update();
        }

        readSections();


    });
