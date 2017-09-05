import React from 'react';
import PropTypes from 'prop-types';

import {
  Link
} from 'react-router-dom';

/**
 * Link to another page
 * @param {object} props
 * @param {object} props.caption - Text to be displayed within the link
 * @param {object} props.children - Children to be wrapped
 * @param {object} props.to - Path to page to link to
 */

const RouterLink = ({caption, children, to, ...props})=>{
  if(typeof(to)==='string'){
    return <Link to={to} {...props}>{caption||children}</Link>;
  }
  return <Link to={to(props)} {...props}>{caption||children}</Link>;
};

RouterLink.propTypes = {
  caption: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.func
  ]),
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  className: PropTypes.string
};

export default RouterLink;
