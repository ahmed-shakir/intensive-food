import React from 'react';
import { Route, Redirect } from "react-router-dom";
import auth from '../../services/authService';

function ProtectedRoute({ component: Component, render, ...restProps }) {
    return (
        <Route
            {...restProps}
            render={(props) => {
                if (!auth.getCurrentUser()) {
                    return (<Redirect to={{
                        pathname: "/login",
                        state: {
                            from: props.location
                        }
                    }} />);
                }
                return Component ? <Component {...props} /> : render(props);
            }} />
    );
}

export default ProtectedRoute;
