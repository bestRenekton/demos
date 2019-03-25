'use strict';


angular.module('myApp.view1', ['ngRoute', 'myApp.ui'])

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
      data: { page: 1 },
    }).then(
      (res) => {
        console.log(res)
      },
      (rej) => {
        console.log(rej)
      });

    $scope.query = "";
    $scope.orderOptions = ['name', 'age'];
    $scope.orderProp = $scope.orderOptions[0];
    $scope.jack = {
      name: 'Jackdfdf',
      sex: 'Male'
    };
    $scope.alert = () => {
      alert(111)
    }
  }])
