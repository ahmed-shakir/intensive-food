import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import _ from "lodash";

class TableBodyRow extends Component {
    renderCell = (item, column) => {
        if(column.content) return column.content(item);
        if(column.link) return <Link to={`${column.link}/${item._id}`}>{_.get(item, column.path)}</Link>
        return _.get(item, column.path);
    };

    createKey = (item, column) => item._id + (column.path || column.key);

    render() {
        const { item, columns } = this.props;

        return (
            <tr key={item._id}>
                {columns.map((column) => (
                    <td key={this.createKey(item, column)}>{this.renderCell(item, column)}</td>
                ))}
            </tr>
        );
    }
}

export default TableBodyRow;

TableBodyRow.propTypes = {
    item: PropTypes.object.isRequired, // TODO: add more specific object content-type
    columns: PropTypes.array.isRequired // TODO: add more specific array content-type
};
