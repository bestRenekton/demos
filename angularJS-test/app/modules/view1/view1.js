'use strict';

angular.module('myApp.view1', [])
  // .config(['$routeProvider', function ($routeProvider) {
  //   $routeProvider.when('/view1', {
  //     templateUrl: 'view1/view1.html',
  //     controller: 'View1Ctrl'
  //   });
  // }])

  .controller('View1Ctrl', ['$scope', '$http', function ($scope, $http) {
    $http({
      method: 'GET',
      url: 'modules/view1/phones.json'
    }).then(
      (res) => {
        $scope.phones = res.data;
      },
      (rej) => {
        console.log(rej)
      });



    $scope.query = "";
    $scope.orderOptions = ['name', 'age'];
    $scope.orderProp = $scope.orderOptions[0];
  }])
