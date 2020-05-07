import React from 'react';
import { Consumer } from './Context';

const CardColors = (props) => {

  return (
    <Consumer>
      { context => {
        let className = `color_option ${props.color}`
        return (
          <div 
            className={className}
            onClick={() => context.actions.updateCardColor(props.cardId, props.color)}>
          </div>
        );
      }}
    </Consumer>
  );
}

export default CardColors