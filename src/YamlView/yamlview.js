import React from 'react';
import PropTypes from 'prop-types';
import YAML from 'js-yaml';
import {
  betterType
} from 'martingale-utils';

const PrettyYamlView = ({src, inset=true})=>{
  const type = betterType(src);
  const cn = (base)=>inset?`${base} inset`:base;
  switch(type){
    /*
    case('null'):
      return <span className="null">null</span>;
    case('undefined'):
      return <span className="number">undefined</span>;
    case('string'):
      return <span className="string">{src}</span>;
    case('number'):
      return <span className="number">{src}</span>;
    case('boolean'):
      return <span className="boolean">{src}</span>;
      */
    case('array'):
      const arrMap = src.map((value, index)=>{
        return (
          <li key={index}>
            <PrettyYamlView src={value} />
          </li>
        );
      });
      return <ol className={cn('array')}>{arrMap}</ol>;
    case('object'):
      const keys = Object.keys(src);
      const objMap = keys.map((key)=>{
        const value = src[key];
        return (
          <dl key={key}>
            <dt>{key}: </dt>
            <dd><PrettyYamlView src={value} /></dd>
          </dl>
        );
      });
      return <div className={cn('object')}>{objMap}</div>;
    default:
      return (
      <span className={cn(type)}>
        {JSON.stringify(src, null, 2)}
      </span>
    );
  }
};

const YamlView = ({json, data, pretty = false})=>{
  const src = json || data;
  const view = pretty?<PrettyYamlView src={src} inset={false} />:(
    <pre>
      {YAML.safeDump(src, {indent: 2})}
    </pre>
  );
  return <div className="YamlView">{view}</div>;
};

YamlView.propTypes = {
  json: PropTypes.any,
  data: PropTypes.any,
  pretty: PropTypes.bool
};

export default YamlView;
