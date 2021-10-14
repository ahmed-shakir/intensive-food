import React, { Component } from 'react';
import { saveFood } from "../services/fakeFoodService";
import { getCategories } from "../services/fakeCategoryService";

class AddFood extends Component {
    state = {
        food: {}
    };

    handleChange = (event) => {
        const {id, value} = event.target;
        const food = this.state.food;
        food[id] = value;
        this.setState({ food });
        event.preventDefault();
    };

    handleSave = () => {
        const food = saveFood(this.state.food);
        this.props.onSave(food);
        this.setState({ food: {} });
        document.getElementById("addFoodForm").reset();
    };

    render() {
        return (
            <div id="myModal" className="modal modal-dialog-centered" tabIndex="-1" aria-hidden="true" hidden={this.props.hidden}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Add food</h5>
                            <button type="button" className="btn-close" aria-label="Close" onClick={this.props.onCancel}></button>
                        </div>
                        <form id="addFoodForm">
                            <div className="modal-body">
                                <div className="form-floating mb-3">
                                    <input 
                                        id="name" 
                                        type="text" 
                                        className="form-control" 
                                        aria-describedby="nameLabel"
                                        onInput={this.handleChange} />
                                    <label htmlFor="name">Name</label> 
                                </div>
                                <div className="form-floating mb-3">
                                    <select id="categoryId" className="form-select" defaultValue="" onChange={this.handleChange}>
                                        <option disabled hidden value=""></option>
                                        {getCategories().map((category) => (<option key={category._id} value={category._id}>{category.name}</option>))}
                                    </select>  
                                    <label htmlFor="name">Category</label> 
                                </div>
                                <div className="form-floating mb-3">
                                    <input 
                                        id="numberInStock" 
                                        type="text" 
                                        className="form-control" 
                                        aria-describedby="stockLabel"
                                        onInput={this.handleChange} />   
                                    <label htmlFor="name">Stock</label> 
                                </div>
                                <div className="form-floating mb-3">
                                    <input 
                                        id="price" 
                                        type="text" 
                                        className="form-control" 
                                        aria-describedby="priceLabel"
                                        onInput={this.handleChange} />   
                                    <label htmlFor="name">Price</label> 
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="reset" className="btn btn-outline-secondary" onClick={this.props.onCancel}>
                                    <i className="fas fa-ban" aria-hidden="true" /> Cancel
                                </button>
                                <button type="button" className="btn btn-outline-primary" onClick={this.handleSave} disabled={Object.entries(this.state.food).length < 4}>
                                    <i className="fas fa-sd-card" aria-hidden="true" /> Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddFood;
