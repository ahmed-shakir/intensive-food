import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import Foods from './components/Foods';
import Customers from './components/Customers';
import Orders from './components/Orders';
import NotFound from './components/NotFound';
import LoginForm from './components/LoginForm';
import FoodForm from './components/FoodForm';
import RegisterForm from './components/RegisterForm';
import Navbar from './components/common/navbar/Navbar';
import NavbarLink from './components/common/navbar/NavbarLink';

function App() {
    return (
        <>
            <Navbar title="Intensive Food" logoStyle="fas fa-store-alt">
                <NavbarLink to="/foods" label="Foods" />
                <NavbarLink to="/customers" label="Customers" />
                <NavbarLink to="/orders" label="Orders" />
                <NavbarLink to="/register" label="Register" />
                <NavbarLink to="/login" label="Login" />
            </Navbar>
            <div className="container">
                <Switch>
                    <Route path="/foods/:id" component={FoodForm} />
                    <Route path="/foods" component={Foods} />
                    <Route path="/customers" component={Customers} />
                    <Route path="/orders" component={Orders} />
                    <Route path="/register" component={RegisterForm} />
                    <Route path="/login" component={LoginForm} />
                    <Route path="/not-found" component={NotFound} />
                    <Redirect exact from="/" to="/foods" />
                    <Redirect to="/not-found" />
                </Switch>
            </div>
        </>
    );
}

export default App;
