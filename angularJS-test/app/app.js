'use strict';

// Declare app level module which depends on views, and core components
angular.module('myApp', [
  'ngRoute',
  // 'ui.router',
  'myApp.view1',
  'myApp.view2',
])
  .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    // $locationProvider.hashPrefix('!');

    $routeProvider.otherwise({redirectTo: '/view1'});
    $locationProvider.html5Mode(true);//启用html5模式
  }]);

  // .config(function ($stateProvider, $urlRouterProvider) {
  //   $urlRouterProvider
  //   .when("", "/about")
  //   .when("/", "/about");
  //   var helloState = {
  //     name: 'view1',
  //     url: '/view1',
  //     templateUrl: 'view1/view1.html',
  //     controller: 'View1Ctrl'
  //   }

  //   var aboutState = {
  //     name: 'about',
  //     url: '/about',
  //     template: '<h3>Its the UI-Router hello world app!</h3>'
  //   }

  //   $stateProvider.state(helloState);
  //   $stateProvider.state(aboutState);
  //   $urlRouterProvider.html5Mode(true);//启用html5模式

  // });
