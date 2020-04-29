import React, { Component } from 'react';
import NewCard from './NewCard';
import CardList from './CardList';

class App extends Component {

  state = {
    cards: [
      {
        header: "Example Card",
        id: 1,
        items: ["list of items","Add new items below", "choose card color below","click plus button on bottom for new card"],
        color: "yellow"
      }
    ]
  }

  //card id counter
  prevCardId = 1;

  handleAddCard = () => {
    this.setState( prevState => {
      return {
        cards: [
          ...prevState.cards,
          {
            header: "Card Title",
            id: this.prevCardId += 1,
            items: [],
            color: "white"
          }
        ]
      };
    });
  }

  handleRemoveCard = (id) => {
    this.setState( prevState => {
      return {
        cards: prevState.cards.filter(card => card.id !== id)
      };
    });
  }

  handleUpdateHeader = (index, newHeader) => {
    this.setState (prevState => ({
        header: prevState.cards[index].header = newHeader
      }));
  }

  handleAddNewItem = (index, newItem) => {
    this.setState ( prevState => ({
      items: prevState.cards[index].items.push(newItem)
    }));
  }

  handleDeleteItem = (index, id) => {
    id = this.state.cards.findIndex(card => card.id === id);
    this.setState( prevState => ({
      items: prevState.cards[id].items.splice(index,1)
    }));
  }

  handleCardColor = (id, color) => {
    id = this.state.cards.findIndex(card => card.id === id);
    this.setState( prevState => ({
      color: prevState.cards[id].color = color
    }));
  }

  render() {
    return(
      <div id="card_container">     
        <NewCard addCard={this.handleAddCard}/>
        {this.state.cards.map( (card, index) =>
          <CardList 
            header={card.header}
            id={card.id}
            key={card.id.toString()} 
            items={card.items}
            index={index}
            color={card.color}
            removeCard={this.handleRemoveCard}
            updateHeader={this.handleUpdateHeader}
            addNewItem={this.handleAddNewItem}
            deleteListItem={this.handleDeleteItem}
            updateCardColor={this.handleCardColor}
          />  
        )}
      </div>
    );
  }
}

export default App;