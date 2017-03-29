/**
 * Created by Administrator on 2017/1/4.
 */
//var myapp = angular.module('myApp',[]);
myapp.controller('person.ctrl', ['$scope', function ($scope) {
    new WOW().init();
    //过滤
    $scope.filter = function(x){
        if(x=='.all'){
            $(x).show();
        }else{
            $(x).hide(600).siblings().show();
        }

    }
    //模态图
    $(function(){
        $.each($(".jianzhan-content ul li"), function (i, item) {
            $(item).on('click',function(){
                var index = $(this).index()+1;
                var path = "../images/model/0"+index+".jpg";
                $('#jianzhan-pic').attr('src',path);
            })
            var dataSrc = item.getAttribute('data-src');
            item.setAttribute('src', dataSrc)


        });
        //导航背景
        $.each($('.moban-nav ul li'), function (i, item) {
            var index = i + 1;
            var src = "../images/model/con-nv" + index + "-on.png";
            var path = "../images/model/con-nv" + index + ".png";
            $(item).on('click', function () {
                if ($(this).find('>a span').css('background-image', 'url(' + src + ')')) {
                    var x = $(this).index();
                    var arr = [1, 2, 3, 4, 5];
                    arr.splice(x, 1);
                    for (var a = 0; a < arr.length; a++) {
                        var b = arr[a];
                        var src1 = "../images/model/con-nv" + b + ".png";
                        $('.moban-nav ul li').eq(b - 1).find('>a span').css('background-image', 'url(' + src1 + ')');
                    }
                    if (arr.length == 4) {
                        arr = [1, 2, 3, 4, 5];
                    }
                }
                $(this).addClass('moban-active').siblings().removeClass('moban-active');
                $(this).find('>a span').addClass('moban-bg-on').parents().siblings().find('>a span').removeClass('moban-bg-on');
                //window.location.href="moban.html";

            })
        })

    })

}]);

