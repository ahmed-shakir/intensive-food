import React from 'react';
import PropTypes from "prop-types";

function Button({ label, iconClass, ...restProps }) {
    return (
        <button label={label} {...restProps}>
            {iconClass && <i className={iconClass} aria-hidden="true" />}
            {iconClass && " "}
            {label}
        </button>
    );
}

export default Button;

Button.propTypes = {
    label: PropTypes.string.isRequired,
    iconClass: PropTypes.string
};

Button.defaultProps = {
    label: "Submit",
    iconClass: ""
};
