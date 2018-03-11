import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import UserForm from "./UserForm/UserForm";
import {makeAction} from "../redux/actions/makeAction";
import userFormActionTypes from "../redux/actions/userFormActionTypes";
import {APPLICATION_STATE} from "../App";
import Records from "./Records/Records";
import SlideSession from "./SlideSession/SlideSession";
import connectionManagerActionTypes from "../redux/actions/connectionManagerActionTypes"

class PolCzechIntonationContainer extends Component {

    constructor(props) {
        super(props);

        this.handleSubmitUserForm = this.handleSubmitUserForm.bind(this);
        props.initConnection();
    }

    handleSubmitUserForm(values) {
        this.props.submitUserForm(values);
    }

    render() {
        const {applicationState, userFormData} = this.props;
        const userFormFields = userFormData.size ? userFormData.toJS() : {
            id: '',
            imie: '',
            nazwisko: '',
            dataUrodzenia: Date.now()
        };

        return (
            <div className="col-md-12">
                {
                    applicationState === APPLICATION_STATE.USER_FORM
                    && <UserForm userFormData={userFormFields} handleSubmitUserForm={this.handleSubmitUserForm}/>}
                {
                    applicationState === APPLICATION_STATE.RECORDS
                    && <Records />
                }
                {
                    applicationState === APPLICATION_STATE.SLIDE_SESSION
                    && <SlideSession />
                }
            </div>
        );

    }
}

PolCzechIntonationContainer.propTypes = {
    userFormData: PropTypes.any.isRequired,
    applicationState: PropTypes.string.isRequired,
    submitUserForm: PropTypes.func.isRequired,
    initConnection: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    userFormData: state.userForm.data,
    applicationState: state.applicationState
})

const mapDispatchToProps = {
    submitUserForm: makeAction(userFormActionTypes.SUBMIT_USER_FORM),
    initConnection: makeAction(connectionManagerActionTypes.INIT_CONNECTION)
}

export default connect(mapStateToProps, mapDispatchToProps)(PolCzechIntonationContainer);
