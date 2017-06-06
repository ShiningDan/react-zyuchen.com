let path = require('path');
let Abstract = require('../models/abstract');
let Article = require('../models/article');
let Series = require('../models/series');
let homepageCount = 5;

exports.index = function(req, res) {
  res.sendFile(path.join(__dirname, "../../www/static/html/index.html"));
}

exports.home = async function(req, res) {
  try {
    pageNavPn = {
      prev: "",
      next: "",
    };
    let redis = res.redis;

    let abstracts = await redis.lrangeAsync('abstracts', 0, 100).then((value) => value.reverse().slice(0, homepageCount + 1)).then((values) => values.map((value) => JSON.parse(value)));
      if (abstracts.length === 0) {
        abstracts = await Abstract.find({}).sort({"_id": -1}).limit(homepageCount + 1);
      }
      if (abstracts.length > homepageCount){
        pageNavPn.next = "?gt=" + abstracts[homepageCount-1]._id;
      }
      abstracts = abstracts.slice(0, homepageCount);
      res.json({
        abstracts: abstracts,
        pageNavPn: pageNavPn,
        "pageNav": {
          "prev": pageNavPn.prev === "" ? undefined : "上一页",
          "next": pageNavPn.next === "" ? undefined : "下一页",
          "center": "博客归档"
        }
      });
  } catch(e) {
    console.log(e);
  }
}