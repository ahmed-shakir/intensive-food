import React from 'react';
import PropTypes from "prop-types";
import InputField from './InputField';

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
            <InputField
                {...restProps}
                name={name}
                label={label}
                error={error}
                helpText={helpText}
                value={value}
                className={inputStyleClasses}
                isReadOnly={isReadOnly} />
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
