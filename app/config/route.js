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
  app.get('/home', addRedis, Home.home);
  app.get('/archives', addRedis, Home.archives);
  app.get('/series', addRedis, Home.series);
} 