module.controller("LoginController", function($scope, $location, UserService, $rootScope, $route) {
    $scope.loggedIn = UserService.loggedIn;

    $scope.login = function() {
        UserService.login($scope.username, $scope.userpassword)
            .then(
                function() {
                    $rootScope.$broadcast('loggedIn', $scope.username);
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