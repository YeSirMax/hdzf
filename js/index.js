
function dfade(name,length,num) {
    if(num<length){

        setTimeout(function () {
            $('.'+name).eq(num).css(
                {'opacity':1,'transform':'scale(1)'}
            );
            num++;
            return dfade(name,length,num)
        },1000)
    }
    else{
        return
    }
}
window.requestAnimationFrame = window.requestAnimationFrame||function (fn) {return setTimeout(fn,1000/60)};
window.cancelAnimationFrame = window.cancelAnimationFrame ||clearTimeout;
function IEVersion() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    if(isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if(fIEVersion == 7) {
            return 7;
        } else if(fIEVersion == 8) {
            return 8;
        } else if(fIEVersion == 9) {
            return 9;
        } else if(fIEVersion == 10) {
            return 10;
        } else {
            return 6;//IE版本<=7
        }
    } else if(isEdge) {
        return 'edge';//edge
    } else if(isIE11) {
        return 11; //IE11
    }else{
        return -1;//不是ie浏览器
    }
}
$(function () {
    var mulu = 'view/';
    var bannerSwiper = null;
    jQuery.support.cors = true;
    var t = null;
    if(IEVersion() == -1 || IEVersion()> 9){
        canvasInit();
    }
    function getBanner(){
        $.ajax({
            type: 'post',
            url: api + 'banner/findBanner',
            data: {date: new Date()},
            success:function (res){
                $('.first-ban .swiper-wrapper').append(addBanner(res.list, 0, ''));
                bannerSwiper = new Swiper('.first-ban',{
                    autoplay : 4500,
                    queueEndCallbacks : true,
                    onSlideChangeStart: function(){
                        var slideLength = parseInt(bannerSwiper.slides.length) - 1;
                        if(bannerSwiper.activeIndex == slideLength){
                              t = setTimeout(function (){
                                    bannerSwiper.swipeTo(0,100,true);
                                    clearTimeout(t);
                               },5000)
                        }
                    },
                    onSlideChangeEnd: function () {
                        if(IEVersion() == -1 || IEVersion()> 9 ){
                            onOffCanvas(bannerSwiper.activeIndex);
                        }
                    }
                });

            },
            error: function (res) {
                console.log(res);
            }
        })
    }
    getBanner();
    function addBanner(list, num, str){
        var _hrefStr = '';
        if(num<list.length){
            if(list[num].type == '0'){
                _hrefStr = list[num].pid
            }else if(list[num].type == '1'){
                _hrefStr = 'view/newsDetail.html?id='+list[num].pid;
            }else if(list[num].type == '2'){
                _hrefStr = 'view/case.html?id ='+list[num].pid
            }
            str += '<div class="swiper-slide"><a href="' + _hrefStr + '"><img class="banImg" src="'+ list[num].src +'" alt=""></a></div>';
            num++;
            return addBanner(list, num,str);
        }else {
            return str
        }
    }
    function getAllCase() {
        $.ajax({
            type: 'post',
            url: api + 'cased/findcase',
            data: {date: new Date()},
            success:function (res){
                $('.navbar-child').html(addCassNav( res.list, 0, ''));
            }
        })
    }
    getAllCase();
    function addCassNav( list, num, str) {
        if(num < list.length){
            str += '<div class="navbar-child-item" title="'+ list[num].title +'">' +
                '<a href="view/case.html?_id='+ list[num]._id +'">'+ list[num].title +'</a>' +
                '</div>';
            num++;
            return addCassNav( list, num, str);
        }else{
            return str
        }
    }

    var originate = new Swiper('.originate-swiper',{
        autoplay : 5000,
        pagination : '.pagination',
        paginationClickable :true,
    });
    dfade('text',$('.text').length,0);
})