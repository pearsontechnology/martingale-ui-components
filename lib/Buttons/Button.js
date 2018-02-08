'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouterDom = require('react-router-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/**
 * Generates an HTML Button
 * @name Button
 */
var _UiButton = function _UiButton(props) {
  var children = props.children,
      btnStyle = props.btnStyle,
      match = props.match,
      location = props.location,
      history = props.history,
      staticContext = props.staticContext,
      onClick = props.onClick,
      _props$disabled = props.disabled,
      isDisabled = _props$disabled === undefined ? false : _props$disabled,
      args = _objectWithoutProperties(props, ['children', 'btnStyle', 'match', 'location', 'history', 'staticContext', 'onClick', 'disabled']);

  var clickHandler = function clickHandler(e) {
    if (onClick) {
      onClick.bind({
        props: {
          match: match,
          location: location,
          history: history
        }
      })(e);
    }
  };
  var disabled = typeof isDisabled === 'function' ? isDisabled(props) : isDisabled;
  return _react2.default.createElement(
    _reactBootstrap.Button,
    Object.assign({ bsStyle: btnStyle, onClick: clickHandler }, args, { disabled: disabled }),
    children
  );
};

var UiButton = (0, _reactRouterDom.withRouter)(_UiButton);

UiButton.propTypes = {
  btnStyle: _propTypes2.default.string,
  children: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element, _propTypes2.default.func, _propTypes2.default.array])
};

exports.default = UiButton;