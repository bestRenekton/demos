'use strict';

// Declare app level module which depends on views, and core components
angular.module('myApp', [
  // 'ngRoute',
  'ui.router',
  'myApp.view1',
  'myApp.view2',
])
  // .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  //   // $locationProvider.hashPrefix('!');

  //   $routeProvider.otherwise({redirectTo: '/view1'});
  //   $locationProvider.html5Mode(true);//启用html5模式
  // }]);

  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
      .state('view1', {
        url: '/view1',
        templateUrl: 'view1/view1.html',
        controller: 'View1Ctrl'
      })


    $urlRouterProvider.otherwise('view1');   //将一个路由重定向
    $locationProvider.html5Mode(true);//启用html5模式
  })

