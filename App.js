var express = require('express');
var http = require('http');
var https = require('https');
var fs = require('fs');
var mysql = require('mysql');
var DBconfig = require('./nodejs/DBconfig');
var cors = require('cors');
var api = require('./nodejs/api');
var api_data = require('./nodejs/api_data');
var cookieParser = require('cookie-parser');
var session = require('express-session');
const redis = require('redis');
var bodyParser= require('body-parser');
// const RedisStore = require('connect-redis')(session)
// var redisClient = redis.createClient('6379', '127.0.0.1');


//https Setting
//同步读取密钥和签名证书
// var options = {
//    key:fs.readFileSync('path_to_you_key','utf8'),
//    cert:fs.readFileSync('path_to_you_pem','utf8')
//    }

var app = express();
//var httpsServer = https.createServer(options,app);
var httpServer = http.createServer(app);

var sqlpool = mysql.createPool(DBconfig.mysql);
app.use(cookieParser('#12Ac_'));
app.use(bodyParser.json());
//app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
         name: 'SeeCU_session_lg',                // 非常重要，用于区分两个系统的session
         secret: '#12Ac_',
        cookie: {domain: 'sparrowoo.top',signed: true,path: '/',maxAge: 24*60*60*1000 },
         // store: new RedisStore({   // 通过store将session和redis连接
         //    client: redisClient            // 新建一个RedisStore传入redis连接对象
         //   }),
        resave: false,
        saveUninitialized: false
}));
app.use(cors({credentials: true,
   "origin": "*",
   "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
   "Access-Control-Allow-Origin":"*",
   "preflightContinue": false,
   "optionsSuccessStatus": 204
}));

app.use('/user',api);
app.use('/Articles',api_data);
app.use(express.static(__dirname+"/public",{index:"index.html"}));//默认设置首页

function isEmptyObject( obj ) {
   var name;

   for ( name in obj ) {
       return false;
   }
   return true;
}

//https监听8082端口
//httpsServer.listen(8082);
//http监听8081端口
httpServer.listen(8081,'0.0.0.0');
//app.listen(8081,'0.0.0.0');
console.log("访问地址为 http://127.0.1.1:8081");