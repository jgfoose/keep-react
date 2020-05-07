import React, {Component} from 'react';
import ListItem from './ListItem';
import ColorOptions from './ColorOptions';
import { Consumer } from './Context';

class CardItem extends Component {

colors = ['white', 'yellow', 'green', 'red', 'purple', 'blue'];
cardHeader = React.createRef();
newListItem = React.createRef();

  render() {
    return (
      <Consumer>
      { context => {
        let className = `card ${this.props.color}`;

        const handleClick = () => {
          context.actions.removeCard(this.props.id);
        }

        const handleNewItem = (e) => {
          if(e.keyCode === 13 || e.keyCode === 9) {
            context.actions.addNewItem(this.props.index, this.newListItem.current.value);
            e.target.value = "";
          }
        }

        const handleHeader = (e) => {
          if (e.keyCode === 13 || e.keyCode === 9) {
            context.actions.updateHeader(this.props.index, this.cardHeader.current.innerHTML.trim());
            e.target.blur();
          }
        }
        
        return (
          <div 
            className={className}
            id="id">
              <div 
                contentEditable="true"
                className="cardTitle" 
                ref={this.cardHeader}
                onKeyDown={handleHeader}>
                  {this.props.header}
              </div>
              <button 
                className="delete_card" 
                onClick={handleClick}>
                ✖
              </button>
              {this.props.items.map( (item,index) =>
                <ListItem 
                  item={this.props.items[index]}
                  index = {index}
                  key={index}
                  cardId = {this.props.id}
                />
              )}
              <input 
                type="text" 
                className="itemInput" 
                placeholder="New List Item"
                ref={this.newListItem}
                onKeyUp={handleNewItem}>
              </input>
              <div className="color_options">
                {this.colors.map (color => 
                  <ColorOptions 
                    color={color}
                    cardId={this.props.id}
                  />
                )}
              </div>
          </div>
        );
      }}
      </Consumer>
    );
  }
}

export default CardItem;