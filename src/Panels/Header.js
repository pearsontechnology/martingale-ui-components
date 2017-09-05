import React from 'react';
import PropTypes from 'prop-types';

/**
 * A header area that can be placed within a panel
 * @param {object} props
 * @param {object} props.children - Children to be placed within the panel header
 */
const PanelHeader = (props)=>{
  const {
    children
  } = props;

  return (
    <div className="panel-heading">
      {children}
    </div>
  );
};

PanelHeader.propTypes={
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.func,
    PropTypes.array
  ])
};

export default PanelHeader;
