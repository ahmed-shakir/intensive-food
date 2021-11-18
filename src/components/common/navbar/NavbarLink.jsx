import React from 'react';
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

function NavbarLink({to, label}) {
    return (<NavLink to={to} className="nav-link">{label}</NavLink>);
}

export default NavbarLink;

NavbarLink.propTypes = {
    to: PropTypes.string.isRequired, 
    label: PropTypes.string.isRequired
};
