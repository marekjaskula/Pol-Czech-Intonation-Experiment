import React from 'react';
import {DebounceInput} from "react-debounce-input"

const TextInput = (props) => {
    const {id, onChange, name, label, placeholder, value} = props;
    return (
        <div className="form-group row">
            <label htmlFor={id} className="col-sm-2 col-form-label">{label}</label>
            <div className="col-sm-10">
                <DebounceInput
                    type="text"
                    value={value}
                    debounceTimeout={200}
                    onChange={onChange}
                    placeholder={placeholder}
                    name={name}
                    id={id}
                    className="form-control"
                    {...props}
                />
            </div>
        </div>
    )
}

export default TextInput;
