var myApp = angular.module('webpush',['ui.router']);

myApp.config(function($stateProvider, $urlRouterProvider) {
        'use strict';
        $stateProvider
        // route for the home page
            .state('app', {
                url:"/",
                views:{
                    'content':{
                        templateUrl:"views/subscribers.html",
                        controller:"SubscribersController"
                    }
                }
            });

        $urlRouterProvider.otherwise('/');
    })
;