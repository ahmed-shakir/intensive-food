import React from 'react';
import PropTypes from "prop-types";

function InputField({ type, inputRef, label, className, isReadOnly, isValid }) {
    const validStyle = "is-valid";
    const invalidStyle = "is-invalid";
    const styleClasses = "form-control".concat((className && className.length > 0) ? " ".concat(className) : "")
        .concat(" ")
        .concat(isValid === null || isValid === undefined || isReadOnly ? "" : isValid ? validStyle : invalidStyle);

    return (
        <div className="form-floating">
            <input
                id="input"
                type={type}
                className={styleClasses}
                aria-labelledby="inputLabel"
                min="0"
                ref={inputRef}
                readOnly={isReadOnly}
                disabled={isReadOnly} />
            <label id="inputLabel" htmlFor="input">{label}</label>
        </div>
    );
}

export default InputField;

InputField.propTypes = {
    type: PropTypes.string.isRequired,
    inputRef: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    className: PropTypes.string,
    isReadOnly: PropTypes.bool.isRequired
};

InputField.defaultProps = {
    type: "text",
    label: "",
    isReadOnly: false,
    isValid: null
};
