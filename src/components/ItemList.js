import React, {Component} from 'react';

class ItemList extends Component {

  handleDeleteItem = () => {
    this.props.deleteListItem(this.props.index, this.props.id);
  }

  render() {
    return (
      <div className="list_item">
        <div className="list_item_text">{this.props.item}</div>
        <button 
          className="delete_input"
          onClick={this.handleDeleteItem}>
          ✖
        </button>
      </div>
    );
  }
}

export default ItemList;