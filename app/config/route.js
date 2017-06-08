let Home = require('../controllers/home');


module.exports = function(app, redis, es) {
  function addRedis(req, res, next) {
    res.redis = redis;
    next();
  }

  function addEs(req, res, next) {
    res.es = es;
    next()
  }

  app.get('/', Home.index);
  app.get('/api/home', addRedis, Home.home);
  app.get('/api/archives', addRedis, Home.archives);
  app.get('/api/series', addRedis, Home.series);
  app.get('/api/search', addEs, Home.search);
  app.get('/api/post/:link', addRedis, Home.article);
} 