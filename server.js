var express = require('express')
  , http = require('http')
  , path = require('path')
  , bodyParser = require('body-parser')
  , cookieParser = require('cookie-parser')
  , expressSession = require('express-session')
  , mysql = require('mysql');
  // mysql config
  var mysqlClient = mysql.createConnection({
    host: 'myproject.cpylkksl9brd.ap-northeast-2.rds.amazonaws.com',
  	user:'jumpegg',
  	password: 'fly19354',
  	database : 'studytest'
  });

var app = express();

// 속성 설정
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// 미들웨어 사용 설정
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.engine('html', require('ejs').renderFile);

app.use('/public', express.static(__dirname + '/public'));
app.use('/client', express.static(__dirname + '/client'));
app.use('/templete', express.static(__dirname + '/templete'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

// route 설정
var routes = require('./routes/index')(app);
var todos = require('./routes/todos')(app, mysqlClient);

// 서버 실행
var server = app.listen(3000, function(){
  console.log('server running');
});
