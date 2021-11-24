import React from 'react';
import Form from '../common/form/Form';
import Joi from 'joi';

class RegisterForm extends Form {
    state = {
        data: {
            username: "",
            password: "",
            name: ""
        },
        errors: {}
    };
    schema = Joi.object({
        username: Joi.string().email({tlds: {allow: false}}).required().label("Username"),
        password: Joi.string().min(5).required().label("Password"),
        name: Joi.string().allow("").optional().label("Name")
    });

    doSubmit = () => {
        console.log("Registered successfully!");
        this.props.history.push("/login");
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                {this.renderInput("username", "Username", "text", "Enter you e-mail here")}
                {this.renderInput("password", "Password", "password", "Enter you secret password here")}
                {this.renderInput("name", "Name", "text", "Enter you fullname here")}
                {this.renderButton("Register")}
            </form>
        );
    }
}

export default RegisterForm;
