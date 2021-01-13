var express=require('express');
var mysql = require('mysql');
var DBconfig = require('./DBconfig');
var cookieParser = require('cookie-parser');
var cors = require('cors');
// var session = require('express-session');
// const redis = require('redis');
var bodyParser= require('body-parser');
var xss = require('xss');
// const RedisStore = require('connect-redis')(session)
// var redisClient = redis.createClient('6379', '127.0.0.1');
// var cookie = require('cookies');
var router=express.Router();
router.use(cors({credentials: true,
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "Access-Control-Allow-Origin":"*",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
 }));
var sqlpool = mysql.createPool(DBconfig.mysql);
// router.use(cookieParser());
// router.use(bodyParser.json());
// router.use(bodyParser.urlencoded({ extended: false }));
// router.use(session({
//          name: 'SeeCU_session_lg',                // 非常重要，用于区分两个系统的session
//          secret: '#12Ac_',
//         cookie: { maxAge: 24*60*60*1000 },
//         store: new RedisStore({   // 通过store将session和redis连接
//             client: redisClient            // 新建一个RedisStore传入redis连接对象
//           }),
//         resave: true,
//         saveUninitialized: false
//    }));
router.post('/Login',function (req,res) {
    // console.log("session:"+JSON.stringify(req.session));
    // console.log("cookie:"+req.signedCookies["UserId"]);
    if(req.session.user_id){
        // res.write();
        // console.log(req.session.user_id+" already Login!");
        res.status(204).end("already Login!");
        return;
    }
    sqlpool.getConnection(function (err, connection) {
    var userid = xss(req.body.userid);
    var password = xss(req.body.password);
    connection.query('SELECT * FROM SCUer WHERE SCU_id = ? AND password = ?', [userid, password], function(err, results) {
        if(err||isEmptyObject(results)){
            // console.log("err"+err);
            res.status(201).end("登陆失败");
            connection.release();
            return;
        }
        else{
            req.session.user_id = userid;
            //console.log("登录成功，分配session:"+req.session.user_id);
            //console.log("session:"+req.session);
            //console.log("session:"+JSON.stringify(req.session));
            res.cookie('UserId',results[0]["SCU_id"],{maxAge:24*60*60*1000,httpOnly:true,domain:'sparrowoo.top'});
            //console.log("cookies:"+req.cookies["SeeCU_session_lg"]);
            res.status(200).json({
                _id:results[0]["SCU_id"],
                username:results[0]["username"],
            });
            res.end('登陆成功');
            connection.release();
            return;
            
        }
    });
});

    // }
});
router.post('/IfLogin',function (req,res) {
    // console.log(req.cookies["UserId"]);
    if(req.session.user_id){
        res.status(204).end("already Login!");
        // console.log("not Login");
        return;
    }
    else{
        res.status(210).end("Not Login!");
        // console.log("not Login");
        return;
    }
});
router.post('/SignUp',function (req,res) {
    // console.log(req.body);
    if(req.session.user_id){
        res.status(204).end(" already Login!");
        return;
    }
    else{   
            var userid = xss(req.body.userid);
            var password = xss(req.body.password);
            var username = xss(req.body.username);
            var useremail = xss(req.body.useremail);
            var signup_time = xss(req.body.signup_time);
            var birthday = xss(req.body.birthday);
            var gender = xss(req.body.gender);
            var male_headimg = "http://sparrowoo.top/Learning/SeeCU/public/images/SeeCU_Headimg_MaleIndex.jpeg";
            var female_headimg = "http://sparrowoo.top/Learning/SeeCU/public/images/SeeCU_Headimg_FeMaleIndex.jpeg";
            sqlpool.getConnection(function (err, connection) {
            connection.query('SELECT SCU_id FROM SCUer WHERE SCU_id = ?', [userid], function(err, results) {
                if(!isEmptyObject(results)){
                    res.status(202).end( "该ID已被注册，换一个吧！");
                    connection.release();
                    return;
                }
                else{
                    if(gender=="1"){
                        connection.query('INSERT INTO SCUer VALUES (?,?,?,?,?,?,?,?)', [userid,username,gender,birthday,password,signup_time,useremail,male_headimg], function(err, results){                        
                            if(err){
                                // console.log("err:"+err);
                                res.status(203).send("注册失败"+req.body.userid);
                                connection.release();
                                return;
                            }
                            else{
                                res.status(200).send("注册成功");
                                connection.release();
                                res.status(200).end();
                            }
                            
                        });
                        }
                        else{
                            connection.query('INSERT INTO SCUer VALUES (?,?,?,?,?,?,?,?)', [userid,username,gender,birthday,password,signup_time,useremail,female_headimg], function(err, results){
                                if(err){
                                    // console.log("err:"+err);
                                    res.status(203).send("注册失败"+req.body.userid);
                                    connection.release();
                                    return;
                                }
                                else{
                                    res.status(200).send("注册成功");
                                    connection.release();
                                    
                                }
                                res.status(200).end();
                            });
                        }
                        
                    // req.session.userid = userid;
                    // res.cookie('UserId',userid,{maxAge:24*60*60*1000,httpOnly:true,domain:'sparrowoo.top',signed:true});
                    return;
                }
            });
        });

    }
});
router.post('/Info',function (req,res) {
    // console.log(req.cookies["UserId"]);
    if(!req.session.user_id && !req.cookies["UserId"]){
        res.status(205).end("Not Login!");
        // console.log("not Login");
        return;
    }
    else{   
            var userid = req.session.user_id;
            sqlpool.getConnection(function (err, connection) {
            connection.query('SELECT SCU_id,username,gender,birthday,sign_up_date,email,headimg FROM SCUer WHERE SCU_id = ?', [userid], function(err, results) {
                if(err){
                    // console.log("err"+err);
                    connection.release();
                    res.status(206).end( "搜索信息失败！");
                    // console.log("搜索信息失败！");
                    return;
                }
                else if(isEmptyObject(results)){
                    connection.release();
                    res.status(206).end( "搜索信息失败！");
                    // console.log("搜索信息失败！");
                    return;
                }
                else{
                    var Information = {
                        userid:results[0]["SCU_id"],
                        username:results[0]["username"],
                        gender:results[0]["gender"],
                        birthday:results[0]["birthday"],
                        sign_up_date:results[0]["sign_up_date"],
                        email:results[0]["email"],
                        headimg:results[0]["headimg"]
                    }
                    res.status(200).json({Information});
                    connection.release();
                    res.status(200).end();
                    // console.log(Information);
                    // req.session.userid = userid;
                    // res.cookie('UserId',userid,{maxAge:24*60*60*1000,httpOnly:true,domain:'sparrowoo.top',signed:true});
                    return;
                }
            });
        });

    }
});
router.post('/Logout',function (req,res) {
    // console.log(req.cookies["UserId"]);
    if(!req.session.user_id && !req.cookies["UserId"]){
        res.status(205).end("Not Login!");
        // console.log("not Login");
        return;
    }
    else{
            var userid = req.session.user_id;
                    req.session.destroy();
                    res.clearCookie("UserId",{domain:"sparrowoo.top",path:"/"});
                    var Information = {
                        "userid":userid,
                        "message":"退出成功"
                    }
                    // console.log("退出："+req.cookies["UserId"]);
                    res.status(200).json({Information});
                    res.status(200).end();
                    // console.log(Information);
                    // req.session.userid = userid;
                    // res.cookie('UserId',userid,{maxAge:24*60*60*1000,httpOnly:true,domain:'sparrowoo.top',signed:true});
                    return;

    }
});
router.post('/PostArticle',function (req,res) {
    // console.log(req.cookies["UserId"]);
    if(!req.session.user_id){
        res.status(205).end("Not Login!");
        // console.log("not Login");
        return;
    }
    else{
            var userid = req.session.user_id;
            var article_header =xss(req.body.article_header);
            var article_abstract = xss(req.body.article_abstract);
            var article_content = xss(req.body.article_content);
            var article_post_time = xss(req.body.article_post_time);
            var if_post_online = xss(req.body.if_post);
            var if_have_img = xss(req.body.if_have_img);
            var FileExt = xss(req.body.FileExt);
            sqlpool.getConnection(function (err, connection) {
                connection.query('SELECT article_id FROM SeeCU_Article ORDER BY cast(article_id as UNSIGNED) DESC LIMIT 1', function(err, results) {
                    if(err){
                        // console.log("err"+err);
                        connection.release();
                        res.status(207).end("发布失败");
                        
                        return;
                    }
                    if(!isEmptyObject(results)){
                        // console.log("MaxId:"+parseInt(results[0]["article_id"]));
                        var article_id = parseInt(results[0]["article_id"])+1;
                        
                    }else{
                        var article_id = 1;
                    }
                    if(if_have_img==1){
                        var article_img = "https://sparrowoo.top:8082/php/article_img/"+userid+"/SeeCU_article_"+userid+"_"+article_id+"."+FileExt;
                    }
                    else{
                        var article_img = "";
                    }
                    connection.query('INSERT INTO SeeCU_Article VALUES (?,?,?,?,?,?,?,?,?,?)',[article_id,userid,article_header,article_content,article_img,article_abstract,if_post_online,article_post_time,0,null], function(err, results) {
                        if(err){
                            // console.log("err:"+err);
                            connection.release();
                            res.status(207).end("发布失败");
                            return;
                        }
                        else{
                            if(if_have_img==1){
                                res.status(200).json({
                                    "message":"发布成功",
                                    "if_have_img":if_have_img,
                                    "article_img":article_img,
                                    "article_id":article_id,
                                    "UserId":userid,
                                });
                                
                            }
                            else{
                                res.status(200).json({
                                    "message":"发布成功",
                                    "if_have_img":if_have_img,
                                    "article_id":article_id,
                                    "UserId":userid,
                                });
                            }
                            connection.release();
                            res.status(200).end();
                            return;
                        }
                    });
                });
            });
            return;

    }
});
function isEmptyObject( obj ) {
    var name;

    for ( name in obj ) {
        return false;
    }
    return true;
}
module.exports = router;
