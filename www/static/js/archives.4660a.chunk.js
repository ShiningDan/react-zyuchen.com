webpackJsonp([2],{

/***/ 389:
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

__webpack_require__(397);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Archives = function (_React$PureComponent) {
  _inherits(Archives, _React$PureComponent);

  function Archives(props) {
    _classCallCheck(this, Archives);

    var _this = _possibleConstructorReturn(this, (Archives.__proto__ || Object.getPrototypeOf(Archives)).call(this, props));

    _this.state = {
      articles: []
    };
    return _this;
  }

  _createClass(Archives, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      fetch('/api/archives').then(function (response) {
        return response.json();
      }).then(function (response) {
        _this2.setState({
          articles: response.articles
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { id: 'archives' },
        _react2.default.createElement(GenerateToc, { articles: this.state.articles }),
        _react2.default.createElement(
          'h1',
          null,
          '\u5F52\u6863'
        ),
        _react2.default.createElement(
          'p',
          null,
          '\u672C\u535A\u5BA2\u7CFB\u7EDF\u662F\u81EA\u5DF1\u642D\u5EFA\u7684\u535A\u5BA2\u7CFB\u7EDF\uFF0C\u540E\u53F0\u7CFB\u7EDF\u7528\u7684\u662F ',
          _react2.default.createElement(
            'a',
            { href: 'http://expressjs.com/' },
            'Express JS'
          ),
          '\uFF0C\u524D\u7AEF\u7684\u6837\u5F0F\u53C2\u8003\u4E86 ',
          _react2.default.createElement(
            'a',
            { href: 'https://imququ.com/' },
            '\u5C48\u5C48\u8001\u5E08\u7684\u535A\u5BA2'
          ),
          '\u3002\u9664\u4E86\u6587\u7AE0\u5C55\u793A\u9875\u9762\u4EE5\u5916\uFF0C\u8FD8\u6709\u540E\u53F0\u9875\u9762\u7BA1\u7406\u7CFB\u7EDF\uFF0C\u6587\u7AE0\u7EDF\u8BA1\uFF0C\u641C\u7D22\u7B49\u8F85\u52A9\u529F\u80FD\u3002\u4E4B\u524D\u4F7F\u7528 ',
          _react2.default.createElement(
            'a',
            { href: 'https://hexo.io/' },
            'Hexo'
          ),
          ' \u4F5C\u4E3A\u535A\u5BA2\u7CFB\u7EDF\uFF0C\u4E0A\u9762\u4FDD\u7559\u4E00\u4E9B\u539F\u6765\u7684\u535A\u5BA2\u6587\u7AE0\uFF0C\u6709\u4E00\u4E9B\u4E0D\u91CD\u8981\u7684\u5C31\u6CA1\u6709\u8FC1\u79FB\u8FC7\u6765\u4E86\u3002'
        ),
        _react2.default.createElement(
          'p',
          null,
          '\u5F52\u6863\u90E8\u5206\u6309\u7167\u65F6\u95F4\u987A\u5E8F\u5C55\u793A\u6587\u7AE0\uFF0C\u6587\u7AE0\u8D28\u91CF\u826F\u83A0\u4E0D\u9F50\uFF0C\u65E2\u6709\u60F3\u4E0E\u5927\u5BB6\u5206\u4EAB\u7684\u4E2A\u4EBA\u5FC3\u5F97\uFF0C\u4E5F\u6709\u5E73\u65F6\u5B66\u4E60\u672A\u6574\u7406\u597D\u7684\u603B\u7ED3\u7B14\u8BB0\uFF0C\u5982\u679C\u5927\u5BB6\u60F3\u9009\u62E9\u6027\u9605\u8BFB\u4E00\u4E9B\u6587\u7AE0\uFF0C\u53EF\u4EE5\u70B9\u51FB\u94FE\u63A5\u6765 ',
          _react2.default.createElement(
            'a',
            { href: '/series' },
            '\u4E13\u9898'
          ),
          ' \u67E5\u770B\u3002\u5E0C\u671B\u81EA\u5DF1\u7684\u5728\u8FD9\u4E2A\u6D6E\u8E81\u7684\u65F6\u4EE3\u575A\u6301\u9605\u8BFB\u4E0E\u5199\u4F5C\uFF0C\u4E5F\u975E\u5E38\u611F\u8C22\u5927\u5BB6\u7684\u652F\u6301\u4E0E\u53CD\u9988\u3002'
        ),
        _react2.default.createElement(GenerateArch, { articles: this.state.articles })
      );
    }
  }]);

  return Archives;
}(_react2.default.PureComponent);

exports.default = Archives;


var GenerateToc = function GenerateToc(_ref) {
  var articles = _ref.articles;

  var lis = [];
  for (var i = articles.length - 1; i >= 0; i--) {
    for (var j in articles[i]) {
      lis.push(_react2.default.createElement(
        'li',
        { key: j },
        _react2.default.createElement(
          'a',
          { href: "#toc-" + j },
          j,
          ' \u5E74'
        )
      ));
    }
  }
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
      lis
    )
  );
};

var GenerateArch = function GenerateArch(_ref2) {
  var articles = _ref2.articles;

  var tocs = [];
  for (var i = articles.length - 1; i >= 0; i--) {
    for (var j in articles[i]) {
      var tocmonths = [];
      for (var k = articles[i][j].length - 1; k >= 0; k--) {
        for (var l in articles[i][j][k]) {
          tocmonths.push(_react2.default.createElement(
            'div',
            { key: j + " " + l },
            _react2.default.createElement(
              'h2',
              null,
              j,
              ' \u5E74 ',
              l,
              ' \u6708'
            ),
            _react2.default.createElement(
              'ul',
              null,
              articles[i][j][k][l].map(function (article) {
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
                    (0, _moment2.default)(article.date).format('MMM DD, YYYY')
                  )
                );
              })
            )
          ));
        }
      }
      tocs.push(_react2.default.createElement(
        'div',
        { name: "toc" + j, key: "toc" + j },
        tocmonths
      ));
    }
  }
  return _react2.default.createElement(
    'div',
    null,
    tocs
  );
};

/***/ }),

/***/ 394:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(33)(undefined);
// imports


// module
exports.push([module.i, "#archives {color: #444;line-height: 1.6; word-wrap: break-word; padding-bottom: 20px;}\n#archives h1 {color: #333; font-size: 2rem; font-weight: 400; line-height: 35px;}\n#archives h2 {font-size: 1.4rem;}\n#archives ul{margin-left: 25px;}\n#archives p, #archives h2, #archives ul {margin-top: 15px;}\n#archives a {color: #538ED5;}\n#archives a:hover {text-decoration: underline;}\n#archives #toc {float: right; border: 1px solid #ccc; padding: 10px; max-width: 260px; min-width: 120px; margin: 0 0 15px 20px;}\n#archives #toc ul{ list-style: none; margin-left: 0;}\n#archives #toc li {color: #538ED5; text-align: center;}\n#archives #toc>header{text-align: center; border-bottom: 1px solid #ccc; margin: -6px 0 6px;}\n#archives .time {display: inline-block; font-size: 14px; color: #666; margin-left: 6px}\n@media screen and (max-width: 640px) {\n    #archives #toc {float: none; box-sizing: 100%; max-width: 100%; margin: 0 0 20px;}\n}", ""]);

// exports


/***/ }),

/***/ 397:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(394);
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
		module.hot.accept("!!../../node_modules/css-loader/index.js!./archives.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!./archives.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ })

});