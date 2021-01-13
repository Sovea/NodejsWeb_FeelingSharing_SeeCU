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
var dataURL;
var Dele_des_id = 0;
var data = new FormData();
$("#button_logout").on('click',function(){
    var XML_Logout = new XMLHttpRequest();
    XML_Logout.open("POST","http://127.0.0.1:8081/user/Logout");
    XML_Logout.setRequestHeader("Content-Type","application/json;charset=utf-8");
    XML_Logout.send();
    XML_Logout.onreadystatechange = function (){
    // console.log(XML_Logout.status);
    if (XML_Logout.readyState == 4) {
        if(XML_Logout.status==200){
            Logout_If_Box.style.display = "none";
            var Logout_Yes_Box = document.getElementById("Logout_Yes_Box");
            Logout_Yes_Box.style.display = "block";
            $("#Logout_Yes_Board").click();
            setTimeout(()=>{
                window.location.href="http://127.0.0.1:8081/Login.html";
            },3000);
        }
    }
}
});
$(document).ready(function () {
    if(Device_.deviceBrowser.mobile==true){
        $("#Info_Board").css("display","none");
        $("#head_img").css("top","1rem");
        $("#head_img").css("right","1rem");
        $("#head_img").css("width","2rem");
        $("#head_img").css("height","2rem");
        $("#innerHeader font").attr("size","7");
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
    
    }
    var XML_Information = new XMLHttpRequest();
XML_Information.open("POST","http://127.0.0.1:8081/user/Info");
XML_Information.setRequestHeader("Content-Type","application/json;charset=utf-8");
XML_Information.send();
XML_Information.onreadystatechange = function (){
    // console.log(XML_Information.status);
    if (XML_Information.readyState == 4) {
        
        if(XML_Information.status==205){
            var Login_No_Box = document.getElementById("Login_No_Box");
            Login_No_Box.style.display = "block";
            $("#Login_No_Board").click();
            setTimeout(()=>{
                window.location.href="http://127.0.0.1:8081/Login.html";
            },3000);
        }
    else if(XML_Information.status==200){
        DataInfo = JSON.parse(XML_Information.responseText);
        // console.log(DataInfo["Information"]);
        $("#head_img").attr("src",DataInfo["Information"]["headimg"]);
        $("#head_img").css("display","block");
        $("#head_img").on('click',function(){
            var Logout_If_Box = document.getElementById("Logout_If_Box");
            Logout_If_Box.style.display = "block";
            $("#Logout_If_Board").click();
        });
        $("#head_img_big").attr("src",DataInfo["Information"]["headimg"]);
        $("#head_img_big").css("display","block");
        document.getElementById("userid").innerText = DataInfo["Information"]["userid"];
        document.getElementById("user_name").innerText = DataInfo["Information"]["username"];
        if(DataInfo["Information"]["gender"]=="1"){
            document.getElementById("user_gender").innerText = "Male";
        }
        else if(DataInfo["Information"]["gender"]=="0"){
            document.getElementById("user_gender").innerText = "FeMale";
        }
        var arr_true_birth = DataInfo["Information"]["birthday"].split("-");
        var true_birth = arr_true_birth[0]+"-"+arr_true_birth[1];
        document.getElementById("user_birth").innerText = true_birth;
        document.getElementById("user_email").innerText = DataInfo["Information"]["email"];
        document.getElementById("user_signup_time").innerText = DataInfo["Information"]["sign_up_date"];
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
var XML_MyArticle = new XMLHttpRequest();
XML_MyArticle.open("POST","http://127.0.0.1:8081/Articles/OnesArticle");
XML_MyArticle.setRequestHeader("Content-Type","application/json;charset=utf-8");
XML_MyArticle.send();
XML_MyArticle.onreadystatechange = function (){
    // console.log(XML_MyArticle.status);
    if (XML_MyArticle.readyState == 4) {
        if(XML_MyArticle.status == 200){
            var res_Json = JSON.parse(XML_MyArticle.responseText);
            var res_result = res_Json["results"];
            // console.log(res_result);
            var cards_length = getJsonLength(res_result);
            // console.log(cards_length);
            var ID_container = document.getElementById("container");
            // var ID_container_inner = ID_container.innerHTML;
            for(var i=0;i<cards_length;i++){
                if(res_result[i]["article_img"]!==""){
                    ID_container.innerHTML = ID_container.innerHTML +"<div class='card'><a href='"+res_result[i]["article_img"]+"'  data-fancybox='image_funcy' class='a_fancy_box'><img src='"+res_result[i]["article_img"]+"' alt='Card image'></a><div class='card-body' style='color:black;'><h4 class='papercss_en card-title overview'>"+res_result[i]["article_header"]+"</h4><h5 class='papercss_en card-subtitle overview'>"+res_result[i]["article_abstract"]+"</h5><p class='papercss_en card-text overview article_content' style='font-size: medium;'>"+res_result[i]["article_content"]+"</p><center><button class='papercss papercss_en read_articles' id=read_article_"+res_result[i]["article_id"]+" >Let me go here!</button><button class='papercss papercss_en change_articles temp_block' id=article_change_"+res_result[i]["article_id"]+" style='display:none;'>Let me change it!</button><button class='papercss papercss_en dele_articles temp_block' id=article_dele_"+res_result[i]["article_id"]+" style='display:none;'>Let me delete it!</center></button></div></div>";
                }
                else{
                    ID_container.innerHTML = ID_container.innerHTML +"<div class='card'><div class='card-body' style='color:black;'><h4 class='papercss_en card-title overview'>"+res_result[i]["article_header"]+"</h4><h5 class='papercss_en card-subtitle overview'>"+res_result[i]["article_abstract"]+"</h5><p class='papercss_en card-text overview article_content' style='font-size: medium;'>"+res_result[i]["article_content"]+"</p><center><button class='papercss papercss_en read_articles' id=read_article_"+res_result[i]["article_id"]+" >Let me go here!</button><button class='papercss papercss_en change_articles temp_block' id=article_change_"+res_result[i]["article_id"]+" style='display:none;'>Let me change it!</button><button class='papercss papercss_en dele_articles temp_block' id=article_dele_"+res_result[i]["article_id"]+" style='display:none;'>Let me delete it!</center></button></div></div>";
                }
                
            }
        }
    }

}

    });
    $("#container").on('click','.read_articles',function(){
        var button_id = $(this).attr("id");
        var array_des_id = button_id.split("_");
        var des_id = array_des_id[2];
        window.location.href = "http://127.0.0.1:8081/ReadArticle.html?article_id="+des_id+"";
    });
    $("#container").on('click','.change_articles',function(){
        var button_id = $(this).attr("id");
        var array_des_id = button_id.split("_");
        var des_id = array_des_id[2];
        window.location.href = "http://127.0.0.1:8081/ChangeArticle.html?article_id="+des_id+"";
    });
    $("#button_if_dele").click(function(){
        var XML_DeleteArticle = new XMLHttpRequest();
        XML_DeleteArticle.open("POST","http://127.0.0.1:8081/Articles/Delete",true);
        XML_DeleteArticle.setRequestHeader("Content-Type","application/json;charset=utf-8");
        var tempdata={
            "article_id":Dele_des_id
        }
        XML_DeleteArticle.send(JSON.stringify(tempdata));
        XML_DeleteArticle.onreadystatechange = function (){
            Dele_des_id=0;
            if (XML_DeleteArticle.readyState == 4) {
                if(XML_DeleteArticle.status==200){
                    var Dele_Yes_Box = document.getElementById("Dele_Yes_Box");
                    Dele_Yes_Box.style.display = "block";
                    $("#Dele_Yes_Board").click();
                    setTimeout(()=>{
                        window.location.reload();
                    },2000);
                }
                else if(XML_DeleteArticle.status==209){
                    var Dele_No_Box = document.getElementById("Dele_No_Box");
                    Dele_No_Box.style.display = "block";
                    $("#Dele_No_Board").click();
                }
                else if(XML_DeleteArticle.status==205){
                    var Login_No_Box = document.getElementById("Login_No_Box");
                    Login_No_Box.style.display = "block";
                    $("#Login_No_Board").click();
                    setTimeout(()=>{
                        window.location.href="http://127.0.0.1:8081/Login.html";
                    },3000);
                }
                else{

                }
            }
        }
    });
    $("#container").on('click','.dele_articles',function(){
        var button_id = $(this).attr("id");
        var array_des_id = button_id.split("_");
        // console.log(array_des_id[2]);
        Dele_des_id = array_des_id[2];
        var Dele_If_Box = document.getElementById("Dele_If_Box");
        Dele_If_Box.style.display = "block";
        $("#Dele_If_Board").click();
    });
    $("#container").on('mouseenter','.card',function(){$(this).find(".temp_block").css("display","block");$(this).find(".article_content").css("display","none");}).on('mouseleave','.card',function(){$(this).find(".temp_block").css("display","none");$(this).find(".article_content").css("display","block");} );
    // function temp_block_mouseenter(){
    //     // console.log("in");
        
    //     $(".temp_block").css("display","block");
    // }
    // function temp_block_mouseleave(){
    //     // console.log("out");
    //     $(".temp_block").css("display","none");
    // }

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
    function getJsonLength(jsonData){
        var jsonLength = 0;
        for(var item in jsonData){
           jsonLength++;
        }
        return jsonLength;
    }