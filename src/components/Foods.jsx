import React, { Component } from 'react';
import { getFoods } from "../services/fakeFoodService";
import { deleteData, getData, storeData } from '../services/localStorageService';
import AddFood from './AddFood';
import Food from './Food';

class Foods extends Component {
  static LOCAL_STORAGE_KEY = "foods";
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

  handleDataReset = () => {
    deleteData(Foods.LOCAL_STORAGE_KEY);
    window.location.reload();
  };

  loadData() {
    if(!getData(Foods.LOCAL_STORAGE_KEY)) {
      this.saveData(getFoods());
    }
    return getData(Foods.LOCAL_STORAGE_KEY);
  }

  saveData(data) {
    storeData(Foods.LOCAL_STORAGE_KEY, data);
  }

  getNoDataView() {
    return (<>
      <p>There are no foods in the database</p>
      <button onClick={this.handleDataReset} className="btn btn-outline-success btn-sm m-1" title="reset data"><i className="fas fa-recycle" aria-hidden="true" /> Reset data</button>
    </>);
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
        {this.state.foods.length === 0 ? this.getNoDataView() : (

          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Category</th>
                <th scope="col">Stock</th>
                <th scope="col">Price</th>
                <th scope="col">
                  <button onClick={this.handleNewFood} className="btn btn-success btn-sm m-1" title="add new entry"><i className="fas fa-plus" aria-hidden="true" /></button>
                </th>
              </tr>
            </thead>
            <tbody>
              {this.state.foods.map((food) => (<Food key={food._id} data={food} onSave={this.handleSave} onEdit={this.handleEdit} onDelete={this.handleDelete} onCancel={this.handleCancel} />))}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}

export default Foods;
