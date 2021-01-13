
/**
 * 判断当前设备
 * @returns
 */
function currDevice(){
  //设备信息
var u = navigator.userAgent;

  // appVersion 可返回浏览器的平台和版本信息。该属性是一个只读的字符串。
var app = navigator.appVersion;

  //获取浏览器语言
var browserLang = (navigator.browserLanguage || navigator.language).toLowerCase();	

var deviceBrowser = function(){
  return{
    trident: u.includes('Trident') ,  //IE内核
    presto: u.includes('Presto') ,  //opera内核
    webKit: u.includes('AppleWebKit') ,  //苹果、谷歌内核
    gecko: u.includes('Gecko')  && !u.includes('KHTML'),  //火狐内核
    mobile: !!u.match(/AppleWebKit.*Mobile.*/),  //是否为移动终端
    ios: !!u.match(/\(i[^;]+;( U;)? CPU.Mac OS X/),  //ios终端
    android: u.includes('Android') || u.includes('Linux'),  //android终端或者uc浏览器
    iPhone: u.includes('iPhone'),  //是否为iPhone或者QQHD浏览器
    iPad: u.includes('iPad'),  //是否iPad
    webApp: !u.includes('Safari'),  //是否web应用程序，没有头部和底部
    weixin: u.includes('MicroMessenger'),  //是否微信
    qq: u.match(/\sQQ/i) == " qq",  //是否QQ
  }
}();

  
  var Device_Data = {"Device":u,
  "app":app,
  "deviceBrowser":deviceBrowser
}
// console.log(Device_Data);
  return Device_Data;

}
/**
* 获取设备、浏览器的宽度和高度
* @returns
*/
function deviceBrowserWH(){
//获取浏览器窗口的内部宽高 - IE9+、chrome、firefox、Opera、Safari：
var w = window.innerWidth;
var h = window.innerHeight;

// HTML文档所在窗口的当前宽高 - IE8.7.6.5
document.documentElement.clientWidth;
document.documentElement.clientHeight;
document.body.clientWidth;
document.body.clientHeight;

var screenW = window.screen.width;//设备的宽度
var screenH = document.body.clientHeight;

//网页可见区域宽高，不包括工具栏和滚动条（浏览器窗口可视区域大小）
var webpageVisibleW = document.documentElement.clientWidth || document.body.clientWidth;
var webpageVisibleH = document.documentElement.clientHeight || document.body.clientHeight;

//网页正文全文宽高(不包括滚动条)
var webpageW = document.documentElement.scrollWidth || document.body.scrollWidth;
var webpageH = document.documentElement.scrollHeight || document.body.scrollHeight;

//网页可见区域宽高，包括滚动条等边线（会随窗口的显示大小改变）
var webpageVisibleW2 = document.documentElement.offsetWidth || document.body.offsetWidth ;
var webpageVisibleH2 = document.documentElement.offsetHeight || document.body.offsetHeight ;

console.log(w+'*'+h);
console.log(screenW+'*'+screenH);
console.log(webpageVisibleW+'*'+webpageVisibleH);
console.log(webpageW+'*'+webpageH);
console.log(webpageVisibleW2+'*'+webpageVisibleH2);
//网页卷去的距离与偏移量
/*
1.scrollLeft:设置或获取位于给定对象左边界与窗口中目前可见内容的最左端之间的距离；
2.scrollTop:设置或获取位于给定对象最顶端与窗口中目前可见内容的最左端之间的距离；
3.offsetLeft:设置或获取位于给定对象相对于版面或由offsetParent属性指定的父坐标的计算左侧位置；
4.offsetTop:设置或获取位于给定对象相对于版面或由offsetParent属性指定的父坐标的计算顶端位置；
*/

}
var Device_ = currDevice();
  if(Device_.deviceBrowser.mobile==true){
      window.location.href="https://127.0.0.1:8081/MessageBox.html";
  }

$(function(){
    var centerShelfs,
        $body = $('body'),
        $topShelf = $('.shelf.top'),
        $middleShelf = $('.shelf.middle'),
        $bottomShelf = $('.shelf.bottom');
  
    centerShelfs = function(){
      var topShelfPosition = $body.height()/2;
  
      $topShelf.css('top', topShelfPosition);
      $middleShelf.css('top', topShelfPosition + 200);
      $bottomShelf.css('top', topShelfPosition + 400);
    };
  
    moveToShelf = function(e){
      e.preventDefault();
      $body.attr('class', '');
      $body.addClass(e.target.id);
    };
  
    // bind events
    $(window).on('resize', centerShelfs);
    $('.nav a').on('click', moveToShelf);
  
    // move to start position
    centerShelfs();
    
    window.setTimeout(function(){
      $body.addClass('view-middle-shelf');
    }, 500);
  });

  $(document).ready(function () {
    $(".a_fancy_box").fancybox();
  });