import React from 'react';
import PropTypes from 'prop-types';
import {
  betterType
} from 'martingale-utils';

const PrettyJsonView = ({src, inset=true})=>{
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
            <PrettyJsonView src={value} />
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
            <dd><PrettyJsonView src={value} /></dd>
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

const JsonView = ({json, pretty = false})=>{
  const view = pretty?<PrettyJsonView src={json} inset={false} />:(
    <pre>
      {JSON.stringify(json, null, 2)}
    </pre>
  );
  return <div className="jsonView">{view}</div>;
};

JsonView.propTypes = {
  json: PropTypes.any,
  pretty: PropTypes.bool
};

export default JsonView;
