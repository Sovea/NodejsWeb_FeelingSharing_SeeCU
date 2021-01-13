var username;
var password;
var useremail;
var userid;
var repassword;
var userid;
var gender;
var jumppage = 0;
//校验email
var emreg=/^\w{3,}(\.\w+)*@[A-z0-9]+(\.[A-z]{2,5}){1,2}$/;
var base64;
var dataURL;
var birthday;
var data = new FormData();
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
// var data_headimg = new FormData();
//强：字母+数字+特殊字符 
var highlevel_pw =  /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)(?![a-zA-z\d]+$)(?![a-zA-z!@#$%^&*]+$)(?![\d!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/;
var blob;   
    
//中：字母+数字，字母+特殊字符，数字+特殊字符
var midlevel_pw = /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/;

//弱：纯数字，纯字母，纯特殊字符
var lowlevel_pw = /^(?:\d+|[a-zA-Z]+|[!@#$%^&*]+)$/;
//校验是否全由数字组成

function isDigit(s)
{
var patrn=/^[0-9]{13,13}$/;
if (!patrn.exec(s)) return false;
return true;
}

//校验登录名：只能输入5-20个以字母开头、可带数字、“_”、“.”的字串
function isRegisterUserName(s)
{
var patrn=/^([a-zA-Z0-9]|[._]|[\u4e00-\u9fa5]){5,20}$/;
if (!patrn.exec(s)) return false;
return true;
}


/*
	获取标准格式时间
	入参：date 
	格式：new Date()
	出参：xx-xx-xx xx:xx:xx
*/
function getdate(date) {
	var year = date.getFullYear() - 1;
	var month =
		date.getMonth() + 1 < 10 ?
		"0" + (date.getMonth() + 1) :
		date.getMonth() + 1;
	var day =
		date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
	var hours =
		date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
	var minutes =
		date.getMinutes() < 10 ?
		"0" + date.getMinutes() :
		date.getMinutes();
	var seconds =
		date.getSeconds() < 10 ?
		"0" + date.getSeconds() :
		date.getSeconds();
	let time =
		year +
		"-" +
		month +
		"-" +
		day +
		" " +
		hours +
		":" +
		minutes +
		":" +
		seconds;
	return time 
}

//校验用户姓名：只能输入1-30个以字母开头的字串

function isTrueName(s)
{
var patrn=/^[a-zA-Z]{1,30}$/;
if (!patrn.exec(s)) return false;
return true;
}


//校验密码：只能输入9-30个字母、数字、下划线
function isPasswd(s)
{
var patrn=/^(\w){9,30}$/;
if (!patrn.exec(s)) return false;
return true;
}

//校验普通电话、传真号码：可以“+”开头，除数字外，可含有“-”
function isTel(s)
{
//var patrn=/^[+]{0,1}(\d){1,3}[ ]?([-]?(\d){1,12})+$/;
var patrn=/^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/;
if (!patrn.exec(s)) return false;
return true;
}

//校验手机号码：必须以数字开头，除数字外，可含有“-”
function isMobil(s)
{
var patrn=/^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/;
if (!patrn.exec(s)) return false;
return true;
}

//校验邮政编码
function isPostalCode(s)
{
//var patrn=/^[a-zA-Z0-9]{3,12}$/;
var patrn=/^[a-zA-Z0-9 ]{3,12}$/;
if (!patrn.exec(s)) return false;
return true;
}
$(document).ready(function(){
    if(Device_.deviceBrowser.mobile==true){
        $("#Info_Board").css("display","none");
        $("#innerHeader font").attr("size","7");
        $(".card").css("margin-left","0rem");
        $(".card").css("flex-basis","15rem");
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
    var XML_If_Login = new XMLHttpRequest();
    XML_If_Login.open("POST","http://127.0.0.1:8081/user/IfLogin",true);
    XML_If_Login.setRequestHeader("Content-Type","application/json;charset=utf-8");
    XML_If_Login.send();
    XML_If_Login.onreadystatechange = function (){
            if (XML_If_Login.readyState == 4) {
                if(XML_If_Login.status==210){

                }
                else if(XML_If_Login.status==204){
                    var Login_Already_Box = document.getElementById("Login_Already_Box");
                    Login_Already_Box.style.display = "block";
                    $("#Login_Already_Board").click();
                    setTimeout(()=>{
                        window.location.href="http://127.0.0.1:8081/MessageBox.html";
                    },3000);               
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

$("#submit_button").click(function(){
    // blob=dataURItoBlob(base64);
    userid = $("#set_id").val();
    username = $("#set_name").val();
    password = $("#set_password").val();
    useremail = $("#set_email").val();
    repassword = $("#set_repassword").val();
    gender = $('#paperSelects1 option:selected').val();
    var birthday_year = $('#paperSelects2 option:selected').val();
    var birthday_month = $('#paperSelects3 option:selected').val();
    birthday = birthday_year+"-"+birthday_month+"-"+"01";
    
    document.getElementById("error_id").style.display="none";
    document.getElementById("error_name").style.display="none";
    document.getElementById("error_password").style.display="none";
    document.getElementById("error_repassword").style.display="none";
    document.getElementById("error_email").style.display="none";
    document.getElementById("error_rules").style.display="none";
    if(isDigit(userid)===false){
        document.getElementById("error_id").style.display="inline";
    }else{
        document.getElementById("error_id").style.display="none";
    if(isRegisterUserName(username)===false){
        document.getElementById("error_name").style.display="inline";
    }
    else{
        document.getElementById("error_name").style.display="none";
        if(isPasswd(password)===false){
            document.getElementById("error_password").style.display="inline";
        }
        else{
            document.getElementById("error_password").style.display="none";
            if(password!==repassword){
                document.getElementById("error_repassword").style.display="inline";   
            }
            else{
                document.getElementById("error_repassword").style.display="none";
                if(emreg.test(useremail)===false){
                   
                    document.getElementById("error_email").style.display="inline";
                }
                else{
                    document.getElementById("error_email").style.display="none";
                    var val_if_agree_rules = $('#rules_set input[name="paperRules"]:checked').val();
                    if(val_if_agree_rules==="no"){
                        document.getElementById("error_rules").style.display="inline";
                    }
                    else{
                    document.getElementById("error_rules").style.display="none";
                    var XML_SignUp = new XMLHttpRequest();
                    XML_SignUp.open("POST","http://127.0.0.1:8081/user/SignUp",true);
                    XML_SignUp.setRequestHeader("Content-Type","application/json;charset=utf-8");
                    // XML_SignUp.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=utf-8");
                    // data.append("userid",userid);
                    // data.append("username",username);
                    // data.append("password",password);
                    // data.append("useremail",useremail);
                    var date = new Date();
                    var time = getdate(date);
                    // data.append("signup_time",time);
                    // data.append("birthday",birthday);
                    var tempdata={
                        "userid":userid,
                        "username":username,
                        "password":password,
                        "gender":gender,
                        "useremail":useremail,
                        "signup_time":time,
                        "birthday":birthday
                    }
                    XML_SignUp.send(JSON.stringify(tempdata));
                    XML_SignUp.onreadystatechange = function (){
                        if (XML_SignUp.readyState == 4) {
                            if(XML_SignUp.status==202){
                                var SignUp_Fail_Box = document.getElementById("SignUp_Fail_Box");
                                SignUp_Fail_Box.style.display = "block";
                                $("#SignUp_Fail_Board").click();
                            }
                            else if(XML_SignUp.status==203){
                                var Insert_Fail_Box = document.getElementById("Insert_Fail_Box");
                                Insert_Fail_Box.style.display = "block";
                                $("#Insert_Fail_Board").click();
                            }
                            else if(XML_SignUp.status==204){
                                var Login_Already_Box = document.getElementById("Login_Already_Box");
                                Login_Already_Box.style.display = "block";
                                $("#Login_Already_Board").click();
                            }
                            else if(XML_SignUp.status==200){
                                var SignUp_Yes_Box = document.getElementById("SignUp_Yes_Box");
                                SignUp_Yes_Box.style.display = "block";
                                $("#SignUp_Yes_Board").click();
                                setTimeout(()=>{
                                    window.location.href = "http://127.0.0.1:8081/Login.html";
                                },3000);
                                // var Data = JSON.parse(XML_SignUp.responseText);
                            // console.log(XML_SignUp.responseText);
                            }
                            
                        }
                    }

                }
            }
        }
    }
}
    }
});

