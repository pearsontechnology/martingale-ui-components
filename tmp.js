const l = require('./src');
import PropTypes from 'prop-types';

const cnames = Object.keys(l);

function getParamNames(fn) {
    var funStr = fn.toString();
    return funStr.slice(funStr.indexOf('(') + 1, funStr.indexOf(')')).match(/([^\s,]+)/g);
}

const getPropTypeType = (pt)=>{
  return Object.keys(PropTypes).reduce((type, name)=>{
    if(type){
      return type;
    }
    const value = PropTypes[name];
    if(value === pt){
      return name;
    }
    return false;
  }, false);
};

const getProps = (c)=>{
  const propTypes = c.propTypes;
  if(!propTypes){
    return '';
  }

  const propInfo = Object.keys(propTypes).sort().reduce((types, name)=>{
    const propType = propTypes[name];
    const typeName = getPropTypeType(propType);
    return `${types} * ${name} - ${typeName||''} \n`;
  }, '');
  if(propInfo){
    return `
### Properties

${propInfo}`;
  }
  return '';
};

cnames.sort().forEach((name)=>{
  const c = l[name];
  const props = getProps(c);
  console.log(`## ${name}
${props}`);
});
