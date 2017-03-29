
myapp.controller('contact.ctrl',['$scope','$http',function($scope,$http){
    createCode();
    //表单验证
    $scope.contactForm=function(){
        var inputCode = document.getElementById("inputCode").value;
        if (inputCode.length <= 0){
            alert("请输入验证码！");
        }else if (inputCode.toUpperCase() != code.toUpperCase()){
            alert("验证码输入有误！");
            createCode();
        }else{
            $http({
                url:'/api/userInfo',
                method:'post',
                data:$scope.user
            }).then(function(res){
                var data = res.data;
            });
            alert("信息已提交，会有客服尽快联系您");
            $('#AdminName').val('');
            $('#Phone').val('');
            $('#Email').val('');
            $('#Adder').val('');
            $('#Context').val('');
        }
    };


// 百度地图API功能
    var map = new BMap.Map("contact-map");            // 创建Map实例

    var point= new BMap.Point(121.397133,31.273712);
    var marker = new BMap.Marker(point);    //创建标注
    map.addOverlay(marker);

    map.centerAndZoom(point,15);  //初始化时，即可设置中心点和地图缩放级别。

    var opts = {
        width:200,
        height:100,
        title:"李子园",
        enableMessage:true,
        message:"点下面看地址"
    };
    var infoWindow = new BMap.InfoWindow("地址：李子园啦啦啦",opts);
    marker.addEventListener('click',function(){
        map.openInfoWindow(infoWindow,point);
    });

//map.enableScrollWheelZoom(true);      //鼠标滚轮缩放地图
    map.disableDragging();     //禁止拖拽
    setTimeout(function(){
        map.enableDragging();   //两秒后开启拖拽
        //map.enableInertialDragging();   //两秒后开启惯性拖拽
    }, 1000);


    var top_left_control = new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT});// 左上角，添加比例尺
    var top_left_navigation = new BMap.NavigationControl();  //左上角，添加默认缩放平移控件
    map.addControl(top_left_control);
    map.addControl(top_left_navigation);


}]);





