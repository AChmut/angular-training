module.factory("UserService", function($http, $q) {
    var service = {};
    service.userName = "";
    service.loggedIn = false;

    service.login = function (login, password) {

        var deferred = $q.defer();

        $http.post("/login", {
            login: login, password: password
        }).success(function (res) {
            if (res) {
                deferred.resolve("logged in");
            } else {
                deferred.reject("wrong username/password");
            }
        });

        return deferred.promise;

    };

    service.logout = function () {
        var deferred = $q.defer();

        $http.post("/logout", {}).success(function (res) {
            deferred.resolve("logged out");
        });

        return deferred.promise;
    };

    return service;
});
