import React, { Component } from 'react';
import FoodEdit from './FoodEdit';
import { getFoods } from "../services/fakeFoodService";
import { getData, storeData } from '../services/localStorageService';
import AddFood from './AddFood';

class Foods extends Component {
  state = {
    foods: this.loadData(),
    isAddingNew: false
  };

  handleNewFood = () => {
    this.setState({ isAddingNew: true })
  };

  handleSave = (food) => {
    const foods = this.state.foods.map((f) => {
      if(f._id === food._id) {
        food.isEditing = false;
        return food;
      }
      return f;
    });

    if(foods.find((f) => f._id === food._id) === undefined) {
      foods.push(food);
    }
    this.saveData(foods);
    this.setState({ foods: foods, isAddingNew: false });
  };

  handleEdit = (food) => {
    const foods = this.state.foods.map((f) => {
      if(f._id === food._id) {
         f.isEditing = true;
      }
      return f;
    });
    this.setState({ foods });
  };

  handleCancel = (food) => {
    const foods = this.state.foods.map((f) => {
      if(food && f._id === food._id) {
         f.isEditing = false;
      }
      return f;
    });
    this.setState({ foods: foods, isAddingNew: false });
  };

  handleDelete = (food) => {
    const foods = this.state.foods.filter((f) => f._id !== food._id);
    this.saveData(foods);
    this.setState({ foods });
  };

  loadData() {
    if(!getData("foods")) {
      this.saveData(getFoods());
    }
    return getData("foods");
  }

  saveData(data) {
    storeData("foods", data);
  }

  getRow(food) {
    if(food.isEditing) {
      return (<FoodEdit key={food._id} food={food} onSave={this.handleSave} onCancel={this.handleCancel} />);
    } else {
      return (
        <tr key={food._id}>
          <td>{food.name}</td>
          <td>{food.category.name}</td>
          <td>{food.numberInStock}</td>
          <td>{food.price}</td>
          <td>
            <button onClick={() => this.handleEdit(food)} className="btn btn-primary btn-sm m-1"><i className="fas fa-pen" aria-hidden="true" /></button>
            <button onClick={() => this.handleDelete(food)} className="btn btn-danger btn-sm m-1"><i className="fas fa-trash-alt" aria-hidden="true" /></button>
          </td>
        </tr>
      );
    }
  }

  render() {
    return (
      <div className="container">
        <nav className="navbar navbar-light bg-light">
          <span className="navbar-brand h1">
            <i className="fas fa-store-alt m-2" aria-hidden="true" />
            Intensive Food
          </span>
          <span className="navbar-text">Showing {this.state.foods.length} foods in the database</span>
        </nav>

        <AddFood hidden={!this.state.isAddingNew} onCancel={this.handleCancel} onSave={this.handleSave} />
        {this.state.foods.length === 0 ? (<p>There are no foods in the database</p>) : (

          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Category</th>
                <th scope="col">Stock</th>
                <th scope="col">Price</th>
                <th scope="col">
                  <button onClick={this.handleNewFood} className="btn btn-success btn-sm m-1"><i className="fas fa-plus" aria-hidden="true" /></button>
                </th>
              </tr>
            </thead>
            <tbody>
              {this.state.foods.map((food) => (this.getRow(food)))}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}

export default Foods;
