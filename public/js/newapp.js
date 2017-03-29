/**
 * Created by songfei on 2017/1/7.
 */
'use strict';

// 初始化wow.js
//new WOW().init();
var wow = new WOW({
    boxClass: 'wow',
    animateClass: 'animated',
    offset: 0,
    mobile: false,
    live: true
});
wow.init();

// page 按钮样式
//$(document).ready(function () {
//    $('.pages-list>li').click(function () {
//        $(this).addClass('on').siblings().removeClass('on');
//    });
//});


myapp.run(['$rootScope', '$state', function ($rootScope, $state) {
    // 监听跳转页面
    $rootScope.$on('$stateChangeStart', function (event, curret, next) {
        console.log(curret);
        $rootScope.prevPage = function () {
            if (curret.name == 'new2') {
                $state.go('new1');
            }
            if (curret.name == 'new3') {
                $state.go('new2');
            }
        };
        $rootScope.nextPage = function () {
            if (curret.name == 'new1') {
                $state.go('new2');
            }
            if (curret.name == 'new2') {
                $state.go('new3');
            }
        };
    })
}]);


myapp
//    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
//        function ($stateProvider, $urlRouterProvider, $locationProvider) {
//            $locationProvider.hashPrefix('');
//            $locationProvider.html5Mode(true);
//            $stateProvider
//                .state('new1', {
//                    url: '/new1',
//                    views: {
//                        'viewNews': {
//                            templateUrl: '/views/new1.tpl.html',
//                            controller: 'new1.tpl.ctrl'
//                        }
//                    }
//                })
//                .state('new2', {
//                    url: '/new2',
//                    views: {
//                        'viewNews': {
//                            templateUrl: '/views/new2.tpl.html',
//                            controller: 'new2.tpl.ctrl'
//                        }
//                    }
//                })
//                .state('new3', {
//                    url: '/new3',
//                    views: {
//                        viewNews: {
//                            templateUrl: '/views/new3.tpl.html',
//                            controller: 'new3.tpl.ctrl'
//                        }
//                    }
//                })
//                .state('detail', {
//                    url: '/detail/:id',
//                    views: {
//                        viewNews: {
//                            templateUrl: '/views/detail.tpl.html',
//                            controller: 'detail.tpl.ctrl'
//                        }
//                    }
//                });
//            $urlRouterProvider.otherwise('/new1');
//
//        }])
    .controller('new1.tpl.ctrl', ['$rootScope','$scope', '$http',
        function ($rootScope,$scope, $http) {

            // 得到文章列表的方法
            var initPage1 = function () {
                $http({
                    url: '/api/list',
                    method: 'get'
                }).then(function (res) {
                    var data = res.data;
                    if (data.isSuccess) {
                        $scope.oneList = [];
                        for (var i = 0; i < data.list.length; i++) {
                            if (data.list[i].tid > 0 && data.list[i].tid <= 5) {
                                $scope.oneList.push(data.list[i]);

                                setTimeout(function () {
                                    var wow = new WOW({
                                        boxClass: 'wow',
                                        animateClass: 'animated',
                                        offset: 0,
                                        mobile: false,
                                        live: true
                                    });
                                    wow.init();
                                });
                                //console.log(data.list[i]);
                            }
                        }
                        console.log($scope.oneList);
                    } else {
                        //alert(data.err);
                    }
                }, function (err) {

                })
            };
            initPage1();

        }])
    .controller('new2.tpl.ctrl', ['$scope', '$http',
        function ($scope, $http) {
            // 得到文章列表的方法
            var initPage2 = function () {
                $http({
                    url: '/api/list',
                    method: 'get'
                }).then(function (res) {
                    var data = res.data;
                    if (data.isSuccess) {
                        $scope.twoList = [];
                        for (var i = 0; i < data.list.length; i++) {
                            if (data.list[i].tid > 5 && data.list[i].tid <= 10) {
                                $scope.twoList.push(data.list[i]);
                                // page 按钮样式

                                setTimeout(function () {
                                    var wow = new WOW({
                                        boxClass: 'wow',
                                        animateClass: 'animated',
                                        offset: 0,
                                        mobile: false,
                                        live: true
                                    });
                                    wow.init();
                                });


                            }
                        }
                        //console.log($scope.twoList);
                    } else {
                        //alert(data.err);
                    }
                }, function (err) {

                })
            };
            initPage2();

        }])
    .controller('new3.tpl.ctrl', ['$scope', '$http',
        function ($scope, $http) {

            // 得到文章列表的方法
            var initPage3 = function () {
                $http({
                    url: '/api/list',
                    method: 'get'
                }).then(function (res) {
                    var data = res.data;
                    if (data.isSuccess) {
                        $scope.threeList = [];
                        for (var i = 0; i < data.list.length; i++) {
                            if (data.list[i].tid > 10 && data.list[i].tid <= 15) {
                                $scope.threeList.push(data.list[i]);

                                setTimeout(function () {
                                    var wow = new WOW({
                                        boxClass: 'wow',
                                        animateClass: 'animated',
                                        offset: 0,
                                        mobile: false,
                                        live: true
                                    });
                                    wow.init();
                                });

                            }

                        }
                        console.log($scope.threeList);
                    } else {
                        //alert(data.err);
                    }
                }, function (err) {

                })
            };
            initPage3();

        }])
    .controller('detail.tpl.ctrl', ['$rootScope', '$scope', '$http', '$stateParams',
        function ($rootScope, $scope, $http, $stateParams) {
            // 得到详细文章的方法
            $rootScope.hidePage = true;
            var detailArticle = function (id) {
                $http({
                    url: '/api/list',
                    method: 'get'
                }).then(function (res) {
                    var data = res.data;
                    //console.log(data.list);
                    if (data.isSuccess) {
                        for (var i = 0; i < data.list.length; i++) {
                            if (data.list[i].tid == id) {
                                $scope.detailList = (data.list[i]);
                                setTimeout(function () {
                                    var wow = new WOW({
                                        boxClass: 'wow',
                                        animateClass: 'animated',
                                        offset: 0,
                                        mobile: false,
                                        live: true
                                    });
                                    wow.init();
                                });
                            }
                        }
                        console.log($scope.detailList);
                    } else {
                        //alert(data.err);
                    }
                }, function (err) {

                })
            };
            detailArticle($stateParams.id);
            //alert($stateParams.id);
        }]);

