import React, { Component } from "react";
import { toast } from "react-toastify";
import { logger } from "@sentry/utils";
import qs from "query-string";
import _ from "lodash";
import { getData } from "../services/storageService";
import FoodFormModal from "./forms/FoodFormModal";
import FoodsTable from "./FoodsTable";
import ListGroup from "./common/ListGroup";
import Button from "./common/form/Button";
import SearchForm from "./forms/SearchForm";
import Pagination from "./common/Pagination";
import { paginate } from "../utils/pagination";
import { transformToDTO } from "../utils/foodUtils";
import * as foodService from "../services/foodService";
import * as categoryService from "../services/categoryService";
import { foodsKey } from "../config.json";
import { Link } from "react-router-dom";

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
        const foods = await this.getFoods();
        const categories = await this.getCategories();
        this.setState({ foods, categories });
    }

    componentDidUpdate(prevProps) {
        if (this.state.selectedCategory._id && this.props.location.search && this.props.location.search !== prevProps.location.search) {
            this.setState({ selectedCategory: DEFAULT_CATEGORY, currentPage: 1 });
        }
    }


    handleNewFoodModal = () => {
        this.setState({ isAddingNew: true })
    };

    handleSave = async (food) => {
        const foods = [...this.state.foods];

        try {
            const savedFood = await foodService.saveFood(transformToDTO(food));
            toast.success("Food created");

            if (!food._id) {
                foods.push(savedFood);
            }
        } catch (error) {
            if (error.response.status === 400) {
                toast.error("Food cannot be created");
            }
        }

        if (food._id) {
            this.toggleEditMode(food);
        }
        this.setState({ foods, isAddingNew: false });
    };

    handleEdit = (food) => {
        this.toggleEditMode(food);
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

        try {
            await foodService.deleteFood(food._id);
            toast.success("Food deleted");
        } catch (error) {
            if (error.response.status === 404) {
                console.log("handleDelete - 404 - error", error.response);
                toast.error("Food has already been deleted");
            }
            this.setState({ foods: originalFoods });
        }
    };

    handleLike = async (food) => {
        food.isLiked = !food.isLiked
        const foods = [...this.state.foods];
        const index = foods.indexOf(food);
        foods[index].isLiked = food.isLiked;
        this.setState({ foods });

        try {
            await foodService.saveFood(transformToDTO(food));
            toast.success("Food liked");
        } catch (error) {
            if (error.response.status === 400) {
                toast.error("Food cannot be liked");
            }
        }
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
        if (!getData(foodsKey)) {
            console.log("No data in localstorage found.");
            logger.log("No data in localstorage found.");
            return [];
        }
        return getData(foodsKey);
    }

    toggleEditMode = (food) => {
        const foods = [...this.state.foods];
        const index = foods.indexOf(food);
        foods[index].isEditing = !food.isEditing;
        this.setState({ foods });
    }

    getFoods = async () => {
        try {
            return (await foodService.getFoods()).data;
        } catch (error) {
            if (error.response.status === 400) {
                toast.error("Foods cannot be retrieved");
            }
        }
    };

    getCategories = async () => {
        try {
            const { data: categories } = await categoryService.getCategories();
            return [DEFAULT_CATEGORY, ...categories];
        } catch (error) {
            if (error.response.status === 400) {
                toast.error("Categories cannot be retrieved");
            }
        }
    };

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
        const { user } = this.props;
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
                            {user && (
                                <>
                                    <Button type="button" label="" className="btn btn-success btn-sm m-1" iconClass="fas fa-plus" onClick={this.handleNewFoodModal} />
                                    <Link style={{ margingBottom: "5px" }} className="btn btn-primary btn-sm m-1" to="/foods/new">
                                        <i className="fas fa-plus" aria-hidden="true" /> New food
                                    </Link>
                                </>
                            )}
                            <p className="badge bg-secondary mb-1 ms-3 float-end">{`Showing ${filteredCount} of ${allFoods.length} foods in the database`}</p>
                            <SearchForm {...this.props} />
                            <FoodsTable
                                foods={foods}
                                user={user}
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
