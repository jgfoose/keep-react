import React from  'react';
import { Consumer } from './Context';
import CardItem from './CardItem';

const Cards = (props) => {

  return (
    <Consumer>
      { context => (
        <React.Fragment>
          {context.cards.map( (card, index) =>
              <CardItem 
                {...card}
                key={card.id.toString()} 
                index={index}
              />  
            )}
        </React.Fragment>
      )}
    </Consumer>
  );
}

export default Cards