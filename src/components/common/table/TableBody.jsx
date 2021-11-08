import React from 'react';
import FoodEdit from './TableBodyRowEdit';
import TableBodyRow from './TableBodyRow';
import PropTypes from "prop-types";

function TableBody({ data, columns, onSave, onCancel }) {
    return (
        <tbody>
            {data.map((item) => (
                item.isEditing ? <FoodEdit key={item._id} item={item} columns={columns} onSave={onSave} onCancel={onCancel} />
                : <TableBodyRow key={item._id} item={item} columns={columns} onSave={onSave} onCancel={onCancel} />
            ))}
        </tbody>
    );
}

export default TableBody;

TableBody.propTypes = {
    data: PropTypes.array.isRequired, // TODO: add more specific array content-type
    columns: PropTypes.array.isRequired, // TODO: add more specific array content-type
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
};
