import React, { Component } from 'react';
import Like from "./common/Like";
import Table from './common/table/Table';
import PropTypes from "prop-types";

class FoodsTable extends Component {
    columns = [
        { path: "name", label: "Name", type: "text", link: "/foods", isReadOnly: true },
        { path: "category.name", label: "Category", type: "text", isReadOnly: true },
        { path: "numberInStock", label: "Stock", type: "number", isReadOnly: false },
        { path: "price", label: "Price", type: "number", isReadOnly: false },
        { key: "like", content: (food) => (<Like isLiked={food.isLiked} onLike={() => this.props.onLike(food)} />) },
        { key: "delete", content: (food) => (
                <>
                    {this.props.user && <button onClick={() => this.props.onEdit(food)} className="btn btn-primary btn-sm m-1" title="edit"><i className="fas fa-pen" aria-hidden="true" /></button>}
                    {this.props.user && this.props.user.isAdmin && <button onClick={() => this.props.onDelete(food)} className="btn btn-danger btn-sm m-1" title="delete"><i className="fas fa-trash-alt" aria-hidden="true" /></button>}
                </>
            )
        }
    ];

    render() {
        const { foods, sortColumn, onSave, onCancel, onSort } = this.props;
        return (
            <Table
                data={foods}
                columns={this.columns}
                sortColumn={sortColumn}
                onSave={onSave}
                onCancel={onCancel}
                onSort={onSort} />
        );
    }
}

export default FoodsTable;

FoodsTable.propTypes = {
    foods: PropTypes.array.isRequired, // TODO: add more specific array content-type
    sortColumn: PropTypes.object.isRequired, // TODO: add more specific object content-type
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onSort: PropTypes.func.isRequired
};
