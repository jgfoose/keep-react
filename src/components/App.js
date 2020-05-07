import React, { Component } from 'react';
import NewCard from './NewCard';
import CardItem from './CardItem';

class Card {
    constructor (id, items) {
        this.id = id;
        this.items= [];
        this.header = "";
        this.color = "";
    }
}

class App extends Component {
  
  state = {
    cards: []
  }

  getLocalStorage = () => {
    var keys = Object.keys(window.localStorage);
    let loadedCards = [];
    for(var i=0; i < keys.length; i++){
      let storedCard = JSON.parse(window.localStorage.getItem(keys[i]));
      let thisCard = new Card(i);
      thisCard.id = i;
      thisCard.items = storedCard.items;
      thisCard.header = storedCard.header;
      thisCard.color = storedCard.color;
      loadedCards.push(thisCard);
      this.prevCardId = i + 1;
   }
   window.localStorage.clear();
   for( i=0; i<loadedCards.length; i++) {
     window.localStorage.setItem(loadedCards[i].id, JSON.stringify(loadedCards[i]));
   }
   this.setState({
      cards: loadedCards
    })
  }

  //card id counter
  prevCardId = 0;

  handleAddCard = () => {
    this.setState( prevState => {
      return {
        cards: [
          ...prevState.cards,
          {
            header: "Card Title",
            id: this.prevCardId,
            items: [],
            color: "white"
          }
        ]
      };
    }, () => {
      let index = this.state.cards.findIndex(card => card.id === this.prevCardId);
      window.localStorage.setItem(this.prevCardId, JSON.stringify(this.state.cards[index]));
      this.prevCardId += 1;
    });
  }

  handleRemoveCard = (id) => {
    this.setState( prevState => {
      return {
        cards: prevState.cards.filter(card => card.id !== id)
      };
    }, () => {
      window.localStorage.removeItem(id.toString());
    });
  }

  handleUpdateHeader = (index, newHeader) => {
    this.setState (prevState => ({
        header: prevState.cards[index].header = newHeader
      }), () => {
        window.localStorage.setItem(this.state.cards[index].id, JSON.stringify(this.state.cards[index]));
      });
  }

  handleAddNewItem = (index, newItem) => {
    this.setState ( prevState => {
      return {
        items: prevState.cards[index].items.push(newItem)
      };
    }, () => {
      window.localStorage.setItem(this.state.cards[index].id, JSON.stringify(this.state.cards[index]));
    });
  }

  handleDeleteItem = (listItem, cardId) => {
    let cardIndex = this.state.cards.findIndex(card => card.id === cardId);
    this.setState( prevState => ({
      items: prevState.cards[cardIndex].items.splice(listItem,1)
    }), () => {
      window.localStorage.setItem(cardId, JSON.stringify(this.state.cards[cardIndex]));
    });
  }

  handleCardColor = (cardId, color) => {
    let cardIndex = this.state.cards.findIndex(card => card.id === cardId);
    this.setState( prevState => ({
      color: prevState.cards[cardIndex].color = color
    }), () => {
      window.localStorage.setItem(cardId, JSON.stringify(this.state.cards[cardIndex]));
    });
  }

  componentDidMount(){
    this.getLocalStorage();
  }

  render() {
    return(
      <div id="card_container">     
        <NewCard addCard={this.handleAddCard}/>
        {this.state.cards.map( ({header,id,items,color}, index) =>
          <CardItem 
            header={header}
            id={id}
            key={id.toString()} 
            items={items}
            index={index}
            color={color}
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