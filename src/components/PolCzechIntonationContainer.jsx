import React, {Component} from 'react';
import {connect} from 'react-redux';
import UserForm from "./UserForm/UserForm";
import {makeAction} from "../redux/actions/makeAction";
import userFormActionTypes from "../redux/actions/userFormActionTypes";
import {APPLICATION_STATE} from "../App"
import Records from "./Records/Records"

const userFormFields = {
    id: '',
    imie: '',
    nazwisko: '',
    dataUrodzenia: null
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
        const {applicationState} = this.props;
        return (
            <div className="col-md-12">
                {
                    applicationState === APPLICATION_STATE.USER_FORM
                    && <UserForm userFormData={userFormFields} handleSubmitUserForm={this.handleSubmitUserForm}/>}
                {
                    applicationState === APPLICATION_STATE.RECORDS
                    && <Records />
                }
            </div>
        );

    }
}

const mapStateToProps = (state) => ({
    userFormData: state.userForm.data,
    applicationState: state.applicationState
})

const mapDispatchToProps = {
    submitUserForm: makeAction(userFormActionTypes.SUBMIT_USER_FORM)
}

export default connect(mapStateToProps, mapDispatchToProps)(PolCzechIntonationContainer);
