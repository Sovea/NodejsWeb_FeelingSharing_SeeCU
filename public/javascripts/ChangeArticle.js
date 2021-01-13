

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
var dataURL;

/*
	获取标准格式时间
	入参：date 
	格式：new Date()
	出参：xx-xx-xx xx:xx:xx
*/
function getdate(date) {
	var year = date.getFullYear();
	var month = date.getMonth()+1; 
	var day = date.getDate(); 
	var hours = date.getHours(); 
	var minutes = date.getMinutes();
	var seconds = date.getSeconds();
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
$(document).ready(function () {
        if(Device_.deviceBrowser.mobile==true){
            $("#Info_Board").css("display","none");
            // $("#innerHeader font").attr("size","7");
            // $(".card").css("margin-left","0rem");
            // $(".card").css("flex-basis","15rem");
            $(".border").css("width","3rem");
            $(".border").css("height","3rem");
            $("#button_lights").css({ "margin":"auto","float": "right", "text-align":"center","width":"100%"});
            $(".toggler-open").css({"left":"0.5","top":"1rem","width":"1rem","height":"1rem"});
            // $("#innerHeader label").css("font-size","medium");
            // $("#innerHeader button").css("font-size","medium");
            // $("#innerHeader label").css("width","4rem");
            // $("#innerHeader button").css("width","4rem");
            // $("#innerHeader label").css("height","4rem");
            // $("#innerHeader button").css("height","4rem");
            $(".main-nav__link-title").css("font-size","2rem");
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
                document.getElementById("article_header").value = res_result["article_header"];
                document.getElementById("article_abstract").value = res_result["article_abstract"];
                document.getElementById("article_content").value = res_result["article_content"];
            }
        }
    }

    });
    $("#submit_button").click(function(){
        // blob=dataURItoBlob(base64);
        var article_header = $("#article_header").val();
        //alert(username);
        var article_abstract = $("#article_abstract").val();
        var article_content = $("#article_content").val();
        if(article_header==""){
            document.getElementById("error_header").style.display="inline";
        }
        else{
            document.getElementById("error_header").style.display="none";
            if(article_abstract==""){
                document.getElementById("error_abstract").style.display="inline";
            }
            else{
                document.getElementById("error_abstract").style.display="none";
                if(article_content==""){
                    document.getElementById("error_content").style.display="inline";   
                }
                else{
                    document.getElementById("error_content").style.display="none";
                    var val_if_agree_post = $('#paperSelects1 option:selected').val();
                    console.log("val_if_agree_post:"+val_if_agree_post);
                    var if_post;
                    if(val_if_agree_post==2){
                        if_post=0;
                    }
                    else{
                        if_post=1;
                    }
                    var file = document.getElementById("file").files[0];
                    var fileinfo = $("#file").val();
                        //正则表达式获取文件名，不带后缀
                        var strFileName=fileinfo.replace(/^.+?\\([^\\]+?)(\.[^\.\\]*?)?$/gi,"$1");  
                        //正则表达式获取后缀
                        var FileExt=fileinfo.replace(/.+\./,"");
                    var if_have_img;
                    if(file){
                        if_have_img=1;
                    }
                    else{
                        if_have_img=0;
                    }
                    var XML_WriteArticle = new XMLHttpRequest();
                    XML_WriteArticle.open("POST","http://127.0.0.1:8081/Articles/UpdateArticle",true);
                    XML_WriteArticle.setRequestHeader("Content-Type","application/json;charset=utf-8");
                    // XML_WriteArticle.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=utf-8");
                    // data.append("userid",userid);
                    // data.append("username",username);
                    // data.append("password",password);
                    // data.append("useremail",useremail);
                    var date = new Date();
                    var time = getdate(date);
                    var article_id = form_data.get("article_id");
                    // data.append("signup_time",time);
                    // data.append("birthday",birthday);
                    var tempdata={
                        "article_header":article_header,
                        "article_abstract":article_abstract,
                        "article_content":article_content,
                        "article_change_time":time,
                        "if_post":if_post,
                        "article_id":article_id,
                        "if_have_img":if_have_img,
                        "FileExt":FileExt
                    }
                    XML_WriteArticle.send(JSON.stringify(tempdata));
                    XML_WriteArticle.onreadystatechange = function (){
                        if (XML_WriteArticle.readyState == 4) {
                            if(XML_WriteArticle.status==207){
    
                                var Post_Fail_Box = document.getElementById("Post_Fail_Box");
                                Post_Fail_Box.style.display = "block";
                                $("#Post_Fail_Board").click();
                            }
                            else if(XML_WriteArticle.status==200){
                                var data_img = new FormData();
                                var res_data = JSON.parse(XML_WriteArticle.responseText);
                                if(if_have_img==1){
                                    data_img.append("file",file);
                                    data_img.append("UserId",res_data["UserId"]);
                                    data_img.append("article_id",res_data["article_id"]);
                                    data_img.append("article_img","SeeCU_article_"+res_data["UserId"]+"_"+res_data["article_id"]+"."+FileExt);
                                    $.ajax({
                                        url: "http://127.0.0.1:8081/php/upload_img.php",
                                        type: "post",
                                        data: data_img,
                                        dataType: "json",
                                        cache: false,
                                        processData: false,
                                        contentType: false, 
                                        success: function (data) {
                                            // console.log(data.file);
                                            // console.log(data.id_token);
                                            //var jsondata = JSON.parse(data);
                                            //alert(jsondata["code"]);
                                            if(data["code"]==200){
                                                var Post_Yes_Box = document.getElementById("Post_Yes_Box");
                                                Post_Yes_Box.style.display = "block";
                                                $("#Post_Yes_Board").click();
                                                setTimeout(()=>{
                                                    window.location.href = "http://127.0.0.1:8081/User.html";
                                                },3000);
                                            }
                                            else if(data["code"]==201){
                                                var Pic_Fail_Box = document.getElementById("Pic_Fail_Box");
                                                Pic_Fail_Box.style.display = "block";
                                                $("#Pic_Fail_Board").click();
                                            }
                                            else{
                                                    var Pic_Fail_Box = document.getElementById("Pic_Fail_Box");
                                                    Pic_Fail_Box.style.display = "block";
                                                    $("#Pic_Fail_Board").click();
                                            }
                                        },
                                        error: function (xhr, textStatus, errorThrown) {
                                            /*错误信息处理*/
                                            var Pic_Fail_Box = document.getElementById("Pic_Fail_Box");
                                            Pic_Fail_Box.style.display = "block";
                                            $("#Pic_Yes_Board").click();
                                　　　　} 
                                    });
                                }
                            
                                
                            }
                            
                        }
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



    // init
function initFile(fo){
    var divFile = document.createElement("div");
    divFile.className="file";  
    fo.parentNode.insertBefore(divFile,fo);
    divFile.appendChild(fo);
    var  btnRemove = document.createElement("button");
    btnRemove.className="remove";
    btnRemove.innerHTML="移除";
    divFile.insertBefore(btnRemove,fo);
    var  btnUpload = document.createElement("button");
    btnUpload.className="upload";
    btnUpload.innerHTML="上传";
    divFile.insertBefore(btnUpload,btnRemove);
    var  showImgTar = document.createElement("img");
    // var showImgTar = document.getElementById("file_img");
    showImgTar.setAttribute('src','/images/none.jpg');
    showImgTar.setAttribute('id','file_img');
    showImgTar.setAttribute('width','150');
    showImgTar.setAttribute('height','150');
    divFile.insertBefore(showImgTar,btnUpload);
    }
    var inputFiles = document.querySelectorAll("input[type='file']");
    inputFiles.forEach(function(inf){
    initFile(inf);
    })
    // file onload
    var upload = document.querySelectorAll(".upload");
    var file = document.querySelectorAll(".file");
    file.forEach(function(f){
    var showImg = f.querySelector("img");
    var defImgSrc = "";
    var inpFile = f.querySelector("input[type='file']");
    //移除
    f.querySelector(".remove").onclick = function(){
    showImg.src=defImgSrc;
    inpFile.value="";
    }
    // 上传
    f.querySelector(".upload").onclick = function(){
    f.querySelector("input[type='file']").click();
    }
    inpFile.onchange = function(){
    //判断文件类型
    //console.dir(this.value);
    // data.append("blob",this.files[0]);
    var fileName = this.files[0].name;
    var fileExt = fileName.split(".").pop().toLowerCase();
    if(fileExt!='jpg' && fileExt!= 'gif' && fileExt!= 'png'){
    alert("请上传jpg,gif,png图片");
    this.value="";
    return;
    }
    //判断文件大小
    var fileSize = 1024 * 1024 * 4;
    if(this.files[0].size>=fileSize){
    alert("图片大于4M,请重新选择");
    this.value="";
    return;
    }
    //创建fileReader对象
    var reader =  new FileReader();
    //图片编码完成
    reader.onloadend = function(e){
    showImg.src = e.target.result;
    base64=e.target.result;
    // console.log(base64);
    }
      //解析图片 成base 64位的图片 用fileReader的readAsDataURL 去读本地图片对象
    reader.readAsDataURL(this.files[0]);
    // base64=reader.result;

    }
     })