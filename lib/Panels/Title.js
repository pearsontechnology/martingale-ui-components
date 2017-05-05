'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PanelHeader = function PanelHeader(props) {
  var title = props.title,
      children = props.children;

  var contents = title ? title : children;

  return _react2.default.createElement(
    'h3',
    { className: 'panel-title' },
    contents
  );
};

PanelHeader.propTypes = {
  title: _propTypes2.default.string,
  children: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element, _propTypes2.default.func])
};

exports.default = PanelHeader;