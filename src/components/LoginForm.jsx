import React from 'react';
import Form from './common/form/Form';
import Joi from 'joi';

class LoginForm extends Form {
    state = {
        data: {
            username: "",
            password: ""
        },
        errors: {}
    };
    schema = Joi.object({
        username: Joi.string().min(3).required().label("Username"),
        password: Joi.string().min(6).required().label("Password")
    });

    doSubmit = () => {
        console.log("Logged in successfully!");
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                {this.renderInput("username", "Username", "text", "Enter you e-mail here")}
                {this.renderInput("password", "Password", "password", "Enter you secret password here")}
                {this.renderButton("Login")}
            </form>
        );
    }
}

export default LoginForm;
