import React from "react";
import Form from "../form/Form";
import PropTypes from "prop-types";
import Joi from 'joi';
import _ from "lodash";

class TableBodyRowEdit extends Form {
    state = {
        data: {},
        errors: {}
    };
    schema = Joi.object({
        name: Joi.string().required().label("Name"),
        category: { name: Joi.string().required().label("Category") },
        numberInStock: Joi.number().min(0).max(100).required().label("Stock"),
        price: Joi.number().min(0).max(10).required().label("Price"),
        isLiked: Joi.boolean().optional()
    });

    componentDidMount() {
        const data = {...this.state.data};
        for (let column of this.props.columns) {
            if (column.path) {
                const defaultValue = _.get(this.props.item, column.path);
                _.set(data, column.path, defaultValue);
            }
        }
        this.setState({data});
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
    
    render() {
        const numOfColumns = this.props.columns.length;
        const filteredColumns = this.props.columns.filter((column) => column.path);
        const numOfEmptyColumns = numOfColumns - filteredColumns.length - 1;

        return (
            <tr>
                {filteredColumns.map((column) => (
                    <td key={column.path}>
                        {this.renderInput(column.path, column.label, column.type, null, true, column.isReadOnly)}
                    </td>
                ))}
                {_.range(0, numOfEmptyColumns).map((c) => (<td key={c}></td>))}
                <td>
                    {this.renderButton("", "submit", "fas fa-check", "btn btn-success btn-sm m-1", this.handleSubmit)}
                    {this.renderButton("", "reset", "fas fa-ban", "btn btn-secondary btn-sm m-1", this.handleCancel)}
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
