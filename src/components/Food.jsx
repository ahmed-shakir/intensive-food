import React from 'react';
import FoodEdit from "./FoodEdit";
import Like from "./Like";

function Food({ data: food, onLike, onSave, onEdit, onDelete, onCancel }) {
    if (food.isEditing) {
        return (<FoodEdit key={food._id} data={food} onSave={onSave} onCancel={onCancel} />);
    }
    return (
        <tr>
            <td>{food.name}</td>
            <td>{food.category.name}</td>
            <td>{food.numberInStock}</td>
            <td>{food.price}</td>
            <td>
                <Like food={food} onLike={onLike} />
            </td>
            <td>
                <button onClick={() => onEdit(food)} className="btn btn-primary btn-sm m-1" title="edit"><i className="fas fa-pen" aria-hidden="true" /></button>
                <button onClick={() => onDelete(food)} className="btn btn-danger btn-sm m-1" title="delete"><i className="fas fa-trash-alt" aria-hidden="true" /></button>
            </td>
        </tr>
    );
}

export default Food;
