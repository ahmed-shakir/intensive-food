import React from 'react';
import Form from './common/form/Form';
import SearchFormInput from './SearchFormInput';
import Joi from 'joi';
import _ from "lodash";

class SearchForm extends Form {
    state = {
        data: {
            searchString: ""
        },
        errors: {}
    };
    schema = Joi.object({
        searchString: Joi.string().allow("").optional().label("Search")
    });

    doSubmit = () => {
        const {location, history} = this.props;
        const searchParams = new URLSearchParams(location.search);
        searchParams.set("search", this.state.data.searchString);
        history.push({ search: searchParams.toString() });

        const data = {...this.state.data};
        data.searchString = "";
        this.setState({data});
    };

    render() {
        const { data, errors } = this.state;
        const name = "searchString";
        return (
            <form className="d-flex mt-2" onSubmit={this.handleSubmit}>
                <SearchFormInput type="search" name={name} label="Search" value={_.get(data, name)} error={errors[name]} onChange={this.handleChange} disabled={this.validate()} />
            </form>
        );
    }
}

export default SearchForm;
