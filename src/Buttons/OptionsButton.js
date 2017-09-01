import React from 'react';
import MenuItem from '../Menus/MenuItem';
import Link from '../Router/routerlink';

class OptionsButtonMenu extends React.Component{
  handleClick(e){
    this.props.onClick && this.props.onClick(e);
  }

  render(){
    const {
      items = []
    } = this.props;
    const menuItems = items.map((item, index)=>item.divider?
        <MenuItem key={index} divider />:
        <li key={index} role="presentation">
          <Link to={item.link} role="menuitem" tabIndex="-1" onClick={this.handleClick.bind(this)}>{item.caption}</Link>
        </li>);
    return (
      <ul role="menu" className="dropdown-menu">
        {menuItems}
      </ul>
    );
  }
};

/**
 * Generates a drop down button with a default action that navigates to a location.
 * @param {object} props
 * @param {string} props.caption - Caption to put on the button
 * @param {array} props.items - Array of children to be placed in the dropdown when shown
 * @param {string} props.to - Target to navitgate to when clicked
 * @extends Button
*/

class OptionsButton extends React.Component{
  constructor({expanded = false}){
    super();
    this.state={expanded};
  }

  showDropdown(){
    this.setState({expanded: true});
  }

  hideDropdown(){
    this.setState({expanded: false});
  }

  toggleDropdown(){
    this.setState({expanded: !this.state.expanded});
  }

  toggleDropdownClick(e){
    e.preventDefault();
    this.toggleDropdown();
  }

  render(){
    const {
      caption,
      items,
      to: linkTo,
      btnStyle='default'
    } = this.props;
    const open = this.state.expanded?'open':'';
    return (
      <div className={`dropdown ${open} btn-group btn-group-${btnStyle}`}>
        <Link to={linkTo} caption={caption} className={`btn btn-${btnStyle}`} />
        <button className={`dropdown-toggle btn btn-${btnStyle}`} onClick={this.toggleDropdownClick.bind(this)}><span className="caret" /></button>
        <OptionsButtonMenu items={items} onClick={this.hideDropdown.bind(this)} />
      </div>
    );
  }
};

export default OptionsButton;
