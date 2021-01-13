
//----------------------获取url传参----------------------------//

var Data;
var paValue = new Array();//创建一个用于保存具体值得数组
var form_data = new FormData();
var loc = location.href;
var n1 = loc.length;//地址的总长
var n2 = loc.indexOf("?");//取得=号的位置
var parameter = decodeURI(loc.substr(n2+1, n1-n2));//截取从?号后面的内容,也就是参数列表，因为传过来的路径是加了码的，所以要解码
var parameters  = parameter.split("&");//从&处拆分，返回字符串数组
var MAX_num = 30;
var searchkeywords;
for (var i = 0; i < parameters.length; i++) {
    console.log("参数键值对值"+i+":"+parameters[i]);
    var m1 = parameters[i].length;//获得每个键值对的长度
    var m2 = parameters[i].indexOf("=");//获得每个键值对=号的位置
    var key = parameters[i].substr(0, m2);//获取每个键值对=号前面具体的键
    var value = parameters[i].substr(m2+1, m1-m2);//获取每个键值对=号后面具体的值
    console.log(key+":"+value);
    form_data.append(key,value);
    paValue[i] = value;}//将每个参数的值存入数组
console.log(form_data.get("article_id"));//打印出搜索的第一个参数keywords的值
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
console.log(Device_Data);
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
$(document).ready(function () {
    if(Device_.deviceBrowser.mobile==true){
        $("#Info_Board").css("display","none");
        $("#innerHeader font").attr("size","7");
        // $(".card").css("margin-left","0rem");
        // $(".card").css("flex-basis","15rem");
        $(".border").css("width","3rem");
        $(".border").css("height","3rem");
        $("#button_lights").css({ "margin":"auto","float": "right", "text-align":"center","width":"100%"});
        $(".toggler-open").css({"left":"0.5","top":"1rem","width":"1rem","height":"1rem"});
        $(".main-nav__link-title").css("font-size","2rem");
        // $("#innerHeader label").css("font-size","medium");
        // $("#innerHeader button").css("font-size","medium");
        // $("#innerHeader label").css("width","4rem");
        // $("#innerHeader button").css("width","4rem");
        // $("#innerHeader label").css("height","4rem");
        // $("#innerHeader button").css("height","4rem");
        
        // $("#Write_Board").css("display","none");
    
    }
    var XML_Articles_Info =  new XMLHttpRequest();
    XML_Articles_Info.open("GET","http://127.0.0.1:8081/Articles/Read?article_id="+form_data.get("article_id")+"");
    XML_Articles_Info.setRequestHeader("Content-Type","application/json;charset=utf-8");
    XML_Articles_Info.send();
    XML_Articles_Info.onreadystatechange = function (){
        console.log(XML_Articles_Info.status);
        if (XML_Articles_Info.readyState == 4) {
            if(XML_Articles_Info.status==200){
                var res_res_json = JSON.parse(XML_Articles_Info.responseText);
                var res_result = res_res_json["results"];
                console.log(res_res_json);
                // var cards_length = getJsonLength(res_result);
                // console.log(cards_length);
                var ID_article = document.getElementById("article");
                // var ID_container_inner = ID_container.innerHTML;
                if(res_result["if_changed"]==1){
                    ID_article.innerHTML = ID_article.innerHTML +"<article class='article'><h1 class='article-title'><a href=''>"+res_result["article_header"]+"</a></h1><p class='article-meta'>Written by <a href='#'>"+res_res_json["username"]+"</a> On <a href='#'>"+res_result["article_post_time"]+".</a> Changed On "+res_result["article_change_time"]+"</p><p class='text-lead'>"+res_result["article_abstract"]+"</p><p>"+res_result["article_content"]+"</p></article>";
                }
                else{
                    ID_article.innerHTML = ID_article.innerHTML +"<article class='article'><h1 class='article-title'><a href=''>"+res_result["article_header"]+"</a></h1><p class='article-meta'>Written by <a href='#'>"+res_res_json["username"]+"</a> On <a href='#'>"+res_result["article_post_time"]+".</a></p><p class='text-lead'>"+res_result["article_abstract"]+"</p><p>"+res_result["article_content"]+"</p></article>";
                }
                
            }
        }
    }
});

$("#button_header_light").click(function(){
    var innerHeader = document.getElementById("innerHeader");
    innerHeader.style.backgroundColor = "#ffffff";
    innerHeader.style.color = "#201e1e";
});
    
$("#button_header_dark").click(function(){
    var innerHeader = document.getElementById("innerHeader");
    innerHeader.style.backgroundColor = "#201e1e";
    innerHeader.style.color = "#ffffff";
});
$("#button_body_dark").click(function(){
    var body = document.getElementById("body");
    var article = document.getElementById("article");
    body.style.backgroundColor = "#201e1e";
    article.style.backgroundColor = "#201e1e";
    article.style.color = "#ffffff";
    $("#article input").css("color","white");
});
$("#button_body_light").click(function(){
    var body = document.getElementById("body");
    var article = document.getElementById("article");
    body.style.backgroundColor = "#ffffff";
    article.style.backgroundColor = "#ffffff";
    article.style.color = "#4b4343";
    $("#article input").css("color","#41403e");
});
$("#button_all_dark").click(function(){
    var body = document.getElementById("body");
    var article = document.getElementById("article");
    var innerHeader = document.getElementById("innerHeader");
    innerHeader.style.backgroundColor = "#201e1e";
    innerHeader.style.color = "#ffffff";
    body.style.backgroundColor = "#201e1e";
    article.style.backgroundColor = "#201e1e";
    article.style.color = "#ffffff";
    $("#article input").css("color","white");
});
$("#button_all_light").click(function(){
    var body = document.getElementById("body");
    var article = document.getElementById("article");
    var innerHeader = document.getElementById("innerHeader");
    innerHeader.style.backgroundColor = "#ffffff";
    innerHeader.style.color = "#201e1e";
    body.style.backgroundColor = "#ffffff";
    article.style.backgroundColor = "#ffffff";
    article.style.color = "#4b4343";
    $("#article input").css("color","#41403e");
});
