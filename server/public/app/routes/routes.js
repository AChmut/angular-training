var module = angular.module('myapp', ['dndLists', 'ngRoute']);

module.config(
    function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'app/routes/notes/notes.html',
                controller: 'NotesController'
            }).
            otherwise({
                redirectTo: '/'
            })
    }
);