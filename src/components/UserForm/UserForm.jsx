import React from 'react';
import {withFormik} from "formik"
import TextInput from "./SFC/TextInput"
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

const formikEnhancer = withFormik({
    validationSchema: undefined,

    mapPropsToValues: ({userFormData}) => {
        return userFormData;
    },
    handleSubmit: (payload, {props, setSubmitting}) => {
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
        setFieldValue,
        handleReset,
        isSubmitting,
        handleSubmitUserForm
    } = props;

    return (
        <div className="card-body">
            <h5 className="card-title">Dane osobowe</h5>
            <form onSubmit={handleSubmit}>
                <TextInput id="id" onChange={handleChange} name="id" label="Id" placeholder="Id" value={values.id}/>
                <TextInput id="imie" onChange={handleChange} name="imie" label="Imię" placeholder="Imię"
                           value={values.imie}/>
                <TextInput id="nazwisko" onChange={handleChange} name="nazwisko" label="Nazwisko" placeholder="Nazwisko"
                           value={values.nazwisko}/>
                <div className="form-group row">
                    <label htmlFor="dataUrodzenia" className="col-sm-2 col-form-label">Data urodzenia</label>
                    <div className="col-sm-1">

                            <DatePicker
                                dateFormat="DD/MM/YYYY"
                                selected={values.dataUrodzenia}
                                onChange={(date) => {
                                    props.setFieldValue('dataUrodzenia', date)
                                }}
                            />

                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default formikEnhancer(UserForm);
