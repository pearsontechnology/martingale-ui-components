'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A panel for displaying a title within a panel
 * @param {object} props
 * @param {string} props.title - The title
 * @param {object} props.children - Children to be placed within the title
 */

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