import { Component } from 'react';
import SearchInput from './SearchInput';
import Input from './Input';
import Select from './Select';
import Button from './Button';
import _ from "lodash";

class Form extends Component {
    state = { 
        data: {},
        errors: {}
    };

    validate = () => {
        const options = {abortEarly: false};
        const { error } = this.schema.validate(this.state.data, options);
        
        if(!error) return null;
        
        const errors = {};
        for(const detail of error.details) {
            errors[detail.path[0]] = detail.message;
        }
        return errors;
    };

    validateProperty = ({name, value}) => {
        const schema = this.schema.extract(name);
        const { error } = schema.validate(value);

        if(!error) return null;
        return error.details[0].message;
    };

    handleChange = ({currentTarget: input}) => {
        const errors = {...this.state.errors};
        const errorMessage = this.validateProperty(input);
        if(errorMessage) _.set(errors, input.name, errorMessage);
        else delete errors[input.name];
        
        const data = {...this.state.data};
        _.set(data, input.name, input.value);
        this.setState({data, errors});
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const errors = this.validate();
        this.setState({ errors: errors || {} });
        if(errors) return;
        
        this.doSubmit();
    };

    renderInput(name, label, type = "text", helpText = "", isInline = false, isReadOnly = false) {
        const {data, errors} = this.state;
        return (<Input type={type} name={name} label={label} value={_.get(data, name)} error={errors[name]} helpText={helpText} onChange={this.handleChange} isInline={isInline} isReadOnly={isReadOnly} />);
    }

    renderSearchInput(name, label, helpText = "", isInline = false, isReadOnly = false) {
        const {data, errors} = this.state;
        return (<SearchInput type="search" name={name} label={label} value={_.get(data, name)} error={errors[name]} helpText={helpText} onChange={this.handleChange} isInline={isInline} isReadOnly={isReadOnly} />);
    }

    renderSelect(name, label, options, helpText = "") {
        const {data, errors} = this.state;
        return (<Select data={options} name={name} label={label} value={_.get(data, name)} error={errors[name]} helpText={helpText} onChange={this.handleChange} />);
    }

    renderButton(label, type = "submit", iconClass = "", className = "btn btn-primary", onClick = null) {
        return (<Button type={type} label={label} className={className} iconClass={iconClass} onClick={onClick} disabled={type === "submit" && this.validate()} />);
    }
}

export default Form;
