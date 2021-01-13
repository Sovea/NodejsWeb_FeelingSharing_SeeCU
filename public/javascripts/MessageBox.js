var DataInfo;
var Articles_Page;
var ThisPage=1;

var Device_ = currDevice();
$(document).ready(function () {
$("").fancybox();
if(Device_.deviceBrowser.mobile==true){
    $("#innerHeader font").attr("size","6");
    $(".card").css("margin-left","0rem");
    $(".card").css("flex-basis","15rem");
    $("#head_img").css("top","1rem");
    $("#head_img").css("right","1rem");
    $("#head_img").css("width","2rem");
    $("#head_img").css("height","2rem");
    // $("#innerHeader label").css("font-size","medium");
    // $("#innerHeader button").css("font-size","medium");
    // $("#innerHeader label").css("width","4rem");
    // $("#innerHeader button").css("width","4rem");
    // $("#innerHeader label").css("height","4rem");
    // $("#innerHeader button").css("height","4rem");
    $("#Info_Board").css("display","none");
    $("#Write_Board").css("display","none");
    $("body").css("background-image","none");
    $(".toggler-open").css({"left":"0.5","top":"1rem","width":"1rem","height":"1rem"});
    $(".main-nav__link-title").css("font-size","2rem");
//   <div class="collapsible">
//     <input id="collapsible1" type="checkbox" name="collapsible">
//     <label for="collapsible1">First</label>
//     <div class="collapsible-body">
//       <span>Bacon ipsum dolor sit amet landjaeger sausage brisket, jerky drumstick fatback boudin ball tip turducken...</span>
//     </div>
//   </div>

}
var XML_Information = new XMLHttpRequest();
XML_Information.open("POST","http://127.0.0.1:8081/user/Info");
XML_Information.setRequestHeader("Content-Type","application/json;charset=utf-8");
// XML_Login.withCredentials = true // 使外部脚本中的post请求头携带当前域的Cookies
XML_Information.send();
XML_Information.onreadystatechange = function (){
    //console.log(XML_Information.status);
    if (XML_Information.readyState == 4) {
        
        if(XML_Information.status==205){
            var Login_No_Box = document.getElementById("Login_No_Box");
            Login_No_Box.style.display = "block";
            $("#Login_No_Board").click();
        }
    else if(XML_Information.status==200){
        DataInfo = JSON.parse(XML_Information.responseText);
        //console.log(DataInfo["Information"]);
        $("#head_img").attr("src",DataInfo["Information"]["headimg"]);
        $("#head_img").css("display","block");
        $("#head_img").on('click',function(){
            window.location.href="http://127.0.0.1:8081/User.html";
        });
    }
    else if(XML_Information.status==206){
        var Search_Error_Box = document.getElementById("Search_Error_Box");
        Search_Error_Box.style.display = "block";
        $("#Search_Error_Board").click();
        
    }
    else{
        var Search_Error_Box = document.getElementById("Search_Error_Box");
        Search_Error_Box.style.display = "block";
        $("#Search_Error_Board").click();
    }
}
}
var XML_Articles_Pages = new XMLHttpRequest();
XML_Articles_Pages.open("GET","http://127.0.0.1:8081/Articles/Pages?offset=20");
XML_Articles_Pages.setRequestHeader("Content-Type","application/json;charset=utf-8");
// XML_Articles_Pages.withCredentials = true // 使外部脚本中的post请求头携带当前域的Cookies
// var tempdata={
//     "offset":20
// }
XML_Articles_Pages.send();
XML_Articles_Pages.onreadystatechange = function (){
    // console.log(XML_Articles_Pages.status);
    if (XML_Articles_Pages.readyState == 4) {
        if(XML_Articles_Pages.status==200){
            var res_json = JSON.parse(XML_Articles_Pages.responseText);
            Articles_Page = res_json["pages"];
            // console.log(res_json);

        }
    }
}
var XML_Articles_Info =  new XMLHttpRequest();
XML_Articles_Info.open("GET","http://127.0.0.1:8081/Articles/Info?offset=20&page=1");
XML_Articles_Info.setRequestHeader("Content-Type","application/json;charset=utf-8");
XML_Articles_Info.send();
XML_Articles_Info.onreadystatechange = function (){
    // console.log(XML_Articles_Info.status);
    if (XML_Articles_Info.readyState == 4) {
        if(XML_Articles_Info.status==200){
            var res_res_json = JSON.parse(XML_Articles_Info.responseText);
            var res_result = res_res_json["results"];
            // console.log(res_res_json);
            var cards_length = getJsonLength(res_result);
            // console.log(cards_length);
            var ID_container = document.getElementById("container");
            // var ID_container_inner = ID_container.innerHTML;
            for(var i=0;i<cards_length;i++){
                if(res_result[i]["article_img"]!==""){
                    //console.log(res_result[i]["article_img"]);
                    ID_container.innerHTML = ID_container.innerHTML +"<div class='card'><a href='"+res_result[i]["article_img"]+"'  data-fancybox='image_funcy' class='a_fancy_box'><img src='"+res_result[i]["article_img"]+"' alt='Card image' class='card_img'></a><div class='card-body' style='color:black;'><h4 class='papercss_en card-title overview'>"+res_result[i]["article_header"]+"</h4><h5 class='papercss_en card-subtitle overview'>"+res_result[i]["article_abstract"]+"</h5><p class='papercss_en card-text overview' style='font-size: medium;'>"+res_result[i]["article_content"]+"</p><button class='papercss papercss_en read_articles' id=article_show_"+res_result[i]["article_id"]+" >Let me go here!</button></div></div>";
                }
                else{
                    //console.log(res_result[i]["article_img"]);
                    ID_container.innerHTML = ID_container.innerHTML +"<div class='card'><div class='card-body' style='color:black;'><h4 class='papercss_en card-title overview'>"+res_result[i]["article_header"]+"</h4><h5 class='papercss_en card-subtitle overview'>"+res_result[i]["article_abstract"]+"</h5><p class='papercss_en card-text overview' style='font-size: medium;'>"+res_result[i]["article_content"]+"</p><button class='papercss papercss_en read_articles' id=article_show_"+res_result[i]["article_id"]+" >Let me go here!</button></div></div>";
                }
            }
        }
    }
}
});
$("#Write_Board").click(function(){
    window.location.href = "http://127.0.0.1:8081/WriteArticle.html";
});
$("#more_articles").click(function(){
    if(ThisPage<parseInt(Articles_Page)){
        ThisPage=ThisPage+1;
        // console.log(ThisPage);
        var XML_Articles_Info =  new XMLHttpRequest();
        XML_Articles_Info.open("GET","http://127.0.0.1:8081/Articles/Info?offset=20&page="+ThisPage+"");
        XML_Articles_Info.setRequestHeader("Content-Type","application/json;charset=utf-8");
        XML_Articles_Info.send();
        XML_Articles_Info.onreadystatechange = function (){
            // console.log(XML_Articles_Info.status);
            if (XML_Articles_Info.readyState == 4) {
                if(XML_Articles_Info.status==200){
                    var res_res_json = JSON.parse(XML_Articles_Info.responseText);
                    var res_result = res_res_json["results"];
                    // console.log(res_res_json);
                    var cards_length = getJsonLength(res_result);
                    // console.log(cards_length);
                    var ID_container = document.getElementById("container");
                    // var ID_container_inner = ID_container.innerHTML;
                    for(var i=0;i<cards_length;i++){
                        if(res_result[i]["article_img"]!==""){
                            //console.log(res_result[i]["article_img"]);
                            ID_container.innerHTML = ID_container.innerHTML +"<div class='card act_fontorg-2015'><a href='"+res_result[i]["article_img"]+"'  data-fancybox='image_funcy' class='a_fancy_box'><img src='"+res_result[i]["article_img"]+"' alt='Card image' class='card_img'></a><div class='card-body' style='color:black;'><h4 class='papercss_en card-title overview'>"+res_result[i]["article_header"]+"</h4><h5 class='papercss_en card-subtitle overview'>"+res_result[i]["article_abstract"]+"</h5><p class='papercss_en card-text overview' style='font-size: medium;'>"+res_result[i]["article_content"]+"</p><button class='papercss papercss_en read_articles' id=article_show_"+res_result[i]["article_id"]+" >Let me go here!</button></div></div>";
                        }
                        else{
                            //console.log(res_result[i]["article_img"]);
                            ID_container.innerHTML = ID_container.innerHTML +"<div class='card act_fontorg-2015'><div class='card-body' style='color:black;'><h4 class='papercss_en card-title overview'>"+res_result[i]["article_header"]+"</h4><h5 class='papercss_en card-subtitle overview'>"+res_result[i]["article_abstract"]+"</h5><p class='papercss_en card-text overview' style='font-size: medium;'>"+res_result[i]["article_content"]+"</p><button class='papercss papercss_en read_articles' id=article_show_"+res_result[i]["article_id"]+" >Let me go here!</button></div></div>";
                        }
                        
                    }
                    var Act_Font_2015 = $(".act_fontorg-2015");
                    Act_Font_2015.setFontSync("4bee963cc268e1d507dfdfe7","fontorg-2015"); //蝉羽飞鸟依人
                }
            }
    }

    }
    else{
        $("#more_articles").css("display","none");
    }
});

$("#container").on('click','.read_articles',function(){
    var button_id = $(this).attr("id");
    var array_des_id = button_id.split("_");
    var des_id = array_des_id[2];
    window.location.href = "http://127.0.0.1:8081/ReadArticle.html?article_id="+des_id+"";
});
 $(".card_img").attr("onerror","javascript:this.src='http://127.0.0.1:8081/php/article_img/error.jpg';");
// $("#container").on("error","img",function(){
//     console.log("no");
//     $(this).style.display='none';
// });
function getJsonLength(jsonData){
    var jsonLength = 0;
    for(var item in jsonData){
       jsonLength++;
    }
    return jsonLength;
}
function imagesError(s){
    

    } 

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