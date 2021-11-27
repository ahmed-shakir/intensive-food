import React from 'react';
import { Redirect } from 'react-router';
import { toast } from "react-toastify";
import Joi from 'joi';
import Form from '../common/form/Form';
import auth from '../../services/authService';

class LoginForm extends Form {
    state = {
        data: {
            username: "",
            password: ""
        },
        errors: {}
    };
    schema = Joi.object({
        username: Joi.string().email({ tlds: { allow: false } }).required().label("Username"),
        password: Joi.string().min(5).required().label("Password")
    });

    doSubmit = async () => {
        try {
            await auth.login(this.state.data);
            const {state} = this.props.location;
            window.location = state ? state.from.pathname : "/";
        } catch (error) {
            if (error.response.status === 400) {
                toast.error(error.response.data);
                const errors = {username: error.response.data, password: error.response.data};
                this.setState({errors});
            }
        }
    };

    render() {
        if(auth.getCurrentUser()) return <Redirect to="/" />;
        return (
            <form onSubmit={this.handleSubmit}>
                {this.renderInput("username", "Username", "text", "Enter your e-mail here")}
                {this.renderInput("password", "Password", "password", "Enter your secret password here")}
                {this.renderButton("Login")}
            </form>
        );
    }
}

export default LoginForm;
