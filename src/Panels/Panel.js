import React from 'react';
import Col from '../Grid/Col';
import PanelHeader from './Header';
import PanelFooter from './Footer';
import PanelTitle from './Title';
import PanelInset from './Inset';
import PropTypes from 'prop-types';

/**
 * A panel for displaying a title, icon, and a count.
 * @param {object} props
 * @param {string} props.title - Optional title to be placed on the panel
 * @param {string} props.header - Optional header to be placed on the panel
 * @param {string} props.footer - Optional footer to be placed on the panel
 * @param {string} props.children - Children to be placed inside the panel
 * @param {string} props.type - Color for the container (default, primary, success, info, warning, danger)
 * @param {number} props.size - Size of the panel in column mode if you don't want to specify individual screen sizes
 * @param {number} props.lg - Size of the column when on a large screen
 * @param {number} props.md - Size of the column when on a medium screen
 * @param {number} props.sm - Size of the column when on a small screen
 * @param {number} props.xs - Size of the column when on a extra-small screen
 * @param {boolean} props.inset - Boolean to inset the contents of the panel
 * @param {number} props.maxHeight - Maxium hight in pixels that the panel can grow to
 * @param {object} props.style - Additional styling options
 */

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
    inset=false,
    maxHeight,
    style={}
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
  if(maxHeight){
    style.maxHeight=maxHeight;
    style.overflow=style.overflow||'auto';
  }
  const Wrapper = (size || lg || md || sm || xs)?Col:({children})=><div>{children}</div>;
  //<Col {...colProps}>
  return (
    <Wrapper {...colProps}>
      <div className={`panel panel-${type}`}>
        {header}
        <div style={style}>
          {inset?<PanelInset>{children}</PanelInset>:children}
        </div>
        {footer}
      </div>
    </Wrapper>
  );
  //</Col>
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
  inset: PropTypes.bool,
  maxHeight: PropTypes.number,
  style: PropTypes.object
};

export default Panel;
