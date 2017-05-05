import React from 'react';
import {Table} from './table';
import {Link} from '../Router';
import {getObjectValue} from 'martingale-utils';
import PropTypes from 'prop-types';

const reToken = /\${([^}]+)}/g;
const ActionTable = ({mapper, actions, ...props})=>{
  const replaceTokens = (source, data)=>{
    return source.replace(reToken, (full, token)=>{
      return getObjectValue(token, data);
    });
  };
  const createLinkAction = ({caption, link, btnStyle='default', ...props}, index, data)=>{
    return <Link key={index} to={replaceTokens(link, data)} className={`btn btn-${btnStyle}`} {...props}>{caption}</Link>
  };
  const createAction = (action, row, index)=>{
    console.log(action);
    if(React.isValidElement(action)){
      return <span key={index}>{action}</span>;
    }
    if(action.link){
      return createLinkAction(action, index, row);
    }
    if(typeof(action)==='function'){
      return action(row, action, index);
    }
    return action;
  };
  const actionMapper = (data)=>{
    const row = mapper?mapper(data):data;
    if(Array.isArray(actions)){
      return Object.assign({}, row, {actions: <span>{actions.map((action, index)=>createAction(action, row, index))}</span>});
    }
    return Object.assign({}, row, {actions: createAction(actions, row)});
  };
  return <Table mapper={actionMapper} {...props} />;
};

ActionTable.propTypes = {
  items: PropTypes.array,
  actions: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  mapper: PropTypes.func
};

export {ActionTable};
