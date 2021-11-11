import React from "react";
import Form from "../form/Form";
import PropTypes from "prop-types";
import Joi from 'joi';
import _ from "lodash";

class TableBodyRowEdit extends Form {
    state = {
        data: {
            name: "",
            category: {},
            numberInStock: "",
            price: ""
        },
        errors: {}
    };
    schema = Joi.object({
        name: Joi.string().min(3).required().label("Name"),
        category: {_id: Joi.string().min(3).required().label("Category")},
        numberInStock: Joi.number().min(0).max(100).required().label("Stock"),
        price: Joi.number().min(5).max(50).required().label("Price")
    });

    componentDidMount() {
        for (let column of this.props.columns) {
            if (column.path) {
                const defaultValue = _.get(this.props.item, column.path);
                _.set(this.state.data, column.path, defaultValue);
            }
        }
    }

    doSubmit = () => {
        const item = this.props.item;
        for (let column of this.props.columns) {
            if (column.path) {
                const fieldValue = _.get(this.state.data, column.path);
                _.set(item, column.path, fieldValue);
            }
        }
        this.props.onSave(item);
    };

    handleCancel = () => {
        this.props.onCancel(this.props.item);
    };

    

    /* initForm = () => {
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
    } */

    render() {
        const numOfColumns = this.props.columns.length;
        const filteredColumns = this.props.columns.filter((column) => column.path);
        const numOfEmptyColumns = numOfColumns - filteredColumns.length - 1;

        return (
            <tr>
                {filteredColumns.map((column) => (
                    <td key={column.path}>
                        {this.renderInput(column.path, column.label, column.type, null, true)}
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
