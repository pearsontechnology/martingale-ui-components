'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Col = require('../Grid/Col');

var _Col2 = _interopRequireDefault(_Col);

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
      inset = _props$inset === undefined ? false : _props$inset,
      maxHeight = props.maxHeight,
      _props$style = props.style,
      style = _props$style === undefined ? {} : _props$style;

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
  if (maxHeight) {
    style.maxHeight = maxHeight;
    style.overflow = style.overflow || 'auto';
  }
  return _react2.default.createElement(
    _Col2.default,
    colProps,
    _react2.default.createElement(
      'div',
      { className: 'panel panel-' + type },
      header,
      _react2.default.createElement(
        'div',
        { style: style },
        inset ? _react2.default.createElement(
          _Inset2.default,
          null,
          children
        ) : children
      ),
      footer
    )
  );
};

Panel.propTypes = {
  title: _propTypes2.default.string,
  children: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element, _propTypes2.default.func, _propTypes2.default.array]),
  type: _propTypes2.default.string,
  size: _propTypes2.default.number,
  lg: _propTypes2.default.number,
  md: _propTypes2.default.number,
  sm: _propTypes2.default.number,
  xs: _propTypes2.default.number,
  inset: _propTypes2.default.bool,
  maxHeight: _propTypes2.default.number,
  style: _propTypes2.default.obj
};

exports.default = Panel;