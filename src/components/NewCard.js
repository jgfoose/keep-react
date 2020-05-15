import React, { Component } from  'react';

class NewCard extends Component {
  
  //Create new card on click
  handleClick = (e) => {
    e.preventDefault();
    this.props.addCard();
  }
  
  render() {
    return (
      <button 
        id="newCard"
        onClick={this.handleClick}>
          +
      </button>
    );
  }
}

export default NewCard;