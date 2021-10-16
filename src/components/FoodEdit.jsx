import React, { Component } from 'react';

class FoodEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stockInputFieldStyle: "",
            priceInputFieldStyle: ""
        };
        this.foodForm = {
            numberInStock: React.createRef(),
            price: React.createRef()
        };
    }

    handleSave = () => {
        this.validateForm();
        if(this.isFormValid()) {
            const food = this.props.data;
            food.numberInStock = this.foodForm.numberInStock.current.value;
            food.price = this.foodForm.price.current.value;
            this.props.onSave(food);
            this.resetFormStyle();
        }
    };

    handleCancel = () => {
        this.props.onCancel(this.props.data)
        this.resetFormStyle();
    };

    validateForm() {
        const validStyle = "is-valid";
        const invalidStyle = "is-invalid";

        this.setState({
            stockInputFieldStyle: (this.foodForm.numberInStock.current.value) ? validStyle : invalidStyle,
            priceInputFieldStyle: (this.foodForm.price.current.value) ? validStyle : invalidStyle
        });
    }

    isFormValid() {
        return this.foodForm.numberInStock.current.value && this.foodForm.price.current.value;
    }

    resetFormStyle() {
        this.setState({ stockInputFieldStyle: "", priceInputFieldStyle: "" });
    }

    getStyleClasses(style) {
        return "form-control".concat((style.length > 0) ? " ".concat(style) : "");
    }

    render() {
        return (
            <tr>
                <td>
                    <input
                        id="name"
                        type="text"
                        className="form-control"
                        disabled
                        readOnly
                        defaultValue={this.props.data.name} />
                </td>
                <td>
                    <input
                        id="category"
                        type="text"
                        className="form-control"
                        disabled
                        readOnly
                        defaultValue={this.props.data.category.name} />
                </td>
                <td>
                    <input
                        id="numberInStock"
                        type="number"
                        className={this.getStyleClasses(this.state.stockInputFieldStyle)}
                        ref={this.foodForm.numberInStock}
                        min="0"
                        defaultValue={this.props.data.numberInStock} />
                </td>
                <td>
                    <input
                        id="price"
                        type="number"
                        className={this.getStyleClasses(this.state.priceInputFieldStyle)}
                        ref={this.foodForm.price}
                        min="0"
                        defaultValue={this.props.data.price} />
                </td>
                <td>
                    <button onClick={this.handleSave} className="btn btn-success btn-sm m-1" title="save"><i className="fas fa-check" aria-hidden="true" /></button>
                    <button onClick={this.handleCancel} className="btn btn-secondary btn-sm m-1" title="cancel"><i className="fas fa-ban" aria-hidden="true" /></button>
                </td>
            </tr>
        );
    }
}

export default FoodEdit;
