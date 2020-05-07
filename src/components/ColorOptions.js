import React, { Component } from  'react';

class CardColors extends Component {

  render() {

    let className = `color_option ${this.props.color}`

    return (
      <div 
        className={className}
        onClick={() => this.props.updateCardColor(this.props.cardId, this.props.color)}
      >
      </div>
    );
  }
}

export default CardColors