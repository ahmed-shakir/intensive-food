import React from 'react';
import Form from '../common/form/Form';
import Joi from 'joi';
import user from '../../services/userService';
import auth from '../../services/authService';
import { toast } from "react-toastify";

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

    doSubmit = async () => {
        try {
            const { headers } = await user.register(this.state.data);
            auth.loginWithJwt(headers["x-auth-token"]);
            window.location = "/";
            toast.success("User registered");
            toast.info("Welcome " + this.state.data.name);
        } catch (error) {
          if (error.response.status === 400) {
            toast.error("User cannot be registered");
            const errors = {username: error.response.data};
            this.setState({errors});
          }
        }
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                {this.renderInput("username", "Username", "text", "Enter your e-mail here")}
                {this.renderInput("password", "Password", "password", "Enter your secret password here")}
                {this.renderInput("name", "Name", "text", "Enter your fullname here")}
                {this.renderButton("Register")}
            </form>
        );
    }
}

export default RegisterForm;
