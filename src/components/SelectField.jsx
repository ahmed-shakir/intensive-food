import React, { Component } from 'react';

class SelectField extends Component {

    getStyleClasses() {
        return "form-select".concat((this.props.className.length > 0) ? " ".concat(this.props.className) : "");
    }

    render() {
        return (
            <div className="form-floating mb-3">
                <select id="select" className={this.getStyleClasses()} aria-labelledby="selectLabel" defaultValue="" ref={this.props.inputRef}>
                    <option disabled hidden value=""></option>
                    {this.props.categories.map((category) => (<option key={category._id} value={category._id}>{category.name}</option>))}
                </select>  
                <label id="selectLabel" htmlFor="select">{this.props.label}</label> 
            </div>
        );
    }
}

export default SelectField;
