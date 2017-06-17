webpackJsonp([1],{

/***/ 392:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(6);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(26);

__webpack_require__(398);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Search = function (_React$PureComponent) {
  _inherits(Search, _React$PureComponent);

  function Search(props) {
    _classCallCheck(this, Search);

    var _this = _possibleConstructorReturn(this, (Search.__proto__ || Object.getPrototypeOf(Search)).call(this, props));

    _this.state = {
      info: undefined,
      keyword: undefined,
      results: []
    };

    _this.onClickHandle = _this.onClickHandle.bind(_this);
    return _this;
  }

  _createClass(Search, [{
    key: 'onClickHandle',
    value: function onClickHandle(event) {
      var _this2 = this;

      event.preventDefault();
      var value = document.getElementById('keyword').value.split(' ').join('+');
      fetch('/api/search?s=' + value).then(function (response) {
        return response.json();
      }).then(function (response) {
        _this2.setState({
          results: response.results,
          info: response.info
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'h1',
          null,
          '\u7AD9\u5185\u641C\u7D22'
        ),
        _react2.default.createElement(
          'div',
          { id: 'search' },
          _react2.default.createElement(
            'div',
            { id: 'search-wrapper' },
            _react2.default.createElement(
              'div',
              { id: 'keyword-wrapper' },
              _react2.default.createElement('input', { type: 'search', id: 'keyword', maxLength: '80', placeholder: '\u8BF7\u8F93\u5165\u5173\u952E\u5B57...', name: 's', required: 'true' })
            ),
            _react2.default.createElement('input', { type: 'submit', id: 'submit', onClick: this.onClickHandle })
          )
        ),
        _react2.default.createElement(GenerateResult, { results: this.state.results, info: this.state.info })
      );
    }
  }]);

  return Search;
}(_react2.default.PureComponent);

exports.default = Search;


var GenerateResult = function GenerateResult(_ref) {
  var results = _ref.results,
      info = _ref.info;


  if (results.length > 0) {
    return _react2.default.createElement(
      'div',
      { id: 'searchResult' },
      _react2.default.createElement(
        'div',
        { id: 'searchInfo' },
        '\u672C\u6B21\u641C\u7D22\u5171\u627E\u5230\u7ED3\u679C ',
        info,
        ' \u6761'
      ),
      results.map(function (result) {
        return _react2.default.createElement(
          'div',
          { className: 'searchItem', key: result._source.link },
          result.highlight.title ? _react2.default.createElement(_reactRouterDom.Link, { to: "/post/" + result._source.link, className: 'searchTitle', dangerouslySetInnerHTML: { __html: result.highlight.title } }) : _react2.default.createElement(_reactRouterDom.Link, { to: "/post/" + result._source.link, className: 'searchTitle', dangerouslySetInnerHTML: { __html: result._source.title } }),
          _react2.default.createElement('div', { className: 'searchContent', dangerouslySetInnerHTML: { __html: result.highlight.content.join(' ... ') } })
        );
      })
    );
  } else {
    return null;
  }
};

/***/ }),

/***/ 395:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(33)(undefined);
// imports


// module
exports.push([module.i, "#content {color: #444; line-height: 1.6; word-wrap: break-word;}\n#content h1 {color: #333; font-size: 2rem; font-weight: 400; line-height: 35px;}\n#search{margin-top: 26px; position: relative;}\n#keyword-wrapper {margin-right: 72px;}\n#keyword {border: 1px solid #bbb; height: 40px; padding: 4px 6px;width: 100%;border-right: 0;font-size: 16px;}\n#submit {background-color: #e7e7e7;border: 1px solid #bbb; width: 72px; height: 40px; border-radius: 0;position: absolute; top: 0; right: 0;font-size: 16px;}\n#searchInfo {padding: 16px 0; border-bottom: 1px solid #ddd; font-size: 13px; color: #676767}\n.searchItem {padding: 10px 0 20px; border-bottom: 1px solid #ddd; }\n.searchTitle {color: #538ED5; font-weight: normal;font-size: 18px;margin: 6px 0}\n.searchTitle b{color: #C00;font-weight: normal;}\n.searchContent {line-height: 22px; max-height: 88px; font-size: 14px; overflow: hidden}\n.searchContent b{color: #C00;font-weight: normal;}", ""]);

// exports


/***/ }),

/***/ 398:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(395);
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
		module.hot.accept("!!../../node_modules/css-loader/index.js!./search.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!./search.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ })

});