import React from 'react';
import PropTypes from 'prop-types';

import Col from '../Grid/Col';
import Row from '../Grid/Row';

import PanelFooter from './Footer';

import classnames from 'classnames';

const iconWrapper=({icon, size})=>React.createElement(icon, {size});

/**
 * A panel for displaying a title, icon, and a count.
 * @param {object} props
 * @param {string} props.className - Additional class names to apply to the container
 * @param {number} props.count - Number to be displayed
 * @param {string} props.color - Color for the container (default, primary, success, info, warning, danger)
 * @param {string} props.link - Page user should be taken to when clicked
 * @param {string} props.title - Text to be displayed with icon and count
 * @param {string} props.more - Additional text to be displayed below the icon, count and title
 * @param {string} props.Icon - The icon to be displayed alongside the count
 */

const CountPanel = (props)=>{
  const {
    className: addlClasses = '',
    count,
    color = 'primary',
    link = '#',
    title,
    more = 'View Details',
    Icon
  } = props;
  const className = classnames('panel', `panel-${color}`, ...addlClasses.split(/[ \t]+/));
  const smallIcon = <Icon />;
  const largeIcon = <Icon size={64} />;

  return (
    <Col lg={3} md={6}>
      <div className={className}>
        <div className="panel-heading">
          <Row>
            <Col xs={3}>
              {largeIcon}
            </Col>
            <Col xs={9} className="text-right">
              <div className="huge">{count}</div>
              <div>{title}</div>
            </Col>
          </Row>
        </div>
        <a href={link}>
          <PanelFooter>
            <span className="pull-left">{more}</span>
            <span className="pull-right">{smallIcon}</span>
            <div className="clearfix"></div>
          </PanelFooter>
        </a>
      </div>
    </Col>
  );
};

PanelFooter.propTypes={
  className: PropTypes.string,
  color: PropTypes.string,
  count: PropTypes.number,
  link: PropTypes.string,
  title: PropTypes.string,
  more: PropTypes.string,
  icon: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.func,
    PropTypes.array
  ])
};

export default CountPanel;
