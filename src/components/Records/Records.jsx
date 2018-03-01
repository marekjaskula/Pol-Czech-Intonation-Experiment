/**
 * Created by Mazi on 2018-03-01.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {makeAction} from "../../redux/actions/makeAction";
import recordsActionTypes from "../../redux/actions/recordsActionTypes"

class Records extends Component {

    componentDidMount() {
        this.props.prepareRecord();
    }

    render() {
        const {record, prepareRecord} = this.props;
        return (
            <div className="card-body">
                <h5 className="card-title">Nagrania</h5>
                {record.image && <img className="card-img-top" src={record.image} alt="Record image"/>}
                    <div className="card-block">
                        <div className="btn btn-primary" onClick={() => {prepareRecord()}}>Następne nagranie</div>
                    </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    record: state.currentRecord
})

const mapDispatchToProps = {
    prepareRecord: makeAction(recordsActionTypes.PREPARE_STAGE_FOR_RECORD)
}

export default connect(mapStateToProps, mapDispatchToProps)(Records);