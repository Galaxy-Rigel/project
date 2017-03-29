myapp.controller('home.ctrl', ['$scope','$http',function ($scope,$http) {

    // 主页验证
    var code;
    $scope.doSubmit = function(){
        var inputCode = document.getElementById("inputCode").value;
        if (inputCode.length <= 0)
        {
            alert("请输入验证码！");
        }
        else if (inputCode.toUpperCase() != code.toUpperCase())
        {
            alert("验证码输入有误！");
            $scope.createCode();
            $('#inputCode').val('');
        }
        else
        {
            $http({
                url:'/api/userInfo',
                method:'post',
                data:$scope.user
            }).then(function(res){
                var data = res.data;
                console.log(data);
            });
            alert("信息已提交，会有客服尽快联系您");
            $('#AdminName').val('');
            $('#Phone').val('');
            $('#Email').val('');
            $('#Adder').val('');
            $('#Context').val('');
        }
    };
    createCode();
    $scope.verifyCode = createCode;
    //function createCode(){
    //    code = "";
    //    var codeLength = 6; //验证码的长度
    //    var checkCode = document.getElementById("checkCode");
    //    var codeChars = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    //        'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
    //        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'); //所有候选组成验证码的字符，当然也可以用中文的
    //    for (var i = 0; i < codeLength; i++)
    //    {
    //        var charNum = Math.floor(Math.random() * 52);
    //        code += codeChars[charNum];
    //    }
    //    if (checkCode)
    //    {
    //        checkCode.className = "code";
    //        checkCode.innerHTML = code;
    //    }
    //}

    // 首页轮播时间间隔  动画初始化
    $(function () {
        // 首页轮播时间间隔
        $('.carousel').carousel({
            interval: 5000
        });
        // 动画初始化
        new WOW().init();
    });

    // lazyload
    $(function(){
        $('img').lazyload({
            effect:'fadeIn',
            threshold: 200
        });
    });

    // 数字滚动
    $(function(){
        $.fn.countTo = function (options) {
            options = options || {};
            return $(this).each(function () {
                // set options for current element
                var settings = $.extend({}, $.fn.countTo.defaults, {
                    from: $(this).data('from'),
                    to: $(this).data('to'),
                    speed: $(this).data('speed'),
                    refreshInterval: $(this).data('refresh-interval'),
                    decimals: $(this).data('decimals')
                }, options);
                var loops = Math.ceil(settings.speed / settings.refreshInterval),
                    increment = (settings.to - settings.from) / loops;
                var self = this,
                    $self = $(this),
                    loopCount = 0,
                    value = settings.from,
                    data = $self.data('countTo') || {};

                $self.data('countTo', data);

                if (data.interval) {
                    clearInterval(data.interval);
                }
                data.interval = setInterval(updateTimer, settings.refreshInterval);

                render(value);

                function updateTimer() {
                    value += increment;
                    loopCount++;

                    render(value);

                    if (typeof(settings.onUpdate) == 'function') {
                        settings.onUpdate.call(self, value);
                    }

                    if (loopCount >= loops) {
                        // remove the interval
                        $self.removeData('countTo');
                        clearInterval(data.interval);
                        value = settings.to;

                        if (typeof(settings.onComplete) == 'function') {
                            settings.onComplete.call(self, value);
                        }
                    }
                }

                function render(value) {
                    var formattedValue = settings.formatter.call(self, value, settings);
                    $self.html(formattedValue);
                }
            });
        };
        $.fn.countTo.defaults = {
            from: 0,               // the number the element should start at
            to: 0,                 // the number the element should end at
            speed: 1000,           // how long it should take to count between the target numbers
            refreshInterval: 100,  // how often the element should be updated
            decimals: 0,           // the number of decimal places to show
            formatter: formatter,  // handler for formatting the value before rendering
            onUpdate: null,        // callback method for every time the element is updated
            onComplete: null       // callback method for when the element finishes updating
        };
        function formatter(value, settings) {
            return value.toFixed(settings.decimals);
        }
        $('.count-number').data('countToOptions', {
            formatter: function (value, options) {
                return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
            }
        });
        $('.timer').each(count);
        function count(options) {
            var $this = $(this);
            options = $.extend({}, options || {}, $this.data('countToOptions') || {});
            $this.countTo(options);
        }
    });

    // news轮播图
    $(function(){
        var boxSingleH =  $('.home-news-content-1 .box').height();
        var homeNews = $('.home-news-contents');
        var newsImg = $('.img img');
        var iNum = 1;

        homeNews.css({'margin-top':-420+'px'});
        $scope.nextClick = newsNext;
        $scope.prevClick = function(){
            iNum--;
            if(iNum <1){
                iNum = 10
                homeNews.css({'margin-top':-7*boxSingleH+'px'});
                newsImg.attr('src','../images/home/news_'+iNum+'.jpg');
            }
            homeNews.css({'margin-top':-iNum*boxSingleH+'px'});
            newsImg.attr('src','../images/home/news_'+iNum+'.jpg');
        };
        function newsNext(){
            iNum++;
            if(iNum>10){
                iNum=1;
                homeNews.css({'margin-top':-420+'px'});
                newsImg.attr('src','../images/home/news_'+iNum+'.jpg');
            }
            homeNews.css({'margin-top':-iNum*boxSingleH+'px'});
            newsImg.attr('src','../images/home/news_'+iNum+'.jpg');
        }

        homeNews.on('mouseover',function(){
            clearInterval(timer);
        });
        homeNews.on('mouseout',function(){
            timer = setInterval(newsNext,3000);
        });

        $('.home-news-contents .box').on('mouseover',function(){
            var index = $(this).index()-2;
            if(index ==0){
                index = 10;
            }else if(index == -1){
                index = 9
            }else if(index == -2){
                index = 8;
            }
            newsImg.attr('src','../images/home/news_'+index+'.jpg');
            $(this).addClass('active');
        });
        $('.home-news-contents .box').on('mouseout',function(){
            $(this).removeClass('active');

        });
        var timer = setInterval(newsNext,5000);

    });


}]);



