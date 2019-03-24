'use strict';


angular.module('myApp.view1', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/view1', {
      templateUrl: 'view1/view1.html',
      controller: 'View1Ctrl'
    });
  }])

  .controller('View1Ctrl', ['$scope', '$http', function ($scope, $http) {
    $http({
      method: 'GET',
      url: '/view1/phones.json'
    }).then(
      (res) => {
        $scope.phones = res.data;
      },
      (rej) => {
        console.log(rej)
      });

    $http({
      method: 'POST',
      url: 'https://www.yangyuetao.cn:8888/api/articleList',
      data:{page:1},
    }).then(
      (res) => {
        console.log(res)
      },
      (rej) => {
        console.log(rej)
      });
    
    // $scope.phones = [
    //   {
    //     'name': 'Nexus S',
    //     'snippet': 'Fast just got faster with Nexus S.',
    //     'age': 1
    //   },
    //   {
    //     'name': 'Motorola XOOM? with Wi-Fi',
    //     'snippet': 'The Next, Next Generation tablet.',
    //     'age': 2
    //   },
    //   {
    //     'name': 'MOTOROLA XOOM?',
    //     'snippet': 'The Next, Next Generation tablet.',
    //     'age': 3
    //   }
    // ];
    $scope.query = "1";
    $scope.orderOptions = ['name', 'age'];
    $scope.orderProp = $scope.orderOptions[0];
  }]);