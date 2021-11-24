import React from 'react';
import Form from '../common/form/Form';
import Joi from 'joi';

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
        return (
            <form className="d-flex" onSubmit={this.handleSubmit}>
                {this.renderSearchInput("searchString", "Search")}
            </form>
        );
    }
}

export default SearchForm;
