import React from "react";
import { toast } from "react-toastify";
import Joi from 'joi';
import Form from "../common/form/Form";
import * as foodService from "../../services/foodService";
import * as categoryService from "../../services/categoryService";
import { transformToDTO } from "../../utils/foodUtils";

const DEFAULT_DATA = {
    name: "",
    categoryId: "",
    numberInStock: "",
    price: ""
};

class FoodForm extends Form {
    state = {
        data: DEFAULT_DATA,
        errors: {},
        categories: []
    };
    schema = Joi.object({
        _id: Joi.string().optional(),
        name: Joi.string().min(3).required().label("Name"),
        categoryId: Joi.string().required().label("Category"),
        numberInStock: Joi.number().min(0).max(100).required().label("Stock"),
        price: Joi.number().min(0).max(10).required().label("Price"),
        isLiked: Joi.boolean().optional()
    });

    async componentDidMount() {
        const id = this.props.match.params.id;
        if (id && id !== "new") {
            const data = transformToDTO(await this.getFood(id));
            this.setState({ data });
        }
        const categories = await this.getCategories();
        this.setState({ categories });
    }

    doSubmit = async () => {
        try {
            await foodService.saveFood(this.state.data);
            toast.success("Food saved");
        } catch (error) {
            if (error.response.status === 400) {
                toast.error("Food cannot be saved");
            }
        }
        this.setState({ data: DEFAULT_DATA, errors: {} });
        this.props.history.replace("/");
    };
    
    getFood = async (id) => {
        try {
            return (await foodService.getFood(id)).data;
        } catch (error) {
            if (error.response.status === 400) {
                toast.error("Food cannot be retrieved");
            }
            if (error.response.status === 404) {
                toast.error("Food not found");
            }
        }
    };

    getCategories = async () => {
        try {
            return (await categoryService.getCategories()).data;
        } catch (error) {
            if (error.response.status === 400) {
                toast.error("Categories cannot be retrieved");
            }
        }
    };

    render() {
        return (
            <>
                <h1>Food form</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("name", "Name")}
                    {this.renderSelect("categoryId", "Category", this.state.categories)}
                    {this.renderInput("numberInStock", "Stock", "number")}
                    {this.renderInput("price", "Price", "number")}
                    {this.renderButton("Save")}
                </form>
            </>
        );
    }
}

export default FoodForm;
