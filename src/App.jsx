import React from 'react';
import { Switch, Route, NavLink, Redirect } from "react-router-dom";
import Foods from './components/Foods';
import Customers from './components/Customers';
import Orders from './components/Orders';
import NotFound from './components/NotFound';
import LoginForm from './components/LoginForm';
import FoodForm from './components/FoodForm';
import RegisterForm from './components/RegisterForm';

function App(props) {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container container-fluid">
                    <span className="navbar-brand h1">
                        <i className="fas fa-store-alt m-2" aria-hidden="true" />
                        Intensive Food
                    </span>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <NavLink to="/foods" className="nav-link">Foods</NavLink>
                            <NavLink to="/customers" className="nav-link">Customers</NavLink>
                            <NavLink to="/orders" className="nav-link">Orders</NavLink>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="container">
                <Switch>
                    <Route path="/foods/:id" component={FoodForm} />
                    <Route path="/foods" component={Foods} />
                    <Route path="/customers" component={Customers} />
                    <Route path="/orders" component={Orders} />
                    <Route path="/not-found" component={NotFound} />
                    <Redirect exact from="/" to="/foods" />
                    <Redirect to="/not-found" />
                </Switch>
            </div>
        </>
    );
}

export default App;
