import React from 'react';
import {connect} from 'react-redux'
import {makeAction} from "../../redux/actions/makeAction"
import userFormActionTypes from "../../redux/actions/userFormActionTypes"
import Field from "./Field"

const UserForm = ({submitUserForm, userForm, changeFieldValue}) => {

    const handleSubmitUserForm = (event) => {
        event.preventDefault();
        submitUserForm();
    };

    const onChange = (event) => {
        changeFieldValue({
            id: event.target.id,
            value: event.target.value
        })
    }

    return (
        <div className="card-body">
            <h5 className="card-title">Personal data</h5>
            <form onSubmit={handleSubmitUserForm}>
                {
                    userForm.valueSeq().map((field) => (<Field key={field.id+Date.now()} onChange={onChange} field={field}/>))
                }
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

const mapStateToProps = (state) => ({
    userForm: state.userForm.data
})

const mapDispatchToProps = {
    submitUserForm: makeAction(userFormActionTypes.SUBMIT_USER_FORM),
    changeFieldValue: makeAction(userFormActionTypes.CHANGE_FIELD_VALUE)
}

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
