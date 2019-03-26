'use strict';

// import { async } from "q";



angular.module('myApp.view2', [])
  .controller('View2Ctrl', ['$scope', '$http', function ($scope, $http) {
    $scope.getList = getList;
    $scope.jack = {
      name: 'Jackdfdf',
      sex: 'Male'
    };
    $scope.alert = () => {
      alert(111)
    }

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
    // async function getList() {
    //   $scope.loading = true;
    //   $scope.$apply(async function () {
    //     $scope.articles = await fetch().data.slice(0, 10);
    //     $scope.loading = false;
    //   })
    // }
    // function fetch() {
    //   return new Promise((res, rej) => {
    //     $http({
    //       method: 'POST',
    //       url: 'https://www.yangyuetao.cn:8888/api/articleList',
    //       data: { page: 1 },
    //     }).then(
    //       (data) => {
    //         console.log(data);
    //         res(data);
    //         // $scope.articles = data.data.slice(0,10);
    //         // $scope.loading = false;
    //       },
    //       (data) => {
    //         console.log(data);
    //         rej(data);
    //       });
    //   })
    // }
  }]);