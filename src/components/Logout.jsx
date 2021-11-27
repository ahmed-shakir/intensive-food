import { Component } from 'react';
import auth from '../services/authService';

class Logout extends Component {
    componentDidMount() {
        try {
            auth.logout();
            window.location = "/";
        } catch (error) { }
    }

    render() {
        return null;
    }
}

export default Logout;
