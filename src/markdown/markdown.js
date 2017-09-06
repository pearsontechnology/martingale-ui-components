import React from 'react';
import MD from 'markdown-it';
import HTML from '../html';
const md = MD();

/**
 * Renders MarkDown directly
 * @name MarkDown
 * @param {object} props
 * @param {string} props.children - Markdown to be displayed
 */

const MarkDown = ({children: src})=>{
  const html = md.render(src);
  return <HTML>{html}</HTML>;
};

export default MarkDown;
