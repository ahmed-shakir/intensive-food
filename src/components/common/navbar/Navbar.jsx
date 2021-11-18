import React from 'react';
import PropTypes from "prop-types";

function Navbar({title, logoStyle, children}) {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container container-fluid">
                <span className="navbar-brand h1">
                    <i className={"m-2 " + logoStyle} aria-hidden="true" />
                    {title}
                </span>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        {children}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

Navbar.propTypes = {
    title: PropTypes.string.isRequired, 
    logoStyle: PropTypes.string
};

Navbar.defaultProps = {
    title: "", 
    logoStyle: ""
};
