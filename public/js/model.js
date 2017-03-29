
myapp.controller('model.ctrl', ['$scope', function ($scope) {

    $(function () {
        new WOW().init();
        //鼠标悬浮，模板遮罩
        $('.moban-content-list a').mouseover(function () {
            $(this).css('opacity', '1').siblings().addClass('moban-on')
        })
        $('.moban-content-list a').mouseout(function () {
            $(this).css('opacity', '0').siblings().removeClass('moban-on')
        })
        //预先加载

        $.each($(".moban-content-list li img"), function (i, item) {
            //$(document).scroll(function () {
            //    var rect = item.getBoundingClientRect().top;
                var dataSrc = item.getAttribute('data-src');
                //console.log(rect)
                //if (rect < 1200) {

                    var dataSrc = item.getAttribute('data-src');
                    item.setAttribute('src', dataSrc)
                //}
            //})
        });
        //导航背景切换
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
                window.location.href="model";

            })
        });
        //过滤


    })

}]);

