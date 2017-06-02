import React from 'react';
import PropTypes from 'prop-types';

import {
  Link
} from 'react-router-dom';

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
