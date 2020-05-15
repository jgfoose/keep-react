import React, { Component } from 'react';
import { Provider } from './Context';
import Cards from './Cards';
import NewCard from './NewCard';
import TopNav from './Nav';
import Sidenav from './Sidenav';

class Card {
    constructor (id, items) {
        this.id = id;
        this.items= [];
        this.header = "";
        this.color = "";
        this.label ="";
    }
}

class App extends Component {
  
  state = {
    cards: [],
    labels: [],
    label_filter: ""
  }

getLocalStorage = () => {
    let storedCards = JSON.parse(window.localStorage.getItem("cards"));
    let storedLabels = JSON.parse(window.localStorage.getItem("labels"));
    let loadedCards = [];

    if (storedCards != null) {
      for(var i=0; i < storedCards.length; i++){
      let storedCard = storedCards[i];
      let thisCard = new Card(i);
      thisCard.id = storedCard.id;
      thisCard.items = storedCard.items;
      thisCard.header = storedCard.header;
      thisCard.color = storedCard.color;
      thisCard.label = storedCard.label;
      loadedCards.push(thisCard);
      this.prevCardId = i + 1;
   }
    }
    window.localStorage.clear();
    window.localStorage.setItem("cards", JSON.stringify(loadedCards));
    window.localStorage.setItem("labels", JSON.stringify(storedLabels));
  if(storedLabels != null) {
    this.setState({
      labels: storedLabels
    })
  }
  if(loadedCards != null) {
    this.setState({
      cards: loadedCards
    })
  }
   
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

  handleRemoveCard = (id) => {
    this.setState( prevState => {
      return {
        cards: prevState.cards.filter(card => card.id !== id)
      };
    }, () => {
      window.localStorage.setItem("cards", JSON.stringify(this.state.cards));
    });
  }

  handleUpdateHeader = (index, newHeader) => {
    this.setState (prevState => ({
        header: prevState.cards[index].header = newHeader
      }), () => {
        window.localStorage.setItem("cards", JSON.stringify(this.state.cards));
      });
  }

  handleAddNewItem = (index, newItem) => {
    this.setState ( prevState => {
      return {
        items: prevState.cards[index].items.push(newItem)
      };
    }, () => {
      window.localStorage.setItem("cards", JSON.stringify(this.state.cards));
    });
  }

  handleDeleteItem = (listItem, cardId) => {
    let cardIndex = this.state.cards.findIndex(card => card.id === cardId);
    this.setState( prevState => ({
      items: prevState.cards[cardIndex].items.splice(listItem,1)
    }), () => {
      window.localStorage.setItem("cards", JSON.stringify(this.state.cards));
    });
  }

  handleCardColor = (cardId, color) => {
    let cardIndex = this.state.cards.findIndex(card => card.id === cardId);
    this.setState( prevState => ({
      color: prevState.cards[cardIndex].color = color
    }), () => {
      window.localStorage.setItem("cards", JSON.stringify(this.state.cards));
    });
  }

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

  handleDeleteLabel = (currentLabel) => {
    this.setState( prevState => ({
      labels: prevState.labels.filter(label => label !== currentLabel)
    }), () => {
      window.localStorage.setItem("labels", JSON.stringify(this.state.labels));
    });
  }

  handleCardLabel = (cardId, label) => {
    let cardIndex = this.state.cards.findIndex(card => card.id === cardId);
    this.setState( prevState => ({
      label: prevState.cards[cardIndex].label = label
    }), () => {
      window.localStorage.setItem("cards", JSON.stringify(this.state.cards));
    });
  }

  handleCardFilter = (label) => {
    this.setState( prevState => ({
      label_filter: prevState.label_filter = label
    }))
  }

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
        <TopNav />
        <div className="row">
          <Sidenav />
          
          <div id="card_container">   
            <Cards />
          </div>
        </div>
        <NewCard addCard={this.handleAddCard}/>
      </Provider>
    );
  }
}

export default App;