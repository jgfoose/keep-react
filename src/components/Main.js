import React, { Component } from 'react';
import { Provider } from './Context';
import Cards from './Cards';
import NewCard from './NewCard';
import NavHeader from './Nav';

class Card {
    constructor (id, items) {
        this.id = id;
        this.items= [];
        this.header = "";
        this.color = "";
        this.label ="";
    }
}

class Main extends Component {

  state = {
    cards: [{"header":"Sample Card","id":0,"items":["Add items / todo's below","Color code your cards below","Add labels in side nav and select the label in the dropdown below","Filter through cards with the labels in side nav", "Add a new card with the plus button"],"label":"","color":"yellow"}],
    labels: [],
    label_filter: ""
  }

//Cards will be stored in local storage and retrieved on page refresh
getLocalStorage = () => {
  let storedCards = JSON.parse(window.localStorage.getItem("cards"));
  let storedLabels = JSON.parse(window.localStorage.getItem("labels"));
  let loadedCards = [];

  //If there are stored cards, create populate loaded cards arrary
  if (storedCards !== null) {
    for(var i=0; i < storedCards.length; i++){
      let storedCard = storedCards[i];
      let thisCard = new Card(i);
      thisCard.id = i;
      thisCard.items = storedCard.items;
      thisCard.header = storedCard.header;
      thisCard.color = storedCard.color;
      thisCard.label = storedCard.label;
      loadedCards.push(thisCard);
      this.prevCardId = i + 1;
    }
    window.localStorage.clear();
    window.localStorage.setItem("cards", JSON.stringify(loadedCards));
    window.localStorage.setItem("labels", JSON.stringify(storedLabels));
  }

  //If labels, update state
  if(storedLabels !==null) {
    this.setState({
      labels: storedLabels
    })
  }

  //if cards, update state, else default card will be loaded
  if(loadedCards.length > 0) {
    this.setState({
      cards: loadedCards
    })
  }

}

  //card id counter
  prevCardId = 0;

  //New card when plus button is clicked.
  handleAddCard = () => {
    this.setState( prevState => {
      return {
        cards: [
          ...prevState.cards,
          {
            header: "Card Title",
            id: this.prevCardId,
            items: [],
            label: "",
            color: "white"
          }
        ]
      };
    }, () => {
      window.localStorage.setItem("cards", JSON.stringify(this.state.cards));
      this.prevCardId += 1;
    });
  }

  //Remove card when X is clicked
  handleRemoveCard = (id) => {
    this.setState( prevState => {
      return {
        cards: prevState.cards.filter(card => card.id !== id)
      };
    }, () => {
      window.localStorage.setItem("cards", JSON.stringify(this.state.cards));
    });
  }

  //Update card header/title
  handleUpdateHeader = (index, newHeader) => {
    this.setState (prevState => ({
        header: prevState.cards[index].header = newHeader
      }), () => {
        window.localStorage.setItem("cards", JSON.stringify(this.state.cards));
      });
  }

  //Add new list item / todo item
  handleAddNewItem = (index, newItem) => {
    this.setState ( prevState => {
      return {
        items: prevState.cards[index].items.push(newItem)
      };
    }, () => {
      window.localStorage.setItem("cards", JSON.stringify(this.state.cards));
    });
  }

  //Remove list item / todo when X is clicked
  handleDeleteItem = (listItem, cardId) => {
    let cardIndex = this.state.cards.findIndex(card => card.id === cardId);
    this.setState( prevState => ({
      items: prevState.cards[cardIndex].items.splice(listItem,1)
    }), () => {
      window.localStorage.setItem("cards", JSON.stringify(this.state.cards));
    });
  }

  //Update card color when clicked
  handleCardColor = (cardId, color) => {
    let cardIndex = this.state.cards.findIndex(card => card.id === cardId);
    this.setState( prevState => ({
      color: prevState.cards[cardIndex].color = color
    }), () => {
      window.localStorage.setItem("cards", JSON.stringify(this.state.cards));
    });
  }

  //Add label to side nav
  handleAddLabel = (label) => {
    this.setState( prevState => {
      return {
        labels: [
          ...prevState.labels,
          label
        ]
      };
    }, () => {
      window.localStorage.setItem("labels", JSON.stringify(this.state.labels));
    });
  }

  //Remove label from side nav when X clicked
  handleDeleteLabel = (currentLabel) => {
    this.setState( prevState => ({
      labels: prevState.labels.filter(label => label !== currentLabel)
    }), () => {
      window.localStorage.setItem("labels", JSON.stringify(this.state.labels));
    });
  }

  //Update card label when selected
  handleCardLabel = (cardId, label) => {
    let cardIndex = this.state.cards.findIndex(card => card.id === cardId);
    this.setState( prevState => ({
      label: prevState.cards[cardIndex].label = label
    }), () => {
      window.localStorage.setItem("cards", JSON.stringify(this.state.cards));
    });
  }

  //Filter cards when label is selected in side nav
  handleCardFilter = (label) => {
    this.setState( prevState => ({
      label_filter: prevState.label_filter = label
    }))
  }

  //fetch local storage on page load
  componentDidMount(){
    this.getLocalStorage();
  }

  render() {
    return(
      <Provider value={{
        cards: this.state.cards,
        labels: this.state.labels,
        label_filter: this.state.label_filter,
        actions: {
          updateCardColor: this.handleCardColor,
          removeCard: this.handleRemoveCard,
          updateHeader: this.handleUpdateHeader,
          addNewItem: this.handleAddNewItem,
          deleteListItem: this.handleDeleteItem,
          addLabel: this.handleAddLabel,
          deleteLabel: this.handleDeleteLabel,
          updateCardLabel: this.handleCardLabel,
          updateLabelFilter: this.handleCardFilter
        }
      }}>
        <NavHeader />
        <div className="row">
          <div id="card_container">
            <Cards />
          </div>
        </div>
        <NewCard addCard={this.handleAddCard}/>
      </Provider>
    );
  }
}

export default Main;
