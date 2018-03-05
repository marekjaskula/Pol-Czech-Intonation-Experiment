import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import './App.css';
import PolCzechIntonationContainer from "./components/PolCzechIntonationContainer";
import {makeAction} from "./redux/actions/makeAction"
import applicationActionTypes from "./redux/actions/applicationActionTypes"
import recordsActionTypes from "./redux/actions/recordsActionTypes"

export const APPLICATION_STATE = {
    USER_FORM: 'USER_FORM',
    RECORDS: 'RECORDS',
    SLIDE_SESSION: 'SLIDE_SESSION'
}

class App extends Component {

    prepareNavElements = () => {
        const elements = [
            {
                label: 'Dane osobowe',
                appState: APPLICATION_STATE.USER_FORM
            },
            {
                label: 'Nagrania',
                appState: APPLICATION_STATE.RECORDS
            },
            {
                label: 'Badanie',
                appState: APPLICATION_STATE.SLIDE_SESSION
            }
        ];

        const applicationState = this.props.applicationState;

        const renderElements = [];
        elements.forEach((element) => {
            const active = element.appState === applicationState ? 'active' : '';
            const renderElement = <li key={element.appState} className="nav-item" onClick={this.navLinkHandler.bind(this, element.appState)}>
                <div className={`nav-link nav-pointer ${active}`}>{element.label}</div>
            </li>;
                renderElements.push(renderElement);
        })

        return renderElements;
    }

    navLinkHandler = (appState) => {
        this.props.changeActionState(appState);

        if (appState === APPLICATION_STATE.RECORDS) {
            this.props.toggleShowRecord(false);
        }
    }

    render() {
        return (
            <div className="container app">
                <div className="row">
                    <div className="col-12 app-header">
                    <h2>Polish-Czech Intonation Experiment</h2>
                        <ul className="nav nav-pills">
                            {this.prepareNavElements()}
                        </ul>
                    </div>
                </div>
                <div className="row">
                    <PolCzechIntonationContainer/>
                </div>
            </div>
        );
    }
}

App.propTypes = {
    applicationState: PropTypes.string.isRequired,
    changeActionState: PropTypes.func.isRequired,
    toggleShowRecord: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    applicationState: state.applicationState
})

const mapDispatchToProps = {
    changeActionState: makeAction(applicationActionTypes.CHANGE_APPLICATION_STATE),
    toggleShowRecord: makeAction(recordsActionTypes.TOGGLE_SHOW_RECORD)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
