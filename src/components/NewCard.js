import React, { Component } from  'react';

class NewCard extends Component {
  
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