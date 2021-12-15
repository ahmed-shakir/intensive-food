import { useState } from "react";
import _ from "lodash";
import SearchInput from '../components/common/form/SearchInput';
import Input from '../components/common/form/Input';
import Select from '../components/common/form/Select';
import Button from '../components/common/form/Button';

export default function useForm(initialData, joiSchema, doSubmit) {
    const [data, setData] = useState(initialData);
    const [errors, setErrors] = useState({});

    const validate = () => {
        const options = { abortEarly: false };
        const { error } = joiSchema.validate(data, options);

        if (!error) return null;

        const errors = {};
        for (const detail of error.details) {
            errors[detail.path[0]] = detail.message;
        }
        return errors;
    };

    const validateProperty = ({ name, value }) => {
        const schema = joiSchema.extract(name);
        const { error } = schema.validate(value);

        if (!error) return null;
        return error.message;
    };

    const handleChange = ({ currentTarget: input }) => {
        const errorMessage = validateProperty(input);
        if (errorMessage) _.set(errors, input.name, errorMessage);
        else delete errors[input.name];
        setErrors({ ...errors });

        _.set(data, input.name, input.value);
        setData({ ...data });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitting...");

        const errors = validate();
        setErrors(errors || {});
        if (errors) return;

        doSubmit();
    };

    const renderInput = (name, label, type = "text", helpText = "", isInline = false, isReadOnly = false) => (
        <Input
            type={type}
            name={name}
            label={label}
            value={_.get(data, name)}
            error={errors[name]}
            helpText={helpText}
            onChange={handleChange}
            isInline={isInline}
            isReadOnly={isReadOnly}
        />
    );

    const renderSearchInput = (name, label, helpText = "", isInline = false, isReadOnly = false) => (
        <SearchInput
            type="search"
            name={name}
            label={label}
            value={_.get(data, name)}
            error={errors[name]}
            helpText={helpText}
            onChange={handleChange}
            isInline={isInline}
            isReadOnly={isReadOnly}
        />
    );

    const renderSelect = (name, label, options, helpText = "") => (
        <Select
            data={options}
            name={name}
            label={label}
            value={_.get(data, name)}
            error={errors[name]}
            helpText={helpText}
            onChange={handleChange}
        />
    );

    const renderButton = (label, type = "submit", iconClass = "", className = "btn btn-primary", onClick = null) => (
        <Button
            type={type}
            label={label}
            className={className}
            iconClass={iconClass}
            onClick={onClick}
            disabled={type === "submit" && validate()}
        />
    );

    return { handleSubmit, renderInput, renderSearchInput, renderSelect, renderButton, setErrors, data };
}
