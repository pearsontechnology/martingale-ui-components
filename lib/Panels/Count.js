'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Col = require('../Grid/Col');

var _Col2 = _interopRequireDefault(_Col);

var _Row = require('../Grid/Row');

var _Row2 = _interopRequireDefault(_Row);

var _Footer = require('./Footer');

var _Footer2 = _interopRequireDefault(_Footer);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var iconWrapper = function iconWrapper(_ref) {
  var icon = _ref.icon,
      size = _ref.size;
  return _react2.default.createElement(icon, { size: size });
};

var CountPanel = function CountPanel(props) {
  var _props$className = props.className,
      addlClasses = _props$className === undefined ? '' : _props$className,
      count = props.count,
      _props$color = props.color,
      color = _props$color === undefined ? 'primary' : _props$color,
      _props$link = props.link,
      link = _props$link === undefined ? '#' : _props$link,
      title = props.title,
      _props$more = props.more,
      more = _props$more === undefined ? 'View Details' : _props$more,
      Icon = props.Icon;

  var className = _classnames2.default.apply(undefined, ['panel', 'panel-' + color].concat(_toConsumableArray(addlClasses.split(/[ \t]+/))));
  var smallIcon = _react2.default.createElement(Icon, null);
  var largeIcon = _react2.default.createElement(Icon, { size: 64 });

  return _react2.default.createElement(
    _Col2.default,
    { lg: 3, md: 6 },
    _react2.default.createElement(
      'div',
      { className: className },
      _react2.default.createElement(
        'div',
        { className: 'panel-heading' },
        _react2.default.createElement(
          _Row2.default,
          null,
          _react2.default.createElement(
            _Col2.default,
            { xs: 3 },
            largeIcon
          ),
          _react2.default.createElement(
            _Col2.default,
            { xs: 9, className: 'text-right' },
            _react2.default.createElement(
              'div',
              { className: 'huge' },
              count
            ),
            _react2.default.createElement(
              'div',
              null,
              title
            )
          )
        )
      ),
      _react2.default.createElement(
        'a',
        { href: link },
        _react2.default.createElement(
          _Footer2.default,
          null,
          _react2.default.createElement(
            'span',
            { className: 'pull-left' },
            more
          ),
          _react2.default.createElement(
            'span',
            { className: 'pull-right' },
            smallIcon
          ),
          _react2.default.createElement('div', { className: 'clearfix' })
        )
      )
    )
  );
};

_Footer2.default.propTypes = {
  className: _propTypes2.default.string,
  color: _propTypes2.default.string,
  count: _propTypes2.default.number,
  link: _propTypes2.default.string,
  title: _propTypes2.default.string,
  more: _propTypes2.default.string,
  icon: _propTypes2.default.func,
  children: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element, _propTypes2.default.func, _propTypes2.default.array])
};

exports.default = CountPanel;