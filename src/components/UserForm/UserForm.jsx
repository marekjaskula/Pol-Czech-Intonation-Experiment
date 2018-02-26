import React from 'react';
import {withFormik} from "formik"
import TextInput from "./SFC/TextInput"

const formikEnhancer = withFormik({
    validationSchema: undefined,

    mapPropsToValues: ({ userFormData }) => {
        return userFormData;
    },
    handleSubmit: (payload, { props, setSubmitting }) => {
        props.handleSubmitUserForm(payload);

        setSubmitting(false);
    },
    displayName: 'UserForm',
});

const UserForm = (props) => {
    const {
        values,
        userFormData,
        touched,
        errors,
        dirty,
        handleChange,
        handleBlur,
        handleSubmit,
        handleReset,
        isSubmitting,
        handleSubmitUserForm
    } = props;

    return (
        <div className="card-body">
            <h5 className="card-title">Personal data</h5>
            <form onSubmit={handleSubmit}>
                <TextInput id="id" onChange={handleChange} name="id" label="Id" placeholder="Id" value={values.id}/>
                <TextInput id="imie" onChange={handleChange} name="imie" label="Imię" placeholder="Imię" value={values.imie}/>
                <TextInput id="nazwisko" onChange={handleChange} name="nazwisko" label="Nazwisko" placeholder="Nazwisko" value={values.nazwisko}/>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default formikEnhancer(UserForm);
