import React from 'react';
import PropTypes from "prop-types";

function SelectField({ data, inputRef, label, className, isReadOnly, isValid, idProperty, nameProperty }) {
    const validStyle = "is-valid";
    const invalidStyle = "is-invalid";
    const styleClasses = "form-control".concat((className && className.length > 0) ? " ".concat(className) : "")
        .concat(" ")
        .concat(isValid === null || isValid === undefined || isReadOnly ? "" : isValid ? validStyle : invalidStyle);

    return (
        <div className="form-floating mb-3">
            <select
                id="select"
                className={styleClasses}
                aria-labelledby="selectLabel"
                defaultValue=""
                ref={inputRef}
                readOnly={isReadOnly}
                disabled={isReadOnly}>
                <option disabled hidden value=""></option>
                {data.map((item) => (<option key={item[idProperty]} value={item[idProperty]}>{item[nameProperty]}</option>))}
            </select>
            <label id="selectLabel" htmlFor="select">{label}</label>
        </div>
    );
}

export default SelectField;

SelectField.propTypes = {
    data: PropTypes.array.isRequired, // TODO: add more specific array content-type
    inputRef: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    className: PropTypes.string,
    isReadOnly: PropTypes.bool.isRequired,
    idProperty: PropTypes.string.isRequired,
    nameProperty: PropTypes.string.isRequired
};

SelectField.defaultProps = {
    label: "",
    isReadOnly: false,
    isValid: null,
    idProperty: "_id",
    nameProperty: "name"
};
