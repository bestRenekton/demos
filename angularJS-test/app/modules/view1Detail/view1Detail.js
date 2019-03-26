'use strict';


angular.module('myApp.view1Detail', [])
    .controller('view1DetailCtrl', ['$scope', '$http', '$stateParams', '$state', function ($scope, $http, $stateParams, $state) {
        console.log($stateParams)
        $scope.id = $stateParams.id;
    }]);