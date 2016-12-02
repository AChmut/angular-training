module.controller("LoginController", function($scope, $location, UserService) {
    $scope.loggedIn = UserService.loggedIn;

    $scope.login = function() {
        UserService.login($scope.username, $scope.userpassword)
            .then(
                function() {
                    $scope.loggedIn = true;
                    $scope.wrongPassword = false;
                    $location.path("/");
                    $route.reload();
                },
                function() {
                    $scope.wrongPassword = true;
                }
        );
    }
});