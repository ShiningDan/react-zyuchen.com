let path = require('path');
let Abstract = require('../models/abstract');
let Article = require('../models/article');
let Series = require('../models/series');
let removeMd = require('remove-markdown');
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
        abstracts: abstracts
      });
  } catch(e) {
    console.log(e);
  }
}

exports.archives = async function(req, res) {
  try {
    let redis = res.redis;
    let abstracts = await redis.lrangeAsync('abstracts', 0, 100).then((values) => values.map((value) => JSON.parse(value)));
    if (abstracts.length === 0) {
      abstracts = await Abstract.find({});
    }
    // let abstracts = await Abstract.find({});  
    let articles = {};
    abstracts.forEach(function(abstract) {
      let date = new Date(abstract.meta.createAt),
      year = date.getFullYear(),
      month = date.getUTCMonth() + 1,
      {link, title} = abstract;
      if (articles[year]) {
        let aYear = articles[year];  //aYear should be an array of months
        if (aYear[month]) {
          let aMonth = aYear[month];  //aMonth should be an array of article info
          aMonth = aMonth.push({
            title: title,
            link: link,
            date: date,
          });
        } else {
          aYear[month] = [{
            title: title,
            link: link,
            date: date,
          }];
        }
      } else {
        articles[year] = {};
        articles[year][month] = [{
          title: title,
          link: link,
          date: date,
        }];
      }
    })
    let articleArray = [];
    for (let i in articles) {
      let years = {};
      years[i] = [];
      articleArray.push(years);
      for (let j in articles[i]) {
        let months = {};
        months[j] = articles[i][j];
        articleArray[articleArray.length-1][i].push(months);
      }
    }
    res.json({
      articles: articleArray,
    })
  } catch(e) {
    console.log(e);
  }
}

exports.series = async function(req, res) {
  try {
    let redis = res.redis;
    let series = await redis.lrangeAsync('series', 0, 100).then((values) => values.map((value) => {
      let s = JSON.parse(value)
      s.articles.map((a) => {
        a.meta.createAt = new Date(a.meta.createAt); 
        return a;
      })
      return s;
    }));
    if (series.length === 0) {
      series = await Series.find({}).populate('articles', ['title', 'link', 'meta.createAt']);
    }
    // let series = await Series.find({}).populate('articles', ['title', 'link', 'meta.createAt']);

    series.forEach(function(s) {
      s.articles = s.articles.sort(function(a, b) {
        return b.meta.createAt - a.meta.createAt;
      });
    });

    res.json({
      series: series,
    });
  } catch(e) {
    console.log(e);
  }
}

exports.search = async function(req, res) {
  try {

    let s = req.query.s;
    let start = 0;
    if (s) {
      res.es.search({
      index : 'articles',
      type : 'article',
      from : start,
      body : {
        query : { 
          dis_max : { 
            queries : [
              {
                match : {
                  title : { 
                    query : s, 
                    minimum_should_match : '50%',
                    boost : 4,
                  }
                } 
              }, {
                match : {
                  content : { 
                    query : s, 
                    minimum_should_match : '75%',
                    boost : 4,
                  }
                } 
              }, {
                match : {
                  categories : { 
                    query : s, 
                    minimum_should_match : '100%',
                    boost : 2,
                  }
                } 
              }, {
                match : {
                  link : { 
                    query : s, 
                    minimum_should_match : '100%',
                    boost : 1,
                  }
                } 
              }
            ],
              tie_breaker : 0.3
            }
          },
          highlight : {
            pre_tags : ['<b>'],
            post_tags : ['</b>'],
            fields : {
              title : {},
              content : {},
            }
          }
        }
      }).then((value) => {
        let reg = /b([\S]{1,20}?)\/b/g;
        let moreReg = /!--more--/g;
        value.hits.hits.map((a) => {
          a.highlight.content = a.highlight.content.map((c) => {
            c = removeMd(c);
            c = c.replace(moreReg, () => "");
            return c.replace(reg, (v, p1) => {
              // console.log(v, p1);
              return '<b>'+p1+'</b>';
            })
          });
          
          // console.log(a.highlight);
          return a;
        })
        
        res.json({
          results: value.hits.hits,
          info: value.hits.total,
        })
      });
    }

  } catch(e) {
    console.log(e);
  }
}