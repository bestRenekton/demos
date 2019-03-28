angular.module('myApp.ui', [])
    .directive('myTitle', () => {
        return {
            restrict: 'ACE',//E元素名称，A属性：C类名，M注释
            transclude: {//插槽true，false,obj
                title1: 'title1',
                title2: 'title2',
            },
            replace: true,//替换指令标签
            // template: '<div></div>',
            templateUrl: '/directives/UI/templates/MyTitle.html',
            scope: {//false：共享父域，true：继承父域，且新建独立作用域,obj：不继承父域，且新建独立作用域
                props: '=props',//@单向绑定，=双向绑定，&绑定外部函数
                alert2: '&alert',//如果想省略，则名称必须一致。
            },
            // controller:'View1Ctrl',
            controller: function ($scope) {//字符串，或者function
                $scope.stateName = 'haha'
            },
            link:function($scope,$element,attr){//在link中主要操作DOM。执行顺序晚于controller
                $scope.stateName = 'dfdf'
                console.log($element.find('div'));
            }
        }
    })
    .directive('listCard', function ($state) {
        return {
            restrict: 'ACE',
            // replace: true,
            templateUrl: '/directives/UI/templates/ListCard.html',
            scope: {
                props: '=props',
            },
            controller: function ($scope) {
                $scope.stateName = 'haha'
                $scope.go = function () {
                    $state.go('tabs.view1Detail', {id:$scope.props.id});
                }
            },
        }
    })