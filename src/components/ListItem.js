import React from 'react';
import { Consumer } from './Context';

const ListItem = (props) => {
    return (
      <Consumer>
        { context => {
          return(
            <div className="list_item">
              <div className="list_item_text">{props.item}</div>
              <button 
                className="delete_input"
                onClick={() => context.actions.deleteListItem(props.index, props.cardId)}>
                ✖
              </button>
            </div>
          );
        }}
      </Consumer>
    );
  }


export default ListItem;