import React from "react";
import Form from "./common/form/Form";
import Modal from "./common/Modal";
import { getCategories } from "../services/fakeCategoryService";
import PropTypes from "prop-types";
import Joi from 'joi';

const DEFAULT_DATA = {
    name: "",
    category: { _id: "" },
    numberInStock: "",
    price: ""
};

class FoodFormModal extends Form {
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

    doSubmit = () => {
        this.props.onSave(this.state.data);
        const newData = {...DEFAULT_DATA};
        newData.category._id = "";
        this.setState({ data: newData, errors: {} });
    };

    handleCancel = () => {
        this.props.onCancel(this.state.data);
        const newData = {...DEFAULT_DATA};
        newData.category._id = "";
        this.setState({ data: newData, errors: {} });
    };

    render() {
        return (
            <Modal title="Add food" hidden={this.props.hidden} submitDisabled={this.validate() !== null} onSubmit={this.handleSubmit} onCancel={this.handleCancel}>
                {this.renderInput("name", "Name")}
                {this.renderSelect("category._id", "Category", getCategories())}
                {this.renderInput("numberInStock", "Stock", "number")}
                {this.renderInput("price", "Price", "number")}
            </Modal>
        );
    }
}

export default FoodFormModal;

FoodFormModal.propTypes = {
    hidden: PropTypes.bool.isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
};

FoodFormModal.defaultProps = {
    hidden: false
};
