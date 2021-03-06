var module = angular.module('myapp', ['dndLists', 'ngRoute']);

module.config(
    function($routeProvider) {
        $routeProvider.
            when('/register', {
                templateUrl: 'app/routes/userForm/userForm.html',
                controller: 'UserFormController'
            }).
            when('/editSections', {
                templateUrl: 'app/routes/editSections/editSections.html',
                controller: 'EditSectionsController'
            }).
            when('/section_:section', {
                templateUrl: 'app/routes/notes/notes.html',
                controller: 'NotesController'
            }).
            when('/section/:section/add', {
                templateUrl: 'app/routes/viewSection/viewSection.html',
                controller: 'ViewSectionController'
            }).
            when('/signin', {
                templateUrl: 'app/routes/login/signin.html',
                controller: 'LoginController'
            }).
            otherwise({
                redirectTo: '/'
            })
    }
);