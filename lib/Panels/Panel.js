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

/**
 * A panel for displaying a title, icon, and a count.
 * @param {object} props
 * @param {string} props.title - Optional title to be placed on the panel
 * @param {string} props.header - Optional header to be placed on the panel
 * @param {string} props.footer - Optional footer to be placed on the panel
 * @param {string} props.children - Children to be placed inside the panel
 * @param {string} props.type - Color for the container (default, primary, success, info, warning, danger)
 * @param {number} props.size - Size of the panel in column mode if you don't want to specify individual screen sizes
 * @param {number} props.lg - Size of the column when on a large screen
 * @param {number} props.md - Size of the column when on a medium screen
 * @param {number} props.sm - Size of the column when on a small screen
 * @param {number} props.xs - Size of the column when on a extra-small screen
 * @param {boolean} props.inset - Boolean to inset the contents of the panel
 * @param {number} props.maxHeight - Maxium hight in pixels that the panel can grow to
 * @param {object} props.style - Additional styling options
 */

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
  var Wrapper = size || lg || md || sm || xs ? _Col2.default : function (_ref) {
    var children = _ref.children;
    return _react2.default.createElement(
      'div',
      null,
      children
    );
  };
  //<Col {...colProps}>
  return _react2.default.createElement(
    Wrapper,
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
  //</Col>
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
  style: _propTypes2.default.object
};

exports.default = Panel;