'use strict';

// import { async } from "q";



angular.module('myApp.view2', [])
  .controller('View2Ctrl', ['$scope','$http', '$filter',  function ($scope, $http, $filter) {
    $scope.getList = getList;
    $scope.jack = {
      name: 'Jackdfdf',
      sex: 'Male'
    };
    $scope.alert = () => {
      alert(111)
    }
    $scope.date = $filter('date')(new Date(),'M/d/yy h:mm:ss a');
    $scope.color = 'blue';
    $scope.specialValue = {
        "id": "12345",
        "value": "green"
    };
    $scope.items = ['settings', 'home', 'other'];
    $scope.selection = $scope.items[1];



    function getList() {
      $scope.loading = true;
      $http({
        method: 'POST',
        url: 'https://www.yangyuetao.cn:8888/api/articleList',
        data: { page: 1 },
      }).then(
        (data) => {
          console.log(data);
          $scope.articles = data.data.slice(0, 10);
          $scope.loading = false;
        },
        (data) => {
          console.log(data);
        });
    }
  }]);