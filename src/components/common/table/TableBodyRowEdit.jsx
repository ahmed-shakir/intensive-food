import React, { Component } from "react";
import InputField from "../../InputField";
import PropTypes from "prop-types";
import _ from "lodash";

class TableBodyRowEdit extends Component {
    constructor(props) {
        super(props);
        this.inputForm = this.initForm();
        this.validation = this.initValidation();
    }

    componentDidMount() {
        for (let column of this.props.columns) {
            if (column.path) {
                const defaultValue = _.get(this.props.item, column.path);
                _.set(this.inputForm, column.path + ".current.value", defaultValue);
            }
        }
    }


    handleSave = () => {
        this.validateForm();
        if (this.isFormValid()) {
            const item = this.props.item;
            for (let column of this.props.columns) {
                if (column.path) {
                    const fieldValue = _.get(this.inputForm, column.path + ".current.value");
                    _.set(item, column.path, fieldValue);
                }
            }
            this.props.onSave(item);
        }
    };

    handleCancel = () => {
        this.props.onCancel(this.props.item);
    };


    initForm = () => {
        let inputForm = {};
        for (let column of this.props.columns) {
            if (column.path) {
                _.set(inputForm, column.path, React.createRef());
            }
        }
        return inputForm;
    };

    initValidation = () => {
        let validation = {};
        for (let column of this.props.columns) {
            if (column.path) {
                _.set(validation, column.path + ".isValid", null);
            }
        }
        return validation;
    };

    validateForm() {
        for (let column of this.props.columns) {
            if (column.path) {
                const isValid = _.get(this.inputForm, column.path + ".current.value").length > 0;
                _.set(this.validation, column.path + ".isValid", isValid);
            }
        }
        this.forceUpdate();
    }

    isFormValid() {
        for (let column of this.props.columns) {
            if (column.path) {
                if (!_.get(this.inputForm, column.path + ".current.value")) return false;
            }
        }
        return true;
    }

    render() {
        const numOfColumns = this.props.columns.length;
        const filteredColumns = this.props.columns.filter((column) => column.path);
        const numOfEmptyColumns = numOfColumns - filteredColumns.length - 1;

        return (
            <tr>
                {filteredColumns.map((column) => (
                    <td key={column.path}>
                        <InputField type={column.type} label={column.label} inputRef={_.get(this.inputForm, column.path)} isReadOnly={column.isReadOnly} isValid={_.get(this.validation, column.path + ".isValid")} />
                    </td>
                ))}
                {_.range(0, numOfEmptyColumns).map((c) => (<td key={c}></td>))}
                <td>
                    <button onClick={this.handleSave} className="btn btn-success btn-sm m-1" title="save"><i className="fas fa-check" aria-hidden="true" /></button>
                    <button onClick={this.handleCancel} className="btn btn-secondary btn-sm m-1" title="cancel"><i className="fas fa-ban" aria-hidden="true" /></button>
                </td>
            </tr>
        );
    }
}

export default TableBodyRowEdit;

TableBodyRowEdit.propTypes = {
    item: PropTypes.object.isRequired, // TODO: add more specific object content-type
    columns: PropTypes.array.isRequired, // TODO: add more specific array content-type
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
};
