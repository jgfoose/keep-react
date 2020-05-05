import React, { Component } from 'react';
import NewCard from './NewCard';
import CardList from './CardList';

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
    cards: [
    ]
  }

  getLocalStorage = () => {
    var keys = Object.keys(window.localStorage);
    let loadedCards = [];
    for(var i=0; i < keys.length; i++){
      if(window.localStorage.getItem(keys[i]) !== null){
        let storedCard = JSON.parse(window.localStorage.getItem(keys[i]));
        let thisCard = new Card(i);
        thisCard.id = storedCard.id;
        thisCard.items = storedCard.items;
        thisCard.header = storedCard.header;
        thisCard.color = storedCard.color;
        loadedCards.push(thisCard);
      }
      this.prevCardId = parseInt(keys[i]) + 1;
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
            id: this.prevCardId += 1,
            items: [],
            color: "white"
          }
        ]
      };
    }, () => {
      let index = this.state.cards.findIndex(card => card.id === this.prevCardId);
      window.localStorage.setItem(this.prevCardId, JSON.stringify(this.state.cards[index]));
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

  handleDeleteItem = (index, id) => {
    let cardIndex = this.state.cards.findIndex(card => card.id === id);
    this.setState( prevState => ({
      items: prevState.cards[cardIndex].items.splice(index,1)
    }), () => {
      window.localStorage.setItem(id, JSON.stringify(this.state.cards[cardIndex]));
    });
  }

  handleCardColor = (id, color) => {
    let cardIndex = this.state.cards.findIndex(card => card.id === id);
    this.setState( prevState => ({
      color: prevState.cards[cardIndex].color = color
    }), () => {
      window.localStorage.setItem(id, JSON.stringify(this.state.cards[cardIndex]));
    });
  }

  componentDidMount(){
    this.getLocalStorage();
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