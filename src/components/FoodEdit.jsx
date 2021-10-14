import React, { Component } from 'react';

class FoodEdit extends Component {
    state = {
        food: {...this.props.food}
    };

    handleChange = (event) => {
        const {id, value} = event.target;
        const food = this.state.food;
        food[id] = value;
        this.setState({ food });
        event.preventDefault();
    };

    render() {
        return (
            <tr>
                <td>
                    <input
                        id="name"
                        type="text"
                        className="form-control"
                        disabled
                        readOnly
                        defaultValue={this.state.food.name} />
                </td>
                <td>
                    <input
                        id="category"
                        type="text"
                        className="form-control"
                        disabled
                        readOnly
                        defaultValue={this.state.food.category.name} />
                </td>
                <td>
                    <input
                        id="numberInStock"
                        type="text"
                        className="form-control"
                        defaultValue={this.state.food.numberInStock}
                        onChange={(e) => this.handleChange(e)} />
                </td>
                <td>
                    <input
                        id="price"
                        type="text"
                        className="form-control"
                        defaultValue={this.state.food.price}
                        onInput={(e) => this.handleChange(e)} />
                </td>
                <td>
                    <button onClick={() => this.props.onSave(this.state.food)} className="btn btn-success btn-sm m-1"><i className="fas fa-check" aria-hidden="true" /></button>
                    <button onClick={() => this.props.onCancel(this.props.food)} className="btn btn-secondary btn-sm m-1"><i className="fas fa-ban" aria-hidden="true" /></button>
                </td>
            </tr>
        );
    }
}

export default FoodEdit;