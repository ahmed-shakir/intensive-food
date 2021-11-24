import React, { Component } from "react";
import { getData } from "../services/localStorageService";
import FoodFormModal from "./forms/FoodFormModal";
import FoodsTable from "./FoodsTable";
import ListGroup from "./common/ListGroup";
import Button from "./common/form/Button";
import SearchForm from "./forms/SearchForm";
import Pagination from "./common/Pagination";
import { paginate } from "../utils/pagination";
import { transformToBackendObject } from "../utils/foodUtils";
import fs from "../services/foodService";
import { localStorageKey } from "../config.json";
import qs from "query-string";
import _ from "lodash";
import { logger } from "@sentry/utils";

const DEFAULT_CATEGORY = { _id: "", name: "All categories" };

class Foods extends Component {
    constructor(props) {
        super(props);
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

    async componentDidMount() {
        const foods = await fs.getAll();
        const dbCategories = await fs.getCategories();
        const categories = [DEFAULT_CATEGORY, ...dbCategories];
        this.setState({ foods, categories });
    }

    componentDidUpdate(prevProps) {
        if (this.state.selectedCategory._id && this.props.location.search && this.props.location.search !== prevProps.location.search) {
            this.setState({ selectedCategory: DEFAULT_CATEGORY, currentPage: 1 });
        }
    }


    handleNewFood = () => {
        this.props.history.push("/foods/new");
    };

    handleNewFoodModal = () => {
        this.setState({ isAddingNew: true })
    };

    handleSave = async (food) => {
        const foods = [...this.state.foods];
        food = transformToBackendObject(food);

        if (food._id) {
            const index = foods.indexOf(foods.find((f) => f._id === food._id));
            foods[index].isEditing = false;
            await fs.update(food);
        } else {
            const newFood = await fs.post(food);
            foods.push(newFood);
        }
        this.setState({ foods, isAddingNew: false });
    };

    handleEdit = (food) => {
        const foods = [...this.state.foods];
        const index = foods.indexOf(food);
        foods[index].isEditing = true;
        this.setState({ foods });
    };

    handleCancel = (food) => {
        if (food) {
            const foods = [...this.state.foods];
            const index = foods.indexOf(food);
            foods[index].isEditing = false;
            this.setState({ foods, isAddingNew: false });
        } else {
            this.setState({ isAddingNew: false });
        }
    };

    handleDelete = async (food) => {
        const originalFoods = { ...this.state.foods };
        const foods = this.state.foods.filter((f) => f._id !== food._id);
        this.setState({ foods, currentPage: 1 });

        const deletedFood = await fs.delete(food);
        if(!deletedFood) this.setState({ foods: originalFoods });
    };

    handleLike = async (food) => {
        food.isLiked = !food.isLiked
        const foods = [...this.state.foods];
        const index = foods.indexOf(food);
        foods[index].isLiked = food.isLiked;
        this.setState({ foods });
        await fs.update(transformToBackendObject(food));
    };

    handleSort = (sortColumn) => {
        this.setState({ sortColumn })
    };

    handlePageChange = (currentPage) => {
        this.setState({ currentPage });
    };

    handleCategorySelect = (selectedCategory) => {
        const { location, history } = this.props;
        history.push({ pathname: location.pathname, search: "" });
        this.setState({ selectedCategory, currentPage: 1 });
    };

    handleDataReset = () => {
        this.loadData();
        window.location.reload();
    };

    loadData() {
        if (!getData(localStorageKey)) {
            console.log("No data in localstorage found.");
            logger.log("No data in localstorage found.");
            return [];
        }
        return getData(localStorageKey);
    }

    getPaginatedFoods = () => {
        const { foods: allFoods, selectedCategory, pageSize, currentPage, sortColumn } = this.state;
        const { search } = qs.parse(this.props.location.search);

        const filteredFoods = search ? allFoods.filter((f) => _.includes(f.name.toLowerCase(), search.toLowerCase()))
            : selectedCategory._id ? allFoods.filter((f) => f.category._id === selectedCategory._id)
                : allFoods;

        const sortedFoods = _.orderBy(filteredFoods, [sortColumn.path], [sortColumn.order]);
        const foods = paginate(sortedFoods, currentPage, pageSize);
        return { filteredCount: filteredFoods.length, foods };
    };

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
        const { filteredCount, foods } = this.getPaginatedFoods();

        return (
            <>
                <FoodFormModal hidden={!isAddingNew} onCancel={this.handleCancel} onSave={this.handleSave} />

                {allFoods.length === 0 ? this.getNoDataView() : (
                    <div className="row pt-2">
                        <div className="col-2 pt-1">
                            <ListGroup items={categories} selectedItem={selectedCategory} onItemSelect={this.handleCategorySelect} />
                        </div>
                        <div className="col">
                            <Button type="button" label="" className="btn btn-success btn-sm m-1" iconClass="fas fa-plus" onClick={this.handleNewFoodModal} />
                            <Button style={{ margingBottom: "5px" }} type="button" label="New food" className="btn btn-primary btn-sm m-1" iconClass="fas fa-plus" onClick={this.handleNewFood} />
                            <p className="badge bg-secondary mb-1 float-end">{`Showing ${filteredCount} of ${allFoods.length} foods in the database`}</p>
                            <SearchForm {...this.props} />
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
                            <Pagination numOfItems={filteredCount} pageSize={pageSize} currentPage={currentPage} onPageChange={this.handlePageChange} />
                        </div>
                    </div>
                )}
            </>
        );
    }
}

export default Foods;
