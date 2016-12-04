
module.controller('NotesController',

    function($scope, $http, $routeParams, $rootScope) {
        $scope.activeSection = $routeParams.section;
        $scope.notes = [];
        $scope.error = null;
        $scope.sort = "order";
        $scope.sections = ["Test section"];


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
                    alert(sections);
                    $scope.sections = sections;
                });
        };

        if ($scope.activeSection == null) {
            readSections();
            $scope.sectionLoaded = true;
        }

        $scope.$on('loggedIn', function(event, user) {
            $scope.loggedIn = user;
            readSections();
        });

        $scope.logout = function () {
            $rootScope.$broadcast('loggedOut');
            $scope.loggedIn = null;
            readSections();
        }

    });
