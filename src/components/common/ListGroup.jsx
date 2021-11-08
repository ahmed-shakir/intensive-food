import React from "react";
import PropTypes from "prop-types";

function ListGroup({ items, selectedItem, idProperty, nameProperty, onItemSelect }) {
    return (
        <ul className="list-group">
            {items.map((item) => (
                <li key={item[idProperty]}
                    style={{ cursor: "pointer" }}
                    className={item === selectedItem ? "list-group-item active" : "list-group-item"}
                    onClick={() => onItemSelect(item)}>{item[nameProperty]}</li>
            ))}
        </ul>
    );
}

export default ListGroup;

ListGroup.propTypes = {
    items: PropTypes.array.isRequired, // TODO: add more specific array content-type
    selectedItem: PropTypes.object.isRequired,
    idProperty: PropTypes.string.isRequired,
    nameProperty: PropTypes.string.isRequired,
    onItemSelect: PropTypes.func.isRequired
};

ListGroup.defaultProps = {
    idProperty: "_id",
    nameProperty: "name"
};
