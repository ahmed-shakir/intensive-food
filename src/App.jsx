import React, { Component } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Foods from './components/Foods';
import Customers from './components/Customers';
import Orders from './components/Orders';
import NotFound from './components/NotFound';
import FoodForm from './components/forms/FoodForm';
import RegisterForm from './components/forms/RegisterForm';
import LoginForm from './components/forms/LoginForm';
import Logout from './components/Logout';
import Navbar from './components/common/navbar/Navbar';
import NavbarLink from './components/common/navbar/NavbarLink';
import ProtectedRoute from './components/common/ProtectedRoute';
import auth from './services/authService';

class App extends Component {
    state = {
        user: null
    };

    componentDidMount() {
        this.setState({ user: auth.getCurrentUser() });
    }

    render() {
        const { user } = this.state;

        return (
            <>
                <ToastContainer theme="colored" />
                <Navbar title="Intensive Food" logoStyle="fas fa-store-alt">
                    <NavbarLink to="/foods" label="Foods" />
                    <NavbarLink to="/customers" label="Customers" />
                    <NavbarLink to="/orders" label="Orders" />
                    {!user && (
                        <>
                            <NavbarLink to="/register" label="Register" />
                            <NavbarLink to="/login" label="Login" />
                        </>
                    )}
                    {user && (
                        <>
                            <NavbarLink to="/profile" label={user.name} />
                            <NavbarLink to="/logout" label="Logout" />
                        </>
                    )}
                </Navbar>
                <div className="container">
                    <Switch>
                        <ProtectedRoute path="/foods/:id" component={FoodForm} />
                        <Route path="/foods" render={(props) => <Foods user={this.state.user} {...props} />} />
                        <Route path="/customers" component={Customers} />
                        <Route path="/orders" component={Orders} />
                        <Route path="/register" component={RegisterForm} />
                        <Route path="/login" component={LoginForm} />
                        <Route path="/logout" component={Logout} />
                        <Route path="/not-found" component={NotFound} />
                        <Redirect exact from="/" to="/foods" />
                        <Redirect to="/not-found" />
                    </Switch>
                </div>
            </>
        );
    }
}

export default App;
