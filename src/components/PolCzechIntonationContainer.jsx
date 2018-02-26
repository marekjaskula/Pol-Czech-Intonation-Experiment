import React, {Component} from 'react';
import {connect} from 'react-redux'
import UserForm from "./UserForm/UserForm"
import {makeAction} from "../redux/actions/makeAction"
import userFormActionTypes from "../redux/actions/userFormActionTypes"

const userFormFields = {
    id: '',
    imie: '',
    nazwisko: '',
    dataUrodzenia: ''
}

class PolCzechIntonationContainer extends Component {

    constructor(props) {
        super(props);

        this.handleSubmitUserForm = this.handleSubmitUserForm.bind(this);
    }

    handleSubmitUserForm(values) {
        this.props.submitUserForm(values);
    }

    render() {
        return (
            <div className="col-md-12">
                <UserForm userFormData={userFormFields} handleSubmitUserForm={this.handleSubmitUserForm}/>
            </div>
        );

    }
}

const mapStateToProps = (state) => ({
    userFormData: state.userForm.data
})

const mapDispatchToProps = {
    submitUserForm: makeAction(userFormActionTypes.SUBMIT_USER_FORM)
}

export default connect(mapStateToProps, mapDispatchToProps)(PolCzechIntonationContainer);
