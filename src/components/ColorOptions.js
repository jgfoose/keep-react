import React, { Component } from  'react';

class CardColors extends Component {

  changeCardColor = () => {
    this.props.updateCardColor(this.props.id, this.props.color);
  }

  render() {

    let className = `color_option ${this.props.color}`

    return (
      <div 
        className={className}
        onClick={this.changeCardColor}
      >
      </div>
    );
  }
}

export default CardColors