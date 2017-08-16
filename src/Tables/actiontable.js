import React from 'react';
import {Table} from './table';
import Link from '../Router/routerlink';
import {getObjectValue} from 'martingale-utils';
import PropTypes from 'prop-types';
import Button from '../Buttons/Button';
import DeleteButton from '../Buttons/Delete';
import OptionsButton from '../Buttons/OptionsButton';
import ConfirmButton from '../Buttons/Confirm';
import MenuItem from '../Menus/MenuItem';
import {merge, fetch} from 'martingale-utils';
import { withRouter } from 'react-router-dom';

const reToken = /\${([^}]+)}/g;
const ActionTableView = ({history, mapper, actions=[], columns, ...props})=>{
  const replaceTokens = (source, data)=>{
    const type = typeof(source);
    if(type==='undefined'){
      return source;
    }
    if(type==='function'){
      return source(data);
    }
    if(Array.isArray(source)){
      return source.map(item=>replaceTokens(item, data));
    }
    if(source && type==='object'){
      const keys = Object.keys(source);
      return keys.reduce((o, key)=>{
        const value = replaceTokens(source[key], data);
        o[key] = value;
        return o;
      }, {});
    }
    if(type==='string'){
      return source.replace(reToken, (full, token)=>{
        return getObjectValue(token, data);
      });
    }
    return source;
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

  const createFetchAction = (rawProps, index, data)=>{
      const props = replaceTokens(rawProps, data);
      const {
          caption,
          message = '',
          title = '',
          successUrl = window.location.pathname,
          fetch: options = {},
          ...rest
        } = props;
      const urlOptions = typeof(options)==='string'?{
          method: 'post',
          url: options
        }:options;
      const complete = (err)=>{
        if(err){
          throw err;
        }
        return history.push(successUrl);
      };
      const fetchOptions = merge({method: 'post'}, urlOptions, {callback: complete});
      const clickHandler = (e)=>{
        e && e.preventDefault && e.preventDefault();
        fetch(fetchOptions);
      };
      if(message){
        return <ConfirmButton key={index} onYes={clickHandler} title={title} caption={caption} {...rest}>{message}</ConfirmButton>;
      }
      return <Button onClick={clickHandler} key={index} {...rest}>{caption}</Button>;
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
    if(action.fetch){
      return createFetchAction(action, index, row);
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

ActionTableView.propTypes = {
  items: PropTypes.array,
  actions: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  mapper: PropTypes.func,
  columns: PropTypes.array,
  suppress: PropTypes.array
};

const ActionTable = withRouter(ActionTableView);

export {ActionTable};
