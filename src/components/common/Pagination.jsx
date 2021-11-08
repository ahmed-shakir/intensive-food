import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

function Pagination({ numOfItems, pageSize, currentPage, onPageChange }) {
    const numOfPages = Math.ceil(numOfItems / pageSize);
    if(numOfPages === 1) return null;
    const pages = _.range(1, numOfPages + 1);

    return (
        <nav aria-label="food table pagination">
            <ul className="pagination pagination-sm">
                {pages.map((page) => (
                    <li key={page} className={currentPage === page ? "page-item active" : "page-item"}>
                        <button className="page-link" onClick={() => onPageChange(page)}>{page}</button>
                    </li>))}
            </ul>
        </nav>
    );
}

export default Pagination;

Pagination.propTypes = {
    numOfItems: PropTypes.number.isRequired, 
    pageSize: PropTypes.number.isRequired, 
    currentPage: PropTypes.number.isRequired, 
    onPageChange: PropTypes.func.isRequired
};

Pagination.defaultProps = {
    pageSize: 4, 
    currentPage: 1, 
};
