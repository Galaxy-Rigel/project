/**
 * Created by Administrator on 2017/1/9.
 */
// 获取置顶对象
var obj = document.getElementById('scroll');
var scrollTop = null;

// 置顶对象点击事件
obj.onclick = function() {
    var timer = setInterval(function() {
        window.scrollBy(0, -100);
        if (scrollTop == 0)
            clearInterval(timer);
    }, 2);
}

// 窗口滚动检测
window.onscroll = function() {
    scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    obj.style.display = (scrollTop >= 300) ? "block" : "none";
}