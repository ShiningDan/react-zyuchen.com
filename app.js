let express = require('express');
let path = require('path');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');  
let cookieParser = require('cookie-parser');
let session = require('express-session');                   
let mongoStore = require('connect-mongo')(session);    
let favicon = require('serve-favicon');
let redis = require('redis');
let bluebird = require('bluebird');
let elasticsearch = require('elasticsearch');


let port = process.env.PORT || 8000;
let dbUrl = 'mongodb://127.0.0.1:27017/blog';
mongoose.Promise = global.Promise;
mongoose.connect(dbUrl);

// connect redis
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);
let redisClient = redis.createClient({
  host : 'localhost', 
  port : 6379
});
redisClient.on("error", function(err) {
  console.error("Error connecting to redis", err);
});

//connect elasticsearch
let esClient = new elasticsearch.Client({
  host: 'localhost:9200',
  // log: 'trace',
});


let app = express();

app.use(express.static(path.join(__dirname, './www/static'), {
  maxAge: '365d',
})); // 将 ./www/static 添加到静态资源目录中
app.use(bodyParser.urlencoded({extended: true}));          // 查看 body-parser 的配置
app.use(favicon(__dirname + '/www/static/img/favicon.ico'));
app.use(cookieParser());
app.use(session({
  secret: 'zyc',
  resave: false,
  saveUninitialized: true,
  store: new mongoStore({
      url: dbUrl,
      collection: 'sessions',
  }),
}))


app.listen(port);

require('./app/config/route')(app, redisClient, esClient);