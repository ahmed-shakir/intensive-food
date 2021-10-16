import React, { Component } from 'react';

class InputField extends Component {

    getStyleClasses() {
        return "form-control".concat((this.props.className.length > 0) ? " ".concat(this.props.className) : "");
    }

    render() {
        return (
            <div className="form-floating mb-3">
                <input 
                    id="input" 
                    type={this.props.type ? this.props.type : "text"} 
                    className={this.getStyleClasses()}
                    aria-labelledby="inputLabel"
                    min="0"
                    ref={this.props.inputRef} />
                <label id="inputLabel" htmlFor="input">{this.props.label}</label> 
            </div>
        );
    }
}

export default InputField;
