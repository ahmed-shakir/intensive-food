import React, { Component } from 'react';
import { getFoods } from "../services/fakeFoodService";
import { deleteData, getData, storeData } from '../services/localStorageService';
import AddFood from './AddFood';
import Food from './Food';
import Pagination from './Pagination';

class Foods extends Component {
  static LOCAL_STORAGE_KEY = "foods";

  constructor() {
    super();
    this.state = {
      foods: [],
      pagination: this.setPagination(0, 5, 1),
      isAddingNew: false
    };
  }

  componentDidMount() {
    const foods = this.loadData();
    const pagination = this.setPagination(foods.length, 5, 1);
    this.setState({ foods, pagination });
  }

  handleNewFood = () => {
    this.setState({ isAddingNew: true })
  };

  handleSave = (food) => {
    const foods = [...this.state.foods];
    const pagination = this.setPagination(foods.length, 5, 1);

    if (foods.find((f) => f._id === food._id) === undefined) {
      foods.push(food);
    } else {
      const index = foods.indexOf(food);
      foods[index] = { ...food };
      foods[index].isEditing = false;
    }
    this.saveData(foods);
    this.setState({ foods: foods, pagination: pagination, isAddingNew: false });
  };

  handleEdit = (food) => {
    const foods = [...this.state.foods];
    const index = foods.indexOf(food);
    foods[index] = { ...food };
    foods[index].isEditing = true;
    this.setState({ foods });
  };

  handleCancel = (food) => {
    const foods = [...this.state.foods];
    const index = foods.indexOf(food);
    foods[index] = { ...food };
    foods[index].isEditing = false;
    this.setState({ foods: foods, isAddingNew: false });
  };

  handleDelete = (food) => {
    const foods = this.state.foods.filter((f) => f._id !== food._id);
    const pagination = this.setPagination(foods.length, 5, 1);
    this.saveData(foods);
    this.setState({ foods, pagination });
  };

  handleLike = (food) => {
    const foods = [...this.state.foods];
    const index = foods.indexOf(food);
    foods[index] = { ...food };
    foods[index].isLiked = !food.isLiked;
    this.saveData(foods);
    this.setState({ foods });
  };

  handlePageChange = (currentPage) => {
    const pagination = this.setPagination(this.state.foods.length, 5, currentPage);
    this.setState({ pagination });
  };

  handleDataReset = () => {
    deleteData(Foods.LOCAL_STORAGE_KEY);
    window.location.reload();
  };

  loadData() {
    if (!getData(Foods.LOCAL_STORAGE_KEY)) {
      this.saveData(getFoods());
    }
    return getData(Foods.LOCAL_STORAGE_KEY);
  }

  saveData(data) {
    storeData(Foods.LOCAL_STORAGE_KEY, data);
  }

  getPaginatedFoods() {
    const {currentPage, itemsPerPage} = this.state.pagination;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return this.state.foods.filter((food, i) => i >= startIndex && i < endIndex);
  }

  setPagination(numOfItems, itemsPerPage, currentPage) {
    const numOfPages = Math.ceil(numOfItems /itemsPerPage);
    return {numOfItems, numOfPages, itemsPerPage, currentPage};
  }

  getNoDataView() {
    return (
      <>
        <p>There are no foods in the database</p>
        <button onClick={this.handleDataReset} className="btn btn-outline-success btn-sm m-1"><i className="fas fa-recycle" aria-hidden="true" /> Reset data</button>
      </>
    );
  }

  render() {
    return (
      <>
        <AddFood hidden={!this.state.isAddingNew} onCancel={this.handleCancel} onSave={this.handleSave} />
        <div className="container">
          <nav className="navbar navbar-light bg-light">
            <span className="navbar-brand h1">
              <i className="fas fa-store-alt m-2" aria-hidden="true" />
              Intensive Food
            </span>
            <span className="navbar-text">Showing {this.state.foods.length} foods in the database</span>
          </nav>

          {this.state.foods.length === 0 ? this.getNoDataView() : (
            <>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Category</th>
                    <th scope="col">Stock</th>
                    <th scope="col">Price</th>
                    <th scope="col" />
                    <th scope="col">
                      <button onClick={this.handleNewFood} className="btn btn-success btn-sm m-1" title="add new entry"><i className="fas fa-plus" aria-hidden="true" /></button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {this.getPaginatedFoods().map((food) => (
                    <Food key={food._id}
                      data={food}
                      onSave={this.handleSave}
                      onEdit={this.handleEdit}
                      onDelete={this.handleDelete}
                      onCancel={this.handleCancel}
                      onLike={this.handleLike} />))}
                </tbody>
              </table>
              <Pagination data={this.state.pagination} onPageChange={this.handlePageChange} />
            </>
          )}
        </div>
      </>
    );
  }
}

export default Foods;
