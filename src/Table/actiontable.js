import React from 'react';
import {Table} from './table';
import Link from '../Router/routerlink';
import {getObjectValue} from 'martingale-utils';
import PropTypes from 'prop-types';
import DeleteButton from '../Buttons/Delete';

const reToken = /\${([^}]+)}/g;
const ActionTable = ({mapper, actions=[], ...props})=>{
  const replaceTokens = (source, data)=>{
    if(typeof(source)==='undefined'){
      return source;
    }
    if(typeof(source)==='function'){
      return source(data);
    }
    return source.replace(reToken, (full, token)=>{
      return getObjectValue(token, data);
    });
  };
  const createLinkAction = ({caption, link, btnStyle='default', ...props}, index, data)=>{
    return (
      <Link
        key={index}
        to={replaceTokens(link, data)}
        className={`btn btn-${btnStyle}`} {...props}
        >
        {replaceTokens(caption)}
      </Link>
    );
  };
  const createDeleteAction = ({
    caption='Delete',
    delete: deleteTarget,
    title,
    message,
    successUrl,
    ...props}, index, data)=>{
    return (
      <DeleteButton
        key={index}
        target={replaceTokens(deleteTarget, data)}
        title={replaceTokens(title, data)}
        message={replaceTokens(message, data)}
        successUrl={replaceTokens(successUrl, data)}
        caption={replaceTokens(caption)}
        {...props}
        />
    );
  };
  const createComponentAction = ({Component, props}, index, data)=>{
    console.log(Component, props)
    return <Component {...props} />;
  };
  const createAction = (action, row, index)=>{
    if(React.isValidElement(action)){
      return <span key={index}>{action}</span>;
    }
    if(action.link){
      return createLinkAction(action, index, row);
    }
    if(action.delete){
      return createDeleteAction(action, index, row);
    }
    if(typeof(action)==='function'){
      return action(row, action, index);
    }
    if(typeof(action.Component)==='function'){
      return createComponentAction(action, index, row);
    }
    return action;
  };
  const actionMapper = (data)=>{
    const row = mapper?mapper(data):data;
    if(Array.isArray(actions)){
      const actionElements = <span>{actions.map((action, index)=>createAction(action, data, index))}</span>;
      return Object.assign({}, row, {actions: actionElements});
    }
    return Object.assign({}, row, {actions: createAction(actions, data)});
  };
  return <Table mapper={actionMapper} {...props} />;
};

ActionTable.propTypes = {
  items: PropTypes.array,
  actions: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  mapper: PropTypes.func
};

export {ActionTable};
