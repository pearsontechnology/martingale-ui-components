'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _jsYaml = require('js-yaml');

var _jsYaml2 = _interopRequireDefault(_jsYaml);

var _martingaleUtils = require('martingale-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PrettyYamlView = function PrettyYamlView(_ref) {
  var src = _ref.src,
      _ref$inset = _ref.inset,
      inset = _ref$inset === undefined ? true : _ref$inset;

  var type = (0, _martingaleUtils.betterType)(src);
  var cn = function cn(base) {
    return inset ? base + ' inset' : base;
  };
  switch (type) {
    /*
    case('null'):
      return <span className="null">null</span>;
    case('undefined'):
      return <span className="number">undefined</span>;
    case('string'):
      return <span className="string">{src}</span>;
    case('number'):
      return <span className="number">{src}</span>;
    case('boolean'):
      return <span className="boolean">{src}</span>;
      */
    case 'array':
      var arrMap = src.map(function (value, index) {
        return _react2.default.createElement(
          'li',
          { key: index },
          _react2.default.createElement(PrettyYamlView, { src: value })
        );
      });
      return _react2.default.createElement(
        'ol',
        { className: cn('array') },
        arrMap
      );
    case 'object':
      var keys = Object.keys(src);
      var objMap = keys.map(function (key) {
        var value = src[key];
        return _react2.default.createElement(
          'dl',
          { key: key },
          _react2.default.createElement(
            'dt',
            null,
            key,
            ': '
          ),
          _react2.default.createElement(
            'dd',
            null,
            _react2.default.createElement(PrettyYamlView, { src: value })
          )
        );
      });
      return _react2.default.createElement(
        'div',
        { className: cn('object') },
        objMap
      );
    default:
      return _react2.default.createElement(
        'span',
        { className: cn(type) },
        JSON.stringify(src, null, 2)
      );
  }
};

/**
 * Renders a pretty or YAML.safeDump(src, {indent: 2}) view of data
 * @param {object} props
 * @param {object} props.json - Data to be displayed
 * @param {object} props.data - Data to be displayed
 * @param {boolean} props.pretty - If true then renders a tree like strucutre of the data, if false then renders a pre wrapped JSON.stringify() version of the data
 */

var YamlView = function YamlView(_ref2) {
  var json = _ref2.json,
      data = _ref2.data,
      _ref2$pretty = _ref2.pretty,
      pretty = _ref2$pretty === undefined ? false : _ref2$pretty;

  var src = json || data;
  var view = pretty ? _react2.default.createElement(PrettyYamlView, { src: src, inset: false }) : _react2.default.createElement(
    'pre',
    null,
    _jsYaml2.default.safeDump(src, { indent: 2 })
  );
  return _react2.default.createElement(
    'div',
    { className: 'YamlView' },
    view
  );
};

YamlView.propTypes = {
  json: _propTypes2.default.any,
  data: _propTypes2.default.any,
  pretty: _propTypes2.default.bool
};

exports.default = YamlView;