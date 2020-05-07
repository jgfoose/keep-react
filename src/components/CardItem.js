import React, {Component} from 'react';
import ListItem from './ListItem';
import ColorOptions from './ColorOptions';

class CardItem extends Component {

  colors = ['white', 'yellow', 'green', 'red', 'purple', 'blue'];

  cardHeader = React.createRef();
  newListItem = React.createRef();

  handleClick = () => {
    this.props.removeCard(this.props.id);
  }

  handleNewItem = (e) => {
    if(e.keyCode === 13) {
      this.props.addNewItem(this.props.index, this.newListItem.current.value);
      e.target.value = "";
    }
    
  }

  handleHeader = (e) => {
    if (e.keyCode === 13 || e.keyCode === 9) {
      this.props.updateHeader(this.props.index, this.cardHeader.current.innerHTML.trim());
      e.target.blur();
    }
  }

  render() {
    let className = `card ${this.props.color}`;
    
    return (
      <div 
        className={className}
        id="id">
        <div 
          contentEditable="true"
          className="cardTitle" 
          ref={this.cardHeader}
          onKeyDown={this.handleHeader}
        >
          {this.props.header}
        </div>
        <button 
          className="delete_card" 
          onClick={this.handleClick}>
          ✖
        </button>
        {this.props.items.map( (item,index) =>
          <ListItem 
            item={this.props.items[index]}
            index = {index}
            key={index}
            cardId = {this.props.id}
            deleteListItem={this.props.deleteListItem}
          />
        )}
        <input 
          type="text" 
          className="itemInput" 
          placeholder="New List Item"
          ref={this.newListItem}
          onKeyUp={this.handleNewItem}>
        </input>
        <div className="color_options">
          {this.colors.map (color => 
            <ColorOptions 
              color={color}
              cardId={this.props.id}
              updateCardColor={this.props.updateCardColor}
            />
          )}
        </div>
      </div>
    );
  }
}

export default CardItem;