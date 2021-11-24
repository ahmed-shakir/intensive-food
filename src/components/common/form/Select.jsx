import React from 'react';
import PropTypes from "prop-types";

function Select({ data, name, label, value, error, helpText, className, isReadOnly, isInline, idProperty, nameProperty, ...restProps }) {
    const validStyle = "is-valid";
    const invalidStyle = "is-invalid";
    const containerStyleClasses = "form-floating" + (!isInline ? " mt-2 mb-2" : "");
    let inputStyleClasses = "form-control"; 
    inputStyleClasses += (className.length > 0) ? " ".concat(className) : "";
    inputStyleClasses += (isReadOnly || (value.length === 0 && (error === null || error === undefined))) ? "" 
    : (value.length > 0 && (error === null || error === undefined)) ? " ".concat(validStyle) 
    : " ".concat(invalidStyle);

    return (
        <div className={containerStyleClasses}>
            <select
                {...restProps}
                id={name}
                name={name}
                value={value}
                className={inputStyleClasses}
                aria-labelledby={name + "Label"}
                readOnly={isReadOnly}
                disabled={isReadOnly}>
                <option disabled hidden value=""></option>
                {data.map((item) => (<option key={item[idProperty]} value={item[idProperty]}>{item[nameProperty]}</option>))}
            </select>
            <label id={name + "Label"} htmlFor={name}>{label}</label>
            {error && helpText && <div id={name + "Help"} className ="form-text">{helpText}</div>}
            {error && <div id={name + "Validation"} className="invalid-feedback">{error}</div>}
        </div>
    );
}

export default Select;

Select.propTypes = {
    data: PropTypes.array.isRequired, // TODO: add more specific array content-type
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    error: PropTypes.string,
    helpText: PropTypes.string,
    className: PropTypes.string,
    isReadOnly: PropTypes.bool,
    isInline: PropTypes.bool,
    idProperty: PropTypes.string.isRequired,
    nameProperty: PropTypes.string.isRequired
};

Select.defaultProps = {
    name: "",
    label: "",
    value: "",
    className: "",
    isReadOnly: false,
    isInline: false,
    idProperty: "_id",
    nameProperty: "name"
};
