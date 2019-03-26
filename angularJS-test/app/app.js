'use strict';

// Declare app level module which depends on views, and core components
angular.module('myApp', [
  // 'ngRoute',
  'ui.router',
  'myApp.tabs',
  'myApp.view1',
  'myApp.view1Detail',
  'myApp.view2',
])
  // .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  //   // $locationProvider.hashPrefix('!');

  //   $routeProvider.otherwise({redirectTo: '/view1'});
  //   $locationProvider.html5Mode(true);//启用html5模式
  // }]);

  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
      .state('tabs', {
        url: '/tabs',
        templateUrl: 'modules/tabs/tabs.html',
        controller: 'TableCtrl'
      })
      .state('tabs.view1', {
        url: '/view1',
        templateUrl: 'modules/view1/view1.html',
        controller: 'View1Ctrl'
      })
      .state('tabs.view1Detail', {
        url: '/view1Detail',
        templateUrl: 'modules/view1Detail/view1Detail.html',
        controller: 'view1DetailCtrl',
        params: { id: 1 }
      })
      .state('tabs.view2', {
        url: '/view2',
        templateUrl: 'modules/view2/view2.html',
        controller: 'View2Ctrl'
      })

    $urlRouterProvider.otherwise('tabs/view1');   //无效路由跳转
    // $locationProvider.html5Mode(true);//启用html5模式
  })

