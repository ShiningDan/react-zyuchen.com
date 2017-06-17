webpackJsonp([0],{

/***/ 390:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(6);

var _react2 = _interopRequireDefault(_react);

var _pageNav = __webpack_require__(394);

var _pageNav2 = _interopRequireDefault(_pageNav);

var _moment = __webpack_require__(0);

var _moment2 = _interopRequireDefault(_moment);

var _reactRouterDom = __webpack_require__(26);

__webpack_require__(401);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var article = function (_React$PureComponent) {
  _inherits(article, _React$PureComponent);

  function article(props) {
    _classCallCheck(this, article);

    var _this = _possibleConstructorReturn(this, (article.__proto__ || Object.getPrototypeOf(article)).call(this, props));

    _this.state = {
      link: "",
      article: null,
      content: null,
      series: null,
      pageNav: null,
      pageNavPn: null,
      onscrollF: undefined
    };
    return _this;
  }

  _createClass(article, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      var link = nextProps.match.url;
      if (this.state.link !== link) {
        fetch('/api' + link).then(function (response) {
          return response.json();
        }).then(function (response) {
          _this2.setState({
            link: link,
            content: response.content,
            article: response.article,
            series: response.series,
            pageNav: response.pageNav,
            pageNavPn: response.pageNavPn
          }, function () {
            document.body.scrollTop = 0;
            var images = document.getElementsByTagName('img');
            // let comments = document.getElementById('comments');
            // let lazyloadDOM = Array.from(images).concat(comments);
            var lazyloadDOM = Array.from(images);
            var lazyLoadF = _this2.onscorllF(lazyloadDOM);
            _this2.setState({
              onscorllF: lazyLoadF
            }, function () {
              // document.addEventListener('scroll', this.state.onscrollF);
              document.onscroll = lazyLoadF;
            });
          });
        });
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this3 = this;

      var link = this.props.match.url;
      if (this.state.link !== link) {
        fetch('/api' + link).then(function (response) {
          return response.json();
        }).then(function (response) {
          _this3.setState({
            link: link,
            content: response.content,
            article: response.article,
            series: response.series,
            pageNav: response.pageNav,
            pageNavPn: response.pageNavPn
          }, function () {
            var images = document.getElementsByTagName('img');
            // let comments = document.getElementById('comments');
            // let lazyloadDOM = Array.from(images).concat(comments);
            var lazyloadDOM = Array.from(images);

            var lazyLoadF = _this3.onscorllF(lazyloadDOM);
            _this3.setState({
              onscrollF: lazyLoadF
            }, function () {
              // document.addEventListener('scroll', this.state.onscrollF);
              document.onscroll = lazyLoadF;
            }

            // add toc redirect solution
            );var tocA = document.getElementById('toc').getElementsByTagName('a');
            for (var i = 0; i < tocA.length; i++) {
              tocA.item(i).addEventListener('click', function (event) {
                event.preventDefault();
              });
            }
            document.getElementById('toc').addEventListener('click', function (event) {
              console.log(event.target);
            });
          });
        });
      }
    }
  }, {
    key: 'onscorllF',
    value: function onscorllF(lazyloadDOM) {
      return function (event) {
        // should receive lazyloadDOM
        var scrollTop = window.scrollY;
        var innerHeight = window.innerHeight;
        var scrollBottomHeight = scrollTop + innerHeight;
        for (var i = 0; i < lazyloadDOM.length; i++) {
          var dom = lazyloadDOM[i];
          if (dom.offsetTop < scrollBottomHeight + 300) {
            var src = dom.getAttribute('data-src');
            if (src) {
              dom.setAttribute('src', src);
            }
            var className = dom.getAttribute('class');
            if (className) {
              className += ' load';
            } else {
              className = 'load';
            }
            dom.setAttribute('class', className);
            lazyloadDOM.splice(i, 1);
            i = 0;
            if (lazyloadDOM.length === 0) {
              // document.removeEventListener('scroll', this.state.onscrollF);
              document.onscroll = null;
            }
          } else {
            break;
          }
        }
        if (lazyloadDOM.length === 0) {
          // document.removeEventListener('scroll', this.state.onscrollF);
          document.onscroll = null;
        }
      };
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      // console.log('unmount', this.state.onscrollF);
      // document.removeEventListener('scroll', this.state.onscrollF);
      document.onscroll = null;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { id: 'article' },
        _react2.default.createElement(GenerateArticle, { article: this.state.article, content: this.state.content }),
        _react2.default.createElement(GenerateSeries, { series: this.state.series, article: this.state.article }),
        _react2.default.createElement(_pageNav2.default, { pageNav: this.state.pageNav, pageNavPn: this.state.pageNavPn })
      );
    }
  }]);

  return article;
}(_react2.default.PureComponent);

exports.default = article;


var GenerateArticle = function GenerateArticle(_ref) {
  var article = _ref.article,
      content = _ref.content;

  if (article === null) {
    return null;
  } else {
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement('div', { dangerouslySetInnerHTML: { __html: content } }),
      _react2.default.createElement(
        'div',
        { className: 'eof' },
        '--EOF--'
      ),
      _react2.default.createElement(
        'div',
        { className: 'post-info' },
        '\u53D1\u8868\u4E8E',
        _react2.default.createElement(
          'span',
          { className: 'time' },
          (0, _moment2.default)(article.meta.createAt).format('YYYY-MM-DD')
        ),
        '\u5E76\u88AB\u6DFB\u52A0\u300C',
        _react2.default.createElement(
          'span',
          null,
          article.categories.map(function (cate, index) {
            return _react2.default.createElement(
              'span',
              { className: 'tag', key: cate },
              _react2.default.createElement(
                _reactRouterDom.Link,
                { to: '/search' },
                cate
              )
            );
          })
        ),
        '\u300D\u6807\u7B7E\uFF0C\u6700\u540E\u4FEE\u6539\u4E8E',
        _react2.default.createElement(
          'span',
          { className: 'time' },
          (0, _moment2.default)(article.meta.updateAt).format('YYYY-MM-DD')
        )
      )
    );
  }
};

var GenerateSeries = function GenerateSeries(_ref2) {
  var series = _ref2.series,
      article = _ref2.article;

  if (series) {
    return _react2.default.createElement(
      'div',
      { id: 'arti-series' },
      _react2.default.createElement(
        'h3',
        { className: 'series-info' },
        '\u4E13\u9898\u300C',
        article.series[0],
        '\u300D\u76F8\u5173\u7684\u5176\u4ED6\u6587\u7AE0 ',
        _react2.default.createElement(_reactRouterDom.Link, { to: '/series' }),
        ' \xBB '
      ),
      _react2.default.createElement(
        'ul',
        { className: 'series-ul' },
        series.articles.map(function (i) {
          return _react2.default.createElement(
            'li',
            { key: i.title },
            _react2.default.createElement(
              _reactRouterDom.Link,
              { to: i.link },
              i.title
            ),
            _react2.default.createElement(
              'span',
              { className: 'time' },
              (0, _moment2.default)(i.meta.createAt).format('MMM DD, YYYY')
            )
          );
        })
      )
    );
  } else {
    return null;
  }
};

/***/ }),

/***/ 394:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(6);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(26);

__webpack_require__(402);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PageNav = function (_React$PureComponent) {
  _inherits(PageNav, _React$PureComponent);

  function PageNav() {
    _classCallCheck(this, PageNav);

    return _possibleConstructorReturn(this, (PageNav.__proto__ || Object.getPrototypeOf(PageNav)).apply(this, arguments));
  }

  _createClass(PageNav, [{
    key: 'render',
    value: function render() {
      if (this.props.pageNav) {
        return _react2.default.createElement(
          'nav',
          { id: 'page-nav' },
          _react2.default.createElement(
            _reactRouterDom.Link,
            { to: this.props.pageNavPn.prev, className: 'prev' },
            this.props.pageNav.prev
          ),
          _react2.default.createElement(
            _reactRouterDom.Link,
            { to: this.props.pageNavPn.next, className: 'next' },
            this.props.pageNav.next
          ),
          _react2.default.createElement(
            'div',
            { className: 'center' },
            _react2.default.createElement(
              _reactRouterDom.Link,
              { to: '/archives' },
              this.props.pageNav.center
            )
          )
        );
      } else {
        return _react2.default.createElement('nav', { id: 'page-nav' });
      }
    }
  }]);

  return PageNav;
}(_react2.default.PureComponent);

exports.default = PageNav;

/***/ }),

/***/ 396:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(33)(undefined);
// imports


// module
exports.push([module.i, "#article {color: #444; line-height: 1.6; word-wrap: break-word;}\n#article .load{height: auto!important;}\n#article h1 {color: #333; font-size: 2rem; font-weight: 400; line-height: 35px;}\n#article h2 {font-size: 1.6rem;}\n#article h3 {font-size: 1.4rem;}\n#article h4 {font-size: 1.1rem;}\n#article h5, #article h6 {font-size: 1.0rem;}\n#article ol, #article ul, #article dl {margin-left: 25px;}\n#article li {font-size: 96%;}\n#article p, #article h2, #article h3, #article h4, #article h5, #article h6, #article ol, #article ul, #article dl, #conent blockquote, #article pre  {margin-top: 15px;}\n#article a {color: #538ED5;}\n#article a:hover {text-decoration: underline;}\n#article pre {background-color: #f8f8f8; border-left: 5px solid #ccc; color: #666; font-size: 14px; line-height: 1.6; overflow: hidden; padding: 0.6rem; position: relative; white-space: pre-wrap; word-break: break-word; word-wrap: break-word;}\n#article code {background-color: #eee; border-radius: 5px;font-size: 90%; margin: 0 2px; padding: 2px 5px; vertical-align: middle;}\n#article pre code {background-color: transparent; border-radius: 0; font-size: 100%; margin: 0; padding: 0;}\n#article img {border: 1px solid #ccc; display: block; margin: 10px 5px; max-width: 96%;}\n#article .eof{margin-top: 20px;}\n#article .post-info {margin-top: 20px; font-size: 14px;}\n#article span.time {color: #999; margin: 0 4px;}\n#article .tag a{text-decoration: none;}\n#article .tag:after {content: '\\3001';}\n#article .tag:last-child:after {content: '';}\n#article .series-info a {text-decoration: none;font-size: 14px;margin-left: 4px;}\n#article .series-ul .time {font-size: 14px;margin-left: 10px;}\n#article #comments {margin-top: 20px; padding-top: 20px; border-top: 1px solid #ccc;}\n#article #toc {float: right; border: 1px solid #ccc; padding: 10px; max-width: 260px; min-width: 120px; margin: 0 0 15px 20px;}\n#article #toc ul{margin-left: 14px;}\n#article #toc>header{text-align: center; border-bottom: 1px solid #ccc; margin: -6px 0 6px;}\n@media screen and (max-width: 640px) {\n    #article  #toc {float: none; box-sizing: 100%; max-width: 100%; margin: 0 0 20px;}\n}", ""]);

// exports


/***/ }),

/***/ 397:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(33)(undefined);
// imports


// module
exports.push([module.i, "#page-nav { margin-top: 20px; color: #538ED5; border-top: 1px solid #ccc; padding-top: 20px;overflow: hidden;}\n.prev {float: left; text-decoration: none; color: #538ED5;}\n.next {float: right; text-decoration: none; color: #538ED5;}\n.center {margin: 0 auto; text-align: center;width: 80px;}\n.center a {color: #538ED5;}", ""]);

// exports


/***/ }),

/***/ 401:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(396);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(34)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!./article.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!./article.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 402:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(397);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(34)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!./page-nav.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!./page-nav.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ })

});