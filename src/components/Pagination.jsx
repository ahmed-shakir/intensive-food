import React, { Component } from 'react';

class Pagination extends Component {
    getButtons() {
        const buttons = [];
        for(let i = 1; i <= this.props.data.numOfPages; i++) {
            const isCurrent = this.props.data.currentPage === i;
            buttons.push(<li key={i} className={this.getStyleClasses(isCurrent)}><button className="page-link" onClick={() => this.props.onPageChange(i)}>{i}</button></li>);
        }
        return buttons;
    }

    getStyleClasses(isCurrent) {
        let classes = "page-item";
        return classes.concat(isCurrent ? " active" : "");
    }

    render() {
        return (
            <nav aria-label="food table pagination">
                <ul className="pagination pagination-sm">
                    {this.getButtons()}
                </ul>
            </nav>
        );
    }
}

export default Pagination;