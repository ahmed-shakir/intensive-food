import React, { Component } from "react";
import { getFoods } from "../services/fakeFoodService";
import { getCategories } from "../services/fakeCategoryService";
import { deleteData, getData, storeData } from "../services/localStorageService";
import AddFood from "./AddFood";
import FoodsTable from "./FoodsTable";
import ListGroup from "./common/ListGroup";
import Pagination from "./common/Pagination";
import { paginate } from "../utils/pagination";
import _ from "lodash";

const DEFAULT_CATEGORY = { _id: "", name: "All categories" };

class Foods extends Component {
    static LOCAL_STORAGE_KEY = "foods";

    constructor() {
        super();
        this.state = {
            foods: [],
            categories: [],
            selectedCategory: DEFAULT_CATEGORY,
            pageSize: 4,
            currentPage: 1,
            isAddingNew: false,
            sortColumn: { path: "name", order: "asc" }
        };
    }

    componentDidMount() {
        const foods = this.loadData();
        const categories = [DEFAULT_CATEGORY, ...getCategories()];
        this.setState({ foods, categories });
    }


    handleNewFood = () => {
        this.setState({ isAddingNew: true })
    };

    handleSave = (food) => {
        const foods = [...this.state.foods];

        if (foods.find((f) => f._id === food._id) === undefined) {
            foods.push(food);
        } else {
            const index = foods.indexOf(food);
            foods[index] = { ...food };
            foods[index].isEditing = false;
        }
        this.saveData(foods);
        this.setState({ foods: foods, isAddingNew: false });
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
        this.saveData(foods);
        this.setState({ foods });
    };

    handleLike = (food) => {
        const foods = [...this.state.foods];
        const index = foods.indexOf(food);
        foods[index] = { ...food };
        foods[index].isLiked = !food.isLiked;
        this.saveData(foods);
        this.setState({ foods });
    };

    handleSort = (sortColumn) => {
        this.setState({ sortColumn })
    };

    handlePageChange = (currentPage) => {
        this.setState({ currentPage });
    };

    handleCategorySelect = (selectedCategory) => {
        this.setState({ selectedCategory, currentPage: 1 });
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

    getNoDataView() {
        return (
            <>
                <p>There are no foods in the database</p>
                <button onClick={this.handleDataReset} className="btn btn-outline-success btn-sm m-1"><i className="fas fa-recycle" aria-hidden="true" /> Reset data</button>
            </>
        );
    }

    render() {
        const { foods: allFoods, categories, selectedCategory, pageSize, currentPage, sortColumn, isAddingNew } = this.state;
        const filteredFoods = selectedCategory._id ? allFoods.filter((f) => f.category._id === selectedCategory._id) : allFoods;
        const sortedFoods = _.orderBy(filteredFoods, [sortColumn.path], [sortColumn.order]);
        const foods = paginate(sortedFoods, currentPage, pageSize);

        return (
            <div className="container">
                <nav className="navbar navbar-light bg-light">
                    <span className="navbar-brand h1">
                        <i className="fas fa-store-alt m-2" aria-hidden="true" />
                        Intensive Food
                    </span>
                    <span className="navbar-text">{`Showing ${filteredFoods.length} of ${allFoods.length} foods in the database`}</span>
                </nav>

                <AddFood hidden={!isAddingNew} onCancel={this.handleCancel} onSave={this.handleSave} />

                {allFoods.length === 0 ? this.getNoDataView() : (
                    <div className="row pt-2">
                        <div className="col-2 pt-3">
                            <ListGroup items={categories} selectedItem={selectedCategory} onItemSelect={this.handleCategorySelect} />
                        </div>
                        <div className="col">
                            <FoodsTable foods={foods}
                                sortColumn={sortColumn}
                                isAddingNew={isAddingNew}
                                onNewFood={this.handleNewFood}
                                onSave={this.handleSave}
                                onEdit={this.handleEdit}
                                onDelete={this.handleDelete}
                                onCancel={this.handleCancel}
                                onLike={this.handleLike}
                                onSort={this.handleSort} />
                            <Pagination numOfItems={filteredFoods.length} pageSize={pageSize} currentPage={currentPage} onPageChange={this.handlePageChange} />
                            <button onClick={this.handleNewFood} className="btn btn-success btn-sm m-1" title="add new entry"><i className="fas fa-plus" aria-hidden="true" /></button>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default Foods;
