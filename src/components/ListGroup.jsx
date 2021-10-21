import React, { Component } from 'react';

class ListGroup extends Component {
    constructor(props) {
        super(props);
        this.allItem = {_id: Date.now(), name: "All " + props.title.toLowerCase()};
        props.onSelect(this.allItem);
    }
    
    getListItems() {
        return [this.allItem, ...this.props.data];
    }

    getStyleClasses(isCurrent) {
        let classes = "list-group-item";
        return classes.concat(isCurrent ? " active" : "");
    }

    render() {
        const {currentItem, onSelect} = this.props;
        return (
            <ul className="list-group">
                {this.getListItems().map((item) => (<li key={item._id} className={this.getStyleClasses(item === currentItem)} onClick={() => onSelect(item)}>{item.name}</li>))}
            </ul>
        );
    }
}

export default ListGroup;
