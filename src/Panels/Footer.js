import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

/**
 * A footer that can be placed within a panel
 * @param {object} props
 * @param {string} props.className - Additional class names to apply to the container
 * @param {object} props.Component - Component to be placed within the panel footer
 * @param {object} props.children - Children to be placed within the panel footer
 */
const PanelFooter = (props)=>{
  const {
    className = '',
    Component,
    children,
    ...rest
  } = props;
  const contents = Component?<Component {...rest} />:children;
  return (
    <div className={classnames('panel-footer', ...className.split(/[ \t]+/))}>
      {contents}
      <div className="clearfix"></div>
    </div>
  );
};

PanelFooter.propTypes={
  className: PropTypes.string,
  Component: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.func
  ]),
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.func,
    PropTypes.array
  ])
};

export default PanelFooter;
