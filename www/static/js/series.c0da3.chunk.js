webpackJsonp([1],{

/***/ 393:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(6);

var _react2 = _interopRequireDefault(_react);

var _moment = __webpack_require__(0);

var _moment2 = _interopRequireDefault(_moment);

var _reactRouterDom = __webpack_require__(26);

__webpack_require__(404);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Series = function (_React$PureComponent) {
  _inherits(Series, _React$PureComponent);

  function Series(props) {
    _classCallCheck(this, Series);

    var _this = _possibleConstructorReturn(this, (Series.__proto__ || Object.getPrototypeOf(Series)).call(this, props));

    _this.state = {
      series: []
    };
    return _this;
  }

  _createClass(Series, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      fetch('/api/series').then(function (Response) {
        return Response.json();
      }).then(function (response) {
        _this2.setState({
          series: response.series
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { id: 'series' },
        _react2.default.createElement(GenerateToc, { series: this.state.series }),
        _react2.default.createElement(
          'h1',
          null,
          '\u4E13\u9898'
        ),
        _react2.default.createElement(
          'p',
          null,
          '\u8FD9\u91CC\u662F\u535A\u5BA2\u7684\u4E13\u9898\u90E8\u5206\uFF0C\u5C06\u7B14\u8005\u5E73\u65F6\u7684\u603B\u7ED3\u6587\u7AE0\u6309\u7167\u4E13\u9898\u8FDB\u884C\u5982\u4E0B\u7684\u533A\u5206\u3002\u4F46\u662F\u4E13\u9898\u90E8\u5206\u4E2D\u6536\u5F55\u7684\u5E76\u4E0D\u662F\u6240\u6709\u7684\u6587\u7AE0\uFF0C\u5982\u679C\u60F3\u67E5\u770B\u6240\u6709\u7684\u6587\u7AE0\uFF0C\u53EF\u4EE5\u70B9\u51FB',
          _react2.default.createElement(
            _reactRouterDom.Link,
            { to: '/archives' },
            ' \u5F52\u6863 '
          ),
          '\u6309\u7167\u65F6\u95F4\u987A\u5E8F\u6D4F\u89C8\u3002'
        ),
        _react2.default.createElement(GenerateSeries, { serieses: this.state.series })
      );
    }
  }]);

  return Series;
}(_react2.default.PureComponent);

exports.default = Series;


var GenerateSeries = function GenerateSeries(_ref) {
  var serieses = _ref.serieses;

  var series = [];
  serieses.forEach(function (s, index) {
    series.push(_react2.default.createElement(
      'div',
      { key: "toc-" + index },
      _react2.default.createElement(
        'h2',
        { name: "toc-" + index },
        s.name
      ),
      _react2.default.createElement(
        'ul',
        null,
        s.articles.map(function (article) {
          return _react2.default.createElement(
            'li',
            { key: article.link },
            _react2.default.createElement(
              _reactRouterDom.Link,
              { to: article.link },
              article.title
            ),
            _react2.default.createElement(
              'div',
              { className: 'time' },
              (0, _moment2.default)(article.meta.createAt).format('MMM DD, YYYY')
            )
          );
        })
      )
    ));
  }, undefined);
  return _react2.default.createElement(
    'div',
    null,
    series
  );
};

var GenerateToc = function GenerateToc(_ref2) {
  var series = _ref2.series;

  return _react2.default.createElement(
    'div',
    { id: 'toc' },
    _react2.default.createElement(
      'header',
      null,
      '\u5E74\u4EFD\u5217\u8868'
    ),
    _react2.default.createElement(
      'ul',
      null,
      series.map(function (s, index) {
        return _react2.default.createElement(
          'li',
          { key: "#toc" + index },
          _react2.default.createElement(
            'a',
            { href: "#toc" + index },
            s.name
          )
        );
      })
    )
  );
};

/***/ }),

/***/ 399:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(33)(undefined);
// imports


// module
exports.push([module.i, "#series {color: #444; line-height: 1.6; word-wrap: break-word; padding-bottom: 20px;}\n#series h1 {color: #333; font-size: 2rem; font-weight: 400; line-height: 35px;}\n#series h2 {font-size: 1.4rem;}\n#series ul{margin-left: 25px;}\n#series p, #series h2, #series ul {margin-top: 15px;}\n#series a {color: #538ED5;}\n#series a:hover {text-decoration: underline;}\n#series #toc {float: right; border: 1px solid #ccc; padding: 10px; max-width: 260px; min-width: 120px; margin: 0 0 15px 20px;}\n#series #toc ul{list-style: none; margin-left: 0;}\n#series #toc li {color: #538ED5; text-align: center;}\n#series #toc>header{text-align: center; border-bottom: 1px solid #ccc; margin: -6px 0 6px;}\n#series .time {display: inline-block; font-size: 14px; color: #666; margin-left: 6px}\n@media screen and (max-width: 640px) {\n    #series #toc {float: none; box-sizing: 100%; max-width: 100%; margin: 0 0 20px;}\n}", ""]);

// exports


/***/ }),

/***/ 404:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(399);
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
		module.hot.accept("!!../../node_modules/css-loader/index.js!./series.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!./series.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ })

});