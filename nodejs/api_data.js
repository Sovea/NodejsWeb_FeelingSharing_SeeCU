var express=require('express');
var mysql = require('mysql');
var DBconfig = require('./DBconfig');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var xss = require('xss');
var bodyParser= require('body-parser');
var router=express.Router();
router.use(cors({credentials: true,
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "Access-Control-Allow-Origin":"*",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
 }));
var sqlpool = mysql.createPool(DBconfig.mysql);
router.get('/Pages',function (req,res) {
    var offset = xss(req.query.offset);
    // console.log("offset"+offset);
    sqlpool.getConnection(function (err, connection) {
    // var userid = req.body.userid;
    // var password = req.body.password;
    connection.query('SELECT COUNT(article_id) FROM SeeCU_Article ', function(err, results) {
        if(err){
            // console.log("err"+err);
            connection.release();
            res.status(208).end("查询失败");
            return;
        }
        else{
            var pages = parseInt(results[0]["COUNT(article_id)"]);
            if(pages<parseInt(offset)){
                res.status(200).json({
                    "data_name":"Nums_Of_Articles",
                    "offset":offset,
                    "pages":1
                });
                connection.release();
                res.status(200).end();
                return;
            }
            res.status(200).json({
                "data_name":"Nums_Of_Articles",
                "offset":offset,
                "pages":Math.ceil(pages/parseInt(offset))
            });
            connection.release();
            res.status(200).end();
            return;
            
        }
    });
});

// }
});
router.get('/Info',function (req,res) {

            sqlpool.getConnection(function (err, connection) {
            // var userid = req.body.userid;
            // var password = req.body.password;
            var page=xss(req.query.page);
            var offset= xss(req.query.offset);
            var query_words = 'SELECT * FROM SeeCU_Article WHERE article_id > '+connection.escape((page-1)*offset)+' LIMIT 20';
            connection.query(query_words, function(err, results) {
                if(err){
                    // console.log("err"+err);
                    connection.release();
                    res.status(208).end("检索失败");
                    return;
                }
                else{
                    var true_results = get_AllowPost_Length(results);
                    res.status(200).json({
                        "GetData":"OK",
                        "results":true_results,
                    });
                    connection.release();
                    res.end('检索成功');
                    return;
                    
                }
            });
        });

    // }
});
router.get('/Read',function (req,res) {

    sqlpool.getConnection(function (err, connection) {
    var article_id= xss(req.query.article_id);
    connection.query('SELECT * FROM SeeCU_Article WHERE article_id = ?', [article_id],function(err, results) {
        if(err){
            // console.log("err"+err);
            res.status(208).end("检索失败");
            connection.release();
            return;
        }
        else{
            var userid = results[0]["SCU_id"];
            connection.query('SELECT username FROM SCUer WHERE SCU_id = ?', [userid],function(err, re_results) {
            if(err){
                // console.log("err"+err);
                connection.release();
                res.status(208).end("检索失败");
                return;
            }
            else{
                var username = re_results[0]["username"];
                res.status(200).json({
                    "GetData":"OK",
                    "results":results[0],
                    "username":username
                });
                connection.release();
                res.end('检索成功');
                return;
            }
            
        });
    }
    });
});

});

router.post('/OnesArticle',function (req,res) {

    sqlpool.getConnection(function (err, connection) {
    var user_id= req.session.user_id;
    connection.query('SELECT * FROM SeeCU_Article WHERE SCU_id = ?', [user_id],function(err, results) {
        if(err){
            // console.log("err"+err);
            res.status(208).end("检索失败");
            connection.release();
            return;
        }
        else{
                res.status(200).json({
                    "GetData":"OK",
                    "results":results,
                    "user_id":user_id
                });
                connection.release();
                res.end('检索成功');
                return;
    }
    });
});

});
router.post('/Delete',function (req,res) {
    if(!req.session.user_id && !req.cookies["UserId"]){
        res.status(205).end("Not Login!");
        // console.log("not Login");
        return;
    }
    var userid = req.session.user_id;
    sqlpool.getConnection(function (err, connection) {
    var article_id=xss(req.body.article_id);
    // console.log("文章id:"+article_id);
    connection.query('DELETE FROM SeeCU_Article WHERE article_id = ? AND SCU_id = ?',[article_id,userid],function(err, results) {
        if(err||isEmptyObject(results)){
            // console.log("err"+err);
            connection.release();
            res.status(209).end("删除失败");
            return;
        }
        else{
            res.status(200).json({
                "DeleData":"OK"
            });
            connection.release();
            res.end('删除成功');
            return;
            
        }
    });
});
});
router.post('/UpdateArticle',function (req,res) {
    // console.log(req.cookies["UserId"]);
    if(!req.session.user_id && !req.cookies["UserId"]){
        res.status(205).end("Not Login!");
        // console.log("not Login");
        return;
    }
    else{
            var userid =req.session.user_id;
            var article_header =xss(req.body.article_header);
            var article_abstract = xss(req.body.article_abstract);
            var article_content = xss(req.body.article_content);
            var article_change_time = xss(req.body.article_change_time);
            var if_post_online = xss(req.body.if_post);
            var if_have_img = xss(req.body.if_have_img);
            var article_id = xss(req.body.article_id);
            var FileExt = xss(req.body.FileExt);
            sqlpool.getConnection(function (err, connection) {
                    if(if_have_img==1){
                        var article_img = "https://sparrowoo.top:8082/php/article_img/"+userid+"/SeeCU_article_"+userid+"_"+article_id+"."+FileExt;
                    }
                    else{
                        var article_img = "";
                    }
                    connection.query('UPDATE SeeCU_Article SET article_header = ? , article_abstract = ? ,article_content = ? , if_post_online = ? , article_img = ? , if_changed = ? , article_change_time = ? WHERE article_id = ?',[article_header,article_abstract,article_content,if_post_online,article_img,1,article_change_time,article_id], function(err, results) {
                        if(err){
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

            return;

    });
}
});
function getJsonLength(jsonData){
    var jsonLength = 0;
    for(var item in jsonData){
       jsonLength++;
    }
    return jsonLength;
}
function get_AllowPost_Length(jsonData){
    var jsonAllow = new Array();
    for(var item in jsonData){
        // console.log("item:"+jsonData[item]["if_post_online"]);

       if(jsonData[item]["if_post_online"]==1){
        jsonAllow.push(jsonData[item]);
       }
    }
    return jsonAllow;
}
function isEmptyObject( obj ) {
    var name;

    for ( name in obj ) {
        return false;
    }
    return true;
}
module.exports = router;
