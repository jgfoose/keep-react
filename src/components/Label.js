import React from  'react';
import { Consumer } from './Context';
import Nav from 'react-bootstrap/Nav';

const Label = (props) => {

  return ( 
    <Consumer>
      { context => {

        const handleClick = (e) => {
          e.preventDefault();
          context.actions.deleteLabel(props.label);
        }
        
        return (
            <Nav.Link eventKey="link-2" onClick={ () => context.actions.updateLabelFilter(props.label)}>
            {props.label}
            <button 
              className="delete_card" 
              onClick={handleClick}>
              ✖
            </button>
            </Nav.Link>
            
        )}}
      </Consumer>
  )
}

export default Label