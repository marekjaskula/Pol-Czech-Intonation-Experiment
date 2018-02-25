import React, {Component} from 'react';
import {connect} from 'react-redux'
import UserForm from "./UserForm/UserForm"
import {makeAction} from "../redux/actions/makeAction"
import userFormActionTypes from "../redux/actions/userFormActionTypes"

class PolCzechIntonationContainer extends Component {

    componentDidMount() {
        this.props.initUserForm();
    }

    render() {
        return (
            <div className="col-md-12">
                <UserForm />
            </div>
        );

    }
}

const mapStateToProps = () => ({
})

const mapDispatchToProps = {
    initUserForm: makeAction(userFormActionTypes.INIT_USER_FORM)
}

export default connect(mapStateToProps, mapDispatchToProps)(PolCzechIntonationContainer);
