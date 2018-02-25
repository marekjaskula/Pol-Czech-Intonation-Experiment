import React from 'react';
import TextInput from "./SFC/TextInput"

export const FieldTypes = {
    TEXT: 'text',
    DATE: 'date'
}

const Field = ({field, onChange}) => {
    switch (field.type) {
        case FieldTypes.TEXT:
            return <TextInput onChange={onChange} {...field}/>;
        default:
            return null;
    }
}

export default Field;
