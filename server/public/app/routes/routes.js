var module = angular.module('myapp', ['dndLists', 'ngRoute']);

module.config(
    function($routeProvider) {
        $routeProvider.
            when('/register', {
                templateUrl: 'app/routes/userForm/userForm.html',
                controller: 'UserFormController'
            }).
            when('/:section?', {
                templateUrl: 'app/routes/notes/notes.html',
                controller: 'NotesController'
            }).
            when('/section/:name', {
                templateUrl: 'app/routes/viewSection/viewSection.html',
                controller: 'ViewSectionController'
            }).
            otherwise({
                redirectTo: '/'
            })
    }
);