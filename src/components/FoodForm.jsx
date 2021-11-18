import React from "react";
import Form from "./common/form/Form";
import { getFood, saveFood } from "../services/fakeFoodService";
import { getCategories } from "../services/fakeCategoryService";
import Joi from 'joi';

const DEFAULT_DATA = {
    name: "",
    category: { _id: "" },
    numberInStock: "",
    price: ""
};

class FoodForm extends Form {
    state = {
        data: DEFAULT_DATA,
        errors: {}
    };
    schema = Joi.object({
        _id: Joi.string().optional(),
        name: Joi.string().min(3).required().label("Name"),
        category: {
            _id: Joi.string().required().label("Category id"),
            name: Joi.string().optional()
        },
        numberInStock: Joi.number().min(0).max(100).required().label("Stock"),
        price: Joi.number().min(0).max(10).required().label("Price")
    });

    componentDidMount() {
        const id = this.props.match.params.id;
        if (id && id !== "new") {
            const data = getFood(id);
            this.setState({ data });
        }
    }

    doSubmit = () => {
        saveFood(this.state.data);
        const newData = { ...DEFAULT_DATA };
        newData.category._id = "";
        this.setState({ data: newData, errors: {} });
        this.props.history.goBack();
    };

    render() {
        return (
            <>
                <h1>Food form</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("name", "Name")}
                    {this.renderSelect("category._id", "Category", getCategories())}
                    {this.renderInput("numberInStock", "Stock", "number")}
                    {this.renderInput("price", "Price", "number")}
                    {this.renderButton("Save")}
                </form>
            </>
        );
    }
}

export default FoodForm;
