module.controller("EditSectionsController", function($scope, $http) {

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
                return;
            }
        }
        var section = {title: $scope.newSection};
        $scope.sections.unshift(section);
        //$scope.activeSection = $scope.newSection;
        $scope.newSection = "";
        $scope.writeSections();
        update();
    };
});