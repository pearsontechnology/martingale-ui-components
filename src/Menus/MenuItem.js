import React from 'react';
import {MenuItem} from 'react-bootstrap';
import PropTypes from 'prop-types';

/**
 * Generates a menu item for use within Menus
 * @name MenuItem
 * @param {object} props
 */
const UiMenuItem = (props)=><MenuItem {...props} />;

export default UiMenuItem;
