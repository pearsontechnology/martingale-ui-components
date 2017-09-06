import React from 'react';

const createMarkup = (children)=>({__html: children});

/**
 * Renders HTML directly
 * @name HTML
 * @param {object} props
 * @param {string} props.className - HTML Class Name, if not specified then 'embedded-html' is used
 * @param {string} props.children - HTML to be displayed
 */

const DisplayHtml = ({className, children})=>(
  <div className={className||"embedded-html"} dangerouslySetInnerHTML={createMarkup(children)}/>
);

export default DisplayHtml;
