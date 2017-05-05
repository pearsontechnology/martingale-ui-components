import React from 'react';
import PropTypes from 'prop-types';

import {
  Link
} from 'react-router-dom';

const RouterLink = ({caption, children, ...props})=><Link {...props}>{caption||children}</Link>;

RouterLink.propTypes = {
  caption: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.func
  ]),
  to: PropTypes.string,
  className: PropTypes.string
};

export default RouterLink;
