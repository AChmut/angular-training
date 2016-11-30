
module.controller('NotesController',

    function($scope, $http, $routeParams, $location) {
        $scope.activeSection = $routeParams.section;
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
                    //alert(response.data);
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
                    $scope.sections = sections;
                    if ($scope.activeSection == null &&
                        $scope.sections.length>0) {
                        $scope.activeSection =
                            $scope.sections[0].title;
                    }
                    alert($('#myTabs'));
                    //update();
                    var firstTab = $('#sectionTabs a:first');
                    firstTab.tab('show');
                    $location.path(firstTab.prop('href'));
                });
        };

        $scope.writeSections = function() {
            if ($scope.sections && $scope.sections.length>0) {
                $http.post("/sections/replace", $scope.sections);
            }
        };

        $scope.addSection = function() {
            if ($scope.newSection.length==0) return;
            // check for duplicates
            for (var i=0;i<$scope.sections.length;i++) {
                if ($scope.sections[i].title==$scope.newSection) {
                    return; }
            }
            var section = {title: $scope.newSection};
            $scope.sections.unshift(section);
            $scope.activeSection = $scope.newSection;
            $scope.newSection = "";
            $scope.writeSections();
            update();
        };


        $scope.showSection = function(section) {
            $scope.activeSection = section.title;
            //$location.path(section.title);
            update();
        };

        if ($scope.activeSection == null) {
            readSections();
            $scope.sectionLoaded = true;
        }



    });
