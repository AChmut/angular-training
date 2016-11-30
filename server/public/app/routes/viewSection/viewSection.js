module.controller("ViewSectionController", function($scope, $http, $routeParams, $location) {
    $scope.section = $routeParams.name;

    var params = {params: {section:$routeParams.name}};

    $http.get("/notes", params) .success(function(notes) {
        $scope.notes = notes;
    });

    $scope.add = function() {
        if (!$scope.text || $scope.text.length==0) {
            $scope.error = "Text shouldn't be empty";
            return;
        }
        var note = {
            text: $scope.text,
            section: $scope.activeSection
        };
        $http.put("/notes", note).then($scope.cancel);

    };

    $scope.cancel = function() {
        $location.path($scope.section);
    };
});