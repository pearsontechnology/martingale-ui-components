import React from 'react';
import {Table} from './table';
import PropTypes from 'prop-types';
import Actions from '../actions/actions';

const ActionTableView = ({mapper, actions=[], columns, ...props})=>{
  const actionMapper = (data)=>{
    const row = mapper?mapper(data):data;
    return Object.assign({}, row, {actions: <Actions data={data} actions={actions}/>});
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

/**
 * A table with standard actions in the last column for each row
 * @param {object} props
 * @param {array} props.actions - List of actions to be displayed in the last column
 * @extends Table
 */
const ActionTable = ActionTableView;

export {ActionTable};
