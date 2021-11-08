import React, { Component } from 'react';
import PropTypes from "prop-types";

class TableHeader extends Component {
    raiseSort = (path) => {
        const sortColumn = { ...this.props.sortColumn };
        if (sortColumn.path === path) {
            sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
        } else {
            sortColumn.path = path;
            sortColumn.order = "asc";
        }
        this.props.onSort(sortColumn);
    };

    renderSortIcon = (column) => {
        if(this.props.sortColumn.path !== column.path) return null;
        if(this.props.sortColumn.order === "asc") return (<i className="fas fa-caret-up" aria-hidden="true" />);
        return (<i className="fas fa-caret-down" aria-hidden="true" />);
    };

    render() {
        return (
            <thead>
                <tr>
                    {this.props.columns.map((column) => (
                        <th key={column.path || column.key}
                            style={{ cursor: "pointer" }}
                            onClick={() => this.raiseSort(column.path)}>{column.label} {this.renderSortIcon(column)}</th>
                    ))}
                </tr>
            </thead>
        );
    }
}

export default TableHeader;

TableHeader.propTypes = {
    columns: PropTypes.array.isRequired, // TODO: add more specific array content-type
    sortColumn: PropTypes.object.isRequired, // TODO: add more specific object content-type
    onSort: PropTypes.func.isRequired
};
