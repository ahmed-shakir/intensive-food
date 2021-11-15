import React from 'react';
import Form from './common/form/Form';
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
        /* name: Joi.string().min(3).required().label("Name"),
        category: { _id: Joi.string().required().label("Category") },
        numberInStock: Joi.number().min(0).max(100).required().label("Stock"),
        price: Joi.number().min(5).max(50).required().label("Price") */
        name: Joi.string().allow("").optional().label("Name"),
        category: { _id: Joi.string().allow("").optional().label("Category") },
        numberInStock: Joi.number().allow("").optional().label("Stock"),
        price: Joi.number().allow("").optional().label("Price")
    });

    /* componentDidMount() {
        const data = {...this.props.data};
        this.setState({ data });
    } */

    doSubmit = () => {
        console.log("Save form");
        this.props.history.goBack();
    };

    render() {
        return (
            <>
                <h1>Food form {this.props.match.params.id}</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderButton("Save")}
                </form>
            </>
        );
    }
}

export default FoodForm;
