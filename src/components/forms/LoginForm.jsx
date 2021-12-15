import React from 'react';
import { Redirect } from 'react-router';
import { toast } from "react-toastify";
import Joi from 'joi';
import useForm from '../../hooks/useForm';
import auth from '../../services/authService';

function LoginForm({ location }) {
    const initialData = { username: "", password: "" };
    const schema = Joi.object({
        username: Joi.string().email({ tlds: { allow: false } }).required().label("Username"),
        password: Joi.string().min(5).required().label("Password")
    });

    const doSubmit = async () => {
        console.log("Do submit...");
        try {
            await auth.login(data);
            const { state } = location;
            window.location = state ? state.from.pathname : "/";
        } catch (error) {
            if (error.response.status === 400) {
                toast.error(error.response.data);
                const errors = { username: error.response.data, password: error.response.data };
                setErrors(errors);
            }
        }
    };

    const { handleSubmit, renderInput, renderButton, setErrors, data } = useForm(initialData, schema, doSubmit);

    if (auth.getCurrentUser()) return <Redirect to="/" />;
    return (
        <form onSubmit={handleSubmit}>
            {renderInput("username", "Username", "text", "Enter your e-mail here")}
            {renderInput("password", "Password", "password", "Enter your secret password here")}
            {renderButton("Login")}
        </form>
    );
}

export default LoginForm;
