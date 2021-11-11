import React from "react";
import Form from "./common/form/Form";
import Modal from "./common/Modal";
import { saveFood } from "../services/fakeFoodService";
import { getCategories } from "../services/fakeCategoryService";
import PropTypes from "prop-types";
import Joi from 'joi';

class FoodForm extends Form {
    state = {
        data: {
            name: "",
            category: { _id: "" },
            numberInStock: "",
            price: ""
        },
        errors: {}
    };
    schema = Joi.object({
        name: Joi.string().min(3).required().label("Name"),
        category: { _id: Joi.string().required().label("Category") },
        numberInStock: Joi.number().min(0).max(100).required().label("Stock"),
        price: Joi.number().min(5).max(50).required().label("Price")
    });

    doSubmit = () => {
        const food = saveFood({ ...this.state.data });
        const data = {
            name: "",
            category: { _id: "" },
            numberInStock: "",
            price: ""
        };
        this.setState({ data });
        this.props.onSave(food);
    };

    handleCancel = () => {
        const data = {
            name: "",
            category: { _id: "" },
            numberInStock: "",
            price: ""
        };
        this.setState({ data });
        this.props.onCancel();
    };

    render() {
        return (
            <Modal title="Add food" hidden={this.props.hidden} submitDisabled={this.validate()} onSubmit={this.handleSubmit} onCancel={this.handleCancel}>
                {this.renderInput("name", "Name")}
                {this.renderSelect("category._id", "Category", getCategories())}
                {this.renderInput("numberInStock", "Stock", "number")}
                {this.renderInput("price", "Price", "number")}
            </Modal>
        );
    }
}

export default FoodForm;

FoodForm.propTypes = {
    hidden: PropTypes.bool.isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
};

FoodForm.defaultProps = {
    hidden: false
};
