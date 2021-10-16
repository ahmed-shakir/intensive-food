import React, { Component } from 'react';
import FoodEdit from './FoodEdit';

class Food extends Component {
    food = this.props.data;

    render() {
        if(this.food.isEditing) {
            return (<FoodEdit key={this.food._id} data={this.food} onSave={this.props.onSave} onCancel={this.props.onCancel} />);
        } 
        return (
            <tr>
                <td>{this.food.name}</td>
                <td>{this.food.category.name}</td>
                <td>{this.food.numberInStock}</td>
                <td>{this.food.price}</td>
                <td>
                    <button onClick={() => this.props.onEdit(this.food)} className="btn btn-primary btn-sm m-1" title="edit"><i className="fas fa-pen" aria-hidden="true" /></button>
                    <button onClick={() => this.props.onDelete(this.food)} className="btn btn-danger btn-sm m-1" title="delete"><i className="fas fa-trash-alt" aria-hidden="true" /></button>
                </td>
            </tr>
        );
    }
}

export default Food;
