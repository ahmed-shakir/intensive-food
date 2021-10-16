import React, { Component } from 'react';
import { saveFood } from "../services/fakeFoodService";
import { getCategories } from "../services/fakeCategoryService";
import InputField from './InputField';
import SelectField from './SelectField';

class AddFood extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameInputFieldStyle: "",
            categoryInputFieldStyle: "",
            stockInputFieldStyle: "",
            priceInputFieldStyle: ""
        };
        this.foodForm = {
            form: React.createRef(),
            name: React.createRef(),
            categoryId: React.createRef(),
            numberInStock: React.createRef(),
            price: React.createRef()
        };
    }

    handleSave = () => {
        this.validateForm();
        if(this.isFormValid()) {
            const food = saveFood(this.createFood());
            this.props.onSave(food);
            this.foodForm.form.current.reset();
            this.resetFormStyle();
        }
    };

    handleCancel = () => {
        this.props.onCancel();
        this.resetFormStyle();
    };

    createFood() {
        return {
            name: this.foodForm.name.current.value,
            categoryId: this.foodForm.categoryId.current.value,
            numberInStock: this.foodForm.numberInStock.current.value,
            price: this.foodForm.price.current.value
        };
    }

    validateForm() {
        const validStyle = "is-valid";
        const invalidStyle = "is-invalid";

        this.setState({
            nameInputFieldStyle: (this.foodForm.name.current.value) ? validStyle : invalidStyle,
            categoryInputFieldStyle: (this.foodForm.categoryId.current.value) ? validStyle : invalidStyle,
            stockInputFieldStyle: (this.foodForm.numberInStock.current.value) ? validStyle : invalidStyle,
            priceInputFieldStyle: (this.foodForm.price.current.value) ? validStyle : invalidStyle
        });
    }

    isFormValid() {
        return this.foodForm.name.current.value
            && this.foodForm.categoryId.current.value 
            && this.foodForm.numberInStock.current.value
            && this.foodForm.price.current.value
    }

    resetFormStyle() {
        this.setState({
            nameInputFieldStyle: "",
            categoryInputFieldStyle: "",
            stockInputFieldStyle: "",
            priceInputFieldStyle: ""
        });
    }

    render() {
        return (
            <div style={{backgroundColor: "rgba(0,0,0,.5)"}} id="myModal" className="modal modal-dialog-centered" tabIndex="-1" aria-labelledby="modalTitle" aria-hidden="true" hidden={this.props.hidden}>
                <div style={{width: "100%"}} className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 id="modalTitle" className="modal-title">Add food</h5>
                            <button type="button" className="btn-close" aria-label="Close" onClick={this.props.onCancel}></button>
                        </div>
                        <form id="addFoodForm" ref={this.foodForm.form}>
                            <div className="modal-body">
                                <InputField type="text" label="Name" className={this.state.nameInputFieldStyle} inputRef={this.foodForm.name} />
                                <SelectField categories={getCategories()} label="Category" className={this.state.categoryInputFieldStyle} inputRef={this.foodForm.categoryId} />
                                <InputField type="number" label="Stock" className={this.state.stockInputFieldStyle} inputRef={this.foodForm.numberInStock} />
                                <InputField type="number" label="Price" className={this.state.priceInputFieldStyle} inputRef={this.foodForm.price} />
                            </div>
                            <div className="modal-footer">
                                <button type="reset" className="btn btn-outline-secondary" onClick={this.handleCancel}>
                                    <i className="fas fa-ban" aria-hidden="true" /> Cancel
                                </button>
                                <button type="button" className="btn btn-outline-primary" onClick={this.handleSave}>
                                    <i className="fas fa-sd-card" aria-hidden="true" /> Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddFood;
