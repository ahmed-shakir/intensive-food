import React from 'react';
import PropTypes from "prop-types";

function Input({ name, label, value, error, helpText, className, isReadOnly, isInline, ...restProps }) {
    const validStyle = "is-valid";
    const invalidStyle = "is-invalid";
    const containerStyleClasses = "form-floating" + (!isInline ? " mt-3 mb-3" : "");
    let inputStyleClasses = "form-control"; 
    inputStyleClasses += (className.length > 0) ? " ".concat(className) : "";
    inputStyleClasses += (isReadOnly || (value.length === 0 && (error === null || error === undefined))) ? ""
    : (((typeof value === "number" && value > 0) || (typeof value === "string" && value.length > 0)) && (error === null || error === undefined)) ? " ".concat(validStyle) 
    : " ".concat(invalidStyle);

    return (
        <div className={containerStyleClasses}>
            <input
            {...restProps}
                id={name}
                name={name}
                value={value}
                className={inputStyleClasses}
                aria-labelledby={name + "Label"}
                min="0"
                readOnly={isReadOnly}
                disabled={isReadOnly} />
            <label id={name + "Label"} htmlFor={name}>{label}</label>
            {error && helpText && <div id={name + "Help"} className ="form-text">{helpText}</div>}
            {error && <div id={name + "Validation"} className="invalid-feedback">{error}</div>}
        </div>
    );
}

export default Input;

Input.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    error: PropTypes.string,
    helpText: PropTypes.string,
    className: PropTypes.string,
    isReadOnly: PropTypes.bool,
    isInline: PropTypes.bool
};

Input.defaultProps = {
    name: "",
    label: "",
    value: "",
    className: "",
    isReadOnly: false,
    isInline: false
};
