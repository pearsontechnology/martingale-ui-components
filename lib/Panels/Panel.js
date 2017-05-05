'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Panel$propTypes;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Grid = require('../Grid');

var _Header = require('./Header');

var _Header2 = _interopRequireDefault(_Header);

var _Footer = require('./Footer');

var _Footer2 = _interopRequireDefault(_Footer);

var _Title = require('./Title');

var _Title2 = _interopRequireDefault(_Title);

var _Inset = require('./Inset');

var _Inset2 = _interopRequireDefault(_Inset);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Panel = function Panel(props) {
  var title = props.title,
      headerElems = props.header,
      children = props.children,
      footerElems = props.footer,
      _props$type = props.type,
      type = _props$type === undefined ? 'default' : _props$type,
      size = props.size,
      lg = props.lg,
      md = props.md,
      sm = props.sm,
      xs = props.xs,
      _props$inset = props.inset,
      inset = _props$inset === undefined ? false : _props$inset;

  var header = title || headerElems ? _react2.default.createElement(
    _Header2.default,
    null,
    title ? _react2.default.createElement(
      _Title2.default,
      null,
      title
    ) : headerElems
  ) : '';
  var footer = footerElems ? _react2.default.createElement(
    _Footer2.default,
    null,
    footerElems
  ) : '';
  var colProps = {
    size: size,
    lg: lg,
    md: md,
    sm: sm,
    xs: xs
  };
  return _react2.default.createElement(
    _Grid.Col,
    colProps,
    _react2.default.createElement(
      'div',
      { className: 'panel panel-' + type },
      header,
      inset ? _react2.default.createElement(
        _Inset2.default,
        null,
        children
      ) : children,
      footer
    )
  );
};

Panel.propTypes = (_Panel$propTypes = {
  title: _propTypes2.default.string,
  children: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element, _propTypes2.default.func])
}, _defineProperty(_Panel$propTypes, 'children', _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element, _propTypes2.default.func])), _defineProperty(_Panel$propTypes, 'children', _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element, _propTypes2.default.func])), _defineProperty(_Panel$propTypes, 'type', _propTypes2.default.string), _defineProperty(_Panel$propTypes, 'size', _propTypes2.default.number), _defineProperty(_Panel$propTypes, 'lg', _propTypes2.default.number), _defineProperty(_Panel$propTypes, 'md', _propTypes2.default.number), _defineProperty(_Panel$propTypes, 'sm', _propTypes2.default.number), _defineProperty(_Panel$propTypes, 'xs', _propTypes2.default.number), _defineProperty(_Panel$propTypes, 'inset', _propTypes2.default.boolean), _Panel$propTypes);

exports.default = Panel;