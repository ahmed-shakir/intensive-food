import React from 'react';
import PropTypes from "prop-types";
import Button from "./Button";
import InputField from './InputField';

function SearchInput({ name, label, value, error, helpText, className, disabled, isReadOnly, isInline, ...restProps }) {
    const containerStyleClasses = "input-group" + (!isInline ? " mt-2 mb-2" : "");
    let inputStyleClasses = "form-control";
    inputStyleClasses += (className.length > 0) ? " ".concat(className) : "";

    return (
        <div className={containerStyleClasses}>
            <InputField
                style={{ boxShadow: "0 0 0 0rem rgb(108 117 125 / 25%)", border: "1px solid #ced4da", borderRight: 0 }}
                {...restProps}
                name={name}
                placeholder={label}
                error={error}
                helpText={helpText}
                value={value}
                className={inputStyleClasses}
                isReadOnly={isReadOnly} />
            <Button
                style={{ boxShadow: "0 0 0 0rem rgb(108 117 125 / 25%)", border: "1px solid #ced4da", borderLeft: 0 }}
                type="submit"
                label=""
                className="btn btn-outline-secondary"
                iconClass="fas fa-search"
                disabled={disabled} />
        </div>
    );
}

export default SearchInput;

SearchInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    error: PropTypes.string,
    helpText: PropTypes.string,
    className: PropTypes.string,
    isReadOnly: PropTypes.bool,
    isInline: PropTypes.bool
};

SearchInput.defaultProps = {
    name: "",
    label: "",
    value: "",
    className: "",
    isReadOnly: false,
    isInline: false
};
