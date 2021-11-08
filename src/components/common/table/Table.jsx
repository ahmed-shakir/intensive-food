import React from 'react';
import TableBody from './TableBody';
import TableHeader from './TableHeader';
import PropTypes from "prop-types";

function Table({ data, columns, sortColumn, onSave, onCancel, onSort }) {
    return (
        <table className="table table-hover">
            <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
            <TableBody data={data} columns={columns} onSave={onSave} onCancel={onCancel} />
        </table>
    );
}

export default Table;

Table.propTypes = {
    data: PropTypes.array.isRequired, // TODO: add more specific array content-type
    columns: PropTypes.array.isRequired, // TODO: add more specific array content-type
    sortColumn: PropTypes.object.isRequired, // TODO: add more specific object content-type
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onSort: PropTypes.func.isRequired
};
