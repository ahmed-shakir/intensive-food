import React from 'react';
import {Switch, Route} from "react-router-dom";
import Foods from './components/Foods';
import LoginForm from './components/LoginForm';

function App(props) {
    return (
        <div className="container">
            <Switch>
                <Route path="/login" component={LoginForm} />
                <Route path="/" component={Foods} />
            </Switch>
        </div>
    );
}

export default App;
