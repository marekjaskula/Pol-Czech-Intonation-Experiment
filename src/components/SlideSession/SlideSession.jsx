import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {makeAction} from "../../redux/actions/makeAction"
import sessionActionTypes from "../../redux/actions/sessionActionTypes"

import './SlideSession.css';

class SlideSession extends Component {

    componentDidMount() {
    }

    render() {
        const {session, sessionStart, currentRecord} = this.props;
        const showStartButton = [sessionActionTypes.SESSION_STOP, sessionActionTypes.SESSION_START_FAILED].includes(session.status);
        const sessionError = session.error;
        const image = currentRecord.get('image');

        return (
            <div className={'card-body session-container'}>
                <h5 className="card-title">Badanie</h5>
                {image && <img className="rounded img-fluid img-thumbnail" src={image} alt="Image"/>}
                <div className="card-block">
                    {showStartButton &&
                    <div className="session-overlay">
                        <button type="button" className="btn btn-primary" onClick={() => sessionStart()}>Play</button>
                    </div>}
                </div>
                {sessionError && <div className="bg-danger">{sessionError}</div>}
            </div>
        )
    }
}

SlideSession.propTypes = {
    session: PropTypes.any.isRequired,
    sessionStart: PropTypes.func.isRequired,
    currentRecord: PropTypes.any.isRequired
}

const mapStateToProps = (state, ownprops) => ({
    session: state.session,
    currentRecord: state.session.currentRecord
})

const mapDispatchToProps = {
    sessionStart: makeAction(sessionActionTypes.SESSION_START)
}

export default connect(mapStateToProps, mapDispatchToProps)(SlideSession);
