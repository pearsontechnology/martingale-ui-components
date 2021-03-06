'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouterDom = require('react-router-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/**
 * Link to another page
 * @param {object} props
 * @param {object} props.caption - Text to be displayed within the link
 * @param {object} props.children - Children to be wrapped
 * @param {object} props.to - Path to page to link to
 */

var RouterLink = function RouterLink(_ref) {
  var caption = _ref.caption,
      children = _ref.children,
      to = _ref.to,
      props = _objectWithoutProperties(_ref, ['caption', 'children', 'to']);

  if (typeof to === 'string') {
    return _react2.default.createElement(
      _reactRouterDom.Link,
      Object.assign({ to: to }, props),
      caption || children
    );
  }
  return _react2.default.createElement(
    _reactRouterDom.Link,
    Object.assign({ to: to(props) }, props),
    caption || children
  );
};

RouterLink.propTypes = {
  caption: _propTypes2.default.string,
  children: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element, _propTypes2.default.func]),
  to: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]),
  className: _propTypes2.default.string
};

exports.default = RouterLink;