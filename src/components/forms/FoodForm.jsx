import React from "react";
import Form from "../common/form/Form";
import http from "../../services/httpService";
import { foodApiEndpoint, categoryApiEndpoint } from "../../config.json";
import { transformToBackendObject } from "../../utils/foodUtils";
import { toast } from "react-toastify";
import Joi from 'joi';

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
        price: Joi.number().min(0).max(10).required().label("Price")
    }).unknown(true);

    async componentDidMount() {
        const id = this.props.match.params.id;
        if (id && id !== "new") {
            const { data } = await http.get(`${foodApiEndpoint}/${id}`);
            this.setState({ data: transformToBackendObject(data) });
        }
        const { data: categories } = await http.get(categoryApiEndpoint);
        this.setState({ categories });
    }

    doSubmit = async () => {
        const data = this.state.data;

        if (data._id) {
            try {
                await http.put(`${foodApiEndpoint}/${data._id}`, data);
                toast.success("Food updated");
            } catch (error) {
                console.log("update error", error)
                if (error.status === "400") {
                    toast.error("Food cannot be updated");
                }
            }
        } else {
            try {
                await http.post(foodApiEndpoint, data);
                toast.success("Food created");
            } catch (error) {
                if (error.code === "400") {
                    toast.error("Food cannot be created");
                }
            }
        }

        this.setState({ data: DEFAULT_DATA, errors: {} });
        this.props.history.goBack();
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
