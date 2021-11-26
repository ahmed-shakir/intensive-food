import React from "react";
import Form from "../common/form/Form";
import Modal from "../common/Modal";
import * as categoryService from "../../services/categoryService";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import Joi from 'joi';

const DEFAULT_DATA = {
    name: "",
    categoryId: "",
    numberInStock: "",
    price: ""
};

class FoodFormModal extends Form {
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
        const categories = await this.getCategories();
        this.setState({ categories });
    }
    

    doSubmit = () => {
        this.props.onSave(this.state.data);
        this.setState({ data: DEFAULT_DATA, errors: {} });
    };

    handleCancel = () => {
        this.props.onCancel();
        this.setState({ data: DEFAULT_DATA, errors: {} });
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
            <Modal title="Add food" hidden={this.props.hidden} submitDisabled={this.validate() !== null} onSubmit={this.handleSubmit} onCancel={this.handleCancel}>
                {this.renderInput("name", "Name")}
                {this.renderSelect("categoryId", "Category", this.state.categories)}
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
