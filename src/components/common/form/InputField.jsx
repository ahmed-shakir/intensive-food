import React from 'react';
import PropTypes from "prop-types";

function InputField({ name, label, value, error, helpText, className, isReadOnly, ...restProps }) {
    return (
        <>
            <input
                {...restProps}
                id={name}
                name={name}
                autoComplete={name}
                value={value}
                className={className}
                aria-label={name}
                aria-labelledby={name + "Label"}
                min="0"
                readOnly={isReadOnly}
                disabled={isReadOnly} />
            {label && <label id={name + "Label"} htmlFor={name}>{label}</label>}
            {error && helpText && <div id={name + "Help"} className="form-text">{helpText}</div>}
            {error && <div id={name + "Validation"} className="invalid-feedback">{error}</div>}
        </>
    );
}

export default InputField;

InputField.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    error: PropTypes.string,
    helpText: PropTypes.string,
    className: PropTypes.string,
    isReadOnly: PropTypes.bool
};

InputField.defaultProps = {
    name: "",
    label: "",
    value: "",
    className: "",
    isReadOnly: false
};
