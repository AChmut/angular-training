module.controller("LoginController", function($scope, $location, UserService, $rootScope, $route) {
    $scope.loggedIn = UserService.loggedIn;

    $scope.login = function() {
        UserService.login($scope.username, $scope.userpassword)
            .then(
                function() {
                    $rootScope.$broadcast('loggedIn', $scope.username);

                    //$scope.wrongPassword = false;
                    $location.path("/");
                    $route.reload();
                },
                function() {
                    $scope.wrongPassword = true;
                }
        );
    }

    $scope.$on('loggedOut', function(event, user) {
        UserService.logout()
            .then(
            function() {
                $location.path("/signin");
                $route.reload();
            }
        );
    });
});