import React from  'react';
import { Consumer } from './Context';
import CardItem from './CardItem';

const Cards = () => {

  return (
    <Consumer>
      { context => {
        //If label in side nav is selected, pull only cards with matching label
        let filteredCards =[]
        if(context.label_filter !== null && context.label_filter !== ""){
          filteredCards = context.cards.filter(card => card.label === context.label_filter)
        }
        else filteredCards = context.cards
        

        return(
        <React.Fragment>
          {filteredCards.map( (card, index) =>
              <CardItem 
                {...card}
                key={card.id.toString()} 
                index={index}
              />  
            )}
        </React.Fragment>
        );
      }}
    </Consumer>
  );
}

export default Cards