import React from 'react';
import Col from '../Grid/Col';
import PanelHeader from './Header';
import PanelFooter from './Footer';
import PanelTitle from './Title';
import PanelInset from './Inset';
import PropTypes from 'prop-types';

const Panel = (props)=>{
  const {
    title,
    header: headerElems,
    children,
    footer: footerElems,
    type = 'default',
    size,
    lg,
    md,
    sm,
    xs,
    inset=false
  } = props;
  const header = title||headerElems?<PanelHeader>{title?<PanelTitle>{title}</PanelTitle>:headerElems}</PanelHeader>:'';
  const footer = footerElems?<PanelFooter>{footerElems}</PanelFooter>:'';
  const colProps = {
    size,
    lg,
    md,
    sm,
    xs,
  };
  return (
    <Col {...colProps}>
      <div className={`panel panel-${type}`}>
        {header}
        {inset?<PanelInset>{children}</PanelInset>:children}
        {footer}
      </div>
    </Col>
  );
};

Panel.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.func,
    PropTypes.array
  ]),
  type: PropTypes.string,
  size: PropTypes.number,
  lg: PropTypes.number,
  md: PropTypes.number,
  sm: PropTypes.number,
  xs: PropTypes.number,
  inset: PropTypes.bool
};

export default Panel;
