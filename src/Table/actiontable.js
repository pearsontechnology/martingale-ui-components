import React from 'react';
import {Table} from './table';
import Link from '../Router/routerlink';
import {getObjectValue} from 'martingale-utils';
import PropTypes from 'prop-types';
import DeleteButton from '../Buttons/Delete';
import OptionsButton from '../Buttons/OptionsButton';
import MenuItem from '../Menus/MenuItem';

const reToken = /\${([^}]+)}/g;
const ActionTable = ({mapper, actions=[], columns, ...props})=>{
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

  const createDropdownList = ({caption, link, items: listItems = [], btnStyle, ...props}, index, data)=>{
    const linkTo=replaceTokens(link, data);
    const displayCaption=replaceTokens(caption, data);
    const items = listItems.map((item)=>{
      const {
        link,
        caption,
        ...props
      } = item;
      return {
        link: replaceTokens(link, data),
        caption: replaceTokens(caption, data),
        ...props
      };
    });
    return <OptionsButton
            key={index}
            caption={displayCaption}
            to={linkTo}
            items={items}
            btnStyle={btnStyle}
            />;
  };

  const createLinkAction = ({caption, link, btnStyle='default', items, ...props}, index, data)=>{
    if(Array.isArray(items)){
      return createDropdownList({caption, link, btnStyle, items, ...props}, index, data);
    }
    return (
      <Link
        key={index}
        to={replaceTokens(link, data)}
        className={`btn btn-${btnStyle}`} {...props}
        >
        {replaceTokens(caption, data)}
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
        caption={replaceTokens(caption, data)}
        {...props}
        />
    );
  };
  const createComponentAction = ({Component, props}, index, data)=>{
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
  if(columns){
    const actionsIndex = columns.findIndex((a)=>{
      if(a === 'actions'){
        return true;
      }
      if(a.value === 'actions'){
        return true;
      }
      return false;
    });
    if(actionsIndex===-1){
      columns.push('actions');
    }
  }
  return <Table mapper={actionMapper} columns={columns} {...props} />;
};

ActionTable.propTypes = {
  items: PropTypes.array,
  actions: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  mapper: PropTypes.func,
  columns: PropTypes.array
};

export {ActionTable};
