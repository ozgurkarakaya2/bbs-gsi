var clientApp = angular.module('web-push-client',['ui.router','ngStorage']);

clientApp.config(function($stateProvider, $urlRouterProvider) {
    'use strict';
    $urlRouterProvider.otherwise('/');
})
;