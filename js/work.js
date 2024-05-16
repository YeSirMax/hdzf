var work = function (argument) {
    this.argument = argument;
};
work.prototype = {
    /*
    *   截取url参数
    *   name 为key
    *   name String
    * */
    getURLParams: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    },
    /*
    * 转换时间戳为时间格式 (截取到分钟)
    * 参数 timestamp
    * method timeALL({timestamp:timestamp})
    * */
    timeALL: function (options) {
        var timestamp = options.timestamp;
        var d = new Date(timestamp * 1000);    //根据时间戳生成的时间对象
        var year = d.getFullYear();
        var Month = d.getMonth() + 1;
        if (Month.toString().length < 2) {
            Month = '0' + Month;
        }
        var datas = d.getDate();
        if (datas.toString().length < 2) {
            datas = '0' + datas;
        }
        var hour = d.getHours();
        if (hour.toString().length < 2) {
            hour = '0' + hour;
        }
        var minute = d.getMinutes();
        if (minute.toString().length < 2) {
            minute = '0' + minute;
        }
        var times = year + '年' + Month + '月' + datas + '日 ' + hour + ':' + minute;
        return times;
    },
    /*
      * 转换时间戳为时间格式 (截取到日期)
      * 参数 timestamp
      * method timeALL({timestamp:timestamp})
      * */
    timeData: function (options) {
        var timestamp = options.timestamp;
        var d = new Date(timestamp * 1000);    //根据时间戳生成的时间对象
        var year = d.getFullYear();
        var Month = d.getMonth() + 1;
        if (Month.toString().length < 2) {
            Month = '0' + Month;
        }
        var datas = d.getDate();
        if (datas.toString().length < 2) {
            datas = '0' + datas;
        }
        var hour = d.getHours();
        if (hour.toString().length < 2) {
            hour = '0' + hour;
        }
        var minute = d.getMinutes();
        if (minute.toString().length < 2) {
            minute = '0' + minute;
        }
        var years = year + '-' + Month + '-' + datas;
        return years;
    },
    timeArr: function (options) {
        var timestamp = options.timestamp;
        var d = new Date(timestamp * 1000);    //根据时间戳生成的时间对象
        var year = d.getFullYear();
        var Month = d.getMonth() + 1;
        if (Month.toString().length < 2) {
            Month = '0' + Month;
        }
        var datas = d.getDate();
        if (datas.toString().length < 2) {
            datas = '0' + datas;
        }
        var hour = d.getHours();
        if (hour.toString().length < 2) {
            hour = '0' + hour;
        }
        var minute = d.getMinutes();
        if (minute.toString().length < 2) {
            minute = '0' + minute;
        }
       var arr = [year,Month,datas];
        return arr;
    },
    /*
    * YDUI 的REm布局 ui图量的PX/100 = rem 比如100/100 = 1rem;
    * */
    RemYdui: function () {
        /* 设计图文档宽度 */
        var docWidth = 750;

        var doc = window.document,
            docEl = doc.documentElement,
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';

        var recalc = (function refreshRem() {
            var clientWidth = docEl.getBoundingClientRect().width;

            /* 8.55：小于320px不再缩小，11.2：大于420px不再放大 */
            docEl.style.fontSize = Math.max(Math.min(20 * (clientWidth / docWidth), 11.2), 8.55) * 5 + 'px';

            return refreshRem;
        })();

        /* 添加倍屏标识，安卓倍屏为1 */
        docEl.setAttribute('data-dpr', window.navigator.appVersion.match(/iphone/gi) ? window.devicePixelRatio : 1);

        if (/iP(hone|od|ad)/.test(window.navigator.userAgent)) {
            /* 添加IOS标识 */
            doc.documentElement.classList.add('ios');
            /* IOS8以上给html添加hairline样式，以便特殊处理 */
            if (parseInt(window.navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/)[1], 10) >= 8)
                doc.documentElement.classList.add('hairline');
        }

        if (!doc.addEventListener) return;
        window.addEventListener(resizeEvt, recalc, false);
        doc.addEventListener('DOMContentLoaded', recalc, false);
    },
    /*
    * 当前运行环境检测判断为什么浏览器
    * */
    device: function () {
        var doc = window.document,
            Isdevice = [],
            ua = window.navigator && window.navigator.userAgent || '';
        var ipad = !!ua.match(/(iPad).*OS\s([\d_]+)/),
            ipod = !!ua.match(/(iPod)(.*OS\s([\d_]+))?/),
            iphone = !ipad && !!ua.match(/(iPhone\sOS)\s([\d_]+)/);

        Isdevice.device = {
            /**
             * 是否移动终端
             * @return {Boolean}
             */
            isMobile: !!ua.match(/AppleWebKit.*Mobile.*/) || 'ontouchstart' in doc.documentElement,
            /**
             * 是否IOS终端
             * @returns {boolean}
             */
            isIOS: !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
            /**
             * 是否Android终端
             * @returns {boolean}
             */
            isAndroid: !!ua.match(/(Android);?[\s\/]+([\d.]+)?/),
            /**
             * 是否ipad终端
             * @returns {boolean}
             */
            isIpad: ipad,
            /**
             * 是否ipod终端
             * @returns {boolean}
             */
            isIpod: ipod,
            /**
             * 是否iphone终端
             * @returns {boolean}
             */
            isIphone: iphone,
            /**
             * 是否webview
             * @returns {boolean}
             */
            isWebView: (iphone || ipad || ipod) && !!ua.match(/.*AppleWebKit(?!.*Safari)/i),
            /**
             * 是否微信端
             * @returns {boolean}
             */
            isWeixin: ua.indexOf('MicroMessenger') > -1,
            /**
             * 是否火狐浏览器
             */
            isMozilla: /firefox/.test(navigator.userAgent.toLowerCase()),
            /**
             * 设备像素比
             */
            pixelRatio: window.devicePixelRatio || 1
        }
        return Isdevice
    },
    /*
    * 上传图片转换为base64
    *    var files = e.target.files || e.dataTransfer.files; 参数为此
    *    异步任务无法直接return 出去 所以使用promise 封装
    *    methods
    *    Workbridage.transfromBase(files)
             .then(function (res) {
                 var a = res;
             })
    * */
    transfromBase:function (flie) {
        return new Promise(function (resolve,reject) {
            var reader = new FileReader();
            reader.readAsDataURL(flie[0]);
            reader.onload = function(e) {
                resolve(e.target.result);
            };
        })

    },
    /*
     * base64去头
    */
    sliceBase:function (href) {
        return href.replace(/^data:image\/(jpeg|png|gif);base64,/,'');
    },
    /*
    * 配置递归转换函数
    * */
    transfromNeed:function (list,num) {
        return {
            "id":list[num].id,
            "type":list[num].type,
            "_id": list[num]._id
        };
    },
    /*公用递归筛选方法
    *  需调用transfromNeed 函数转换
    * */
    getNeed:function (list,num,result,key) {
         if(num<list.length){
               result.push(this.transfromNeed(list,num)[key]);
               num ++;
               return this.getNeed(list,num,result,key)
         }
         else{
             return result
         }
    },

    timeArr: function (options) {
        var timestamp = options.timestamp;
        var d = new Date(timestamp * 1000);    //根据时间戳生成的时间对象
        var year = d.getFullYear();
        var Month = d.getMonth() + 1;
        if (Month.toString().length < 2) {
            Month = '0' + Month;
        }
        var datas = d.getDate();
        if (datas.toString().length < 2) {
            datas = '0' + datas;
        }
        var hour = d.getHours();
        if (hour.toString().length < 2) {
            hour = '0' + hour;
        }
        var minute = d.getMinutes();
        if (minute.toString().length < 2) {
            minute = '0' + minute;
        }
        var arr = [year,Month,datas];
        return arr;
    }
};
var Workbridage = new work();