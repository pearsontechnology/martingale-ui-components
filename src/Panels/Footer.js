import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

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
