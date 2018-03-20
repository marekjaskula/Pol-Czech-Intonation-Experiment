/**
 * Created by Mazi on 2018-03-04.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ReactAudioPlayer from 'react-audio-player';

import {makeAction} from "../../redux/actions/makeAction";
import recordsActionTypes from "../../redux/actions/recordsActionTypes";

import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Record from "./Record";
import ConnectionManager from "../ConnectionManager/ConnectionManager"

class Records extends Component {

    constructor(props) {
        super(props);

        this.state = {
            columns: [
                {
                    Header: "Id nargania",
                    accessor: "id"
                },
                {
                    Header: "Obrazek",
                    accessor: "imageUrl",
                    Cell: row => (
                        <img src={row.value} style={{maxHeight: '100px'}}/>
                    )
                },
                {
                    Header: "Nagranie",
                    accessor: "audioUrl",
                    Cell: row => {
                        const blobUrl = row.value;
                        return <div><ReactAudioPlayer
                            src={blobUrl}
                            controls
                        /></div>
                    }
                },
                {
                    Header: "Akcje",
                    accessor: "actions",
                    Cell: row => this.getRecordActions(row)
                }
            ]
        }


        this.rowClickHandler = this.rowClickHandler.bind(this);
        this.addRecordHandler = this.addRecordHandler.bind(this);
        this.getRecordActions = this.getRecordActions.bind(this);
    }

    componentDidMount() {
        ConnectionManager.sendBundle({command: ConnectionManager.COMMAND.GET_RECORDS})
    }

    getRecordActions(row) {
        const record = row.original;
        return (
            <div>
                <span
                    className="btn btn-danger"

                    onClick={(e) => {
                        this.props.deleteRecord(record.id);
                        e.preventDefault();
                        e.stopPropagation();
                    }
                    }>Usuń</span>
            </div>
        )
    }

    rowClickHandler(rowInfo, handleOriginal) {
        const {original} = rowInfo;
        this.props.showRecordById(original.id);

        if(handleOriginal) {
            handleOriginal();
        }
    }

    addRecordHandler() {
        this.props.clearCurrentRecord();
        this.props.toggleShowRecord(true);
    }

    render() {
        const {records, showRecord, userForm} = this.props;
        const data = [];
        const addRecordDisabled = !userForm.size;

        records.forEach((record) => {
            data.push(record);
        });

        if(showRecord) {
            return <Record />;
        }

        return (
            <div>
                <ReactTable
                    data={data}
                    columns={this.state.columns}
                    className="-striped -highlight"
                    defaultPageSize={10}
                    noDataText='Brak nagrań'
                    rowsText='nagrań'
                    ofText='z'
                    pageText='Strona'
                    previousText='Poprzednia strona'
                    nextText='Następna strona'
                    getTrProps={(state, rowInfo, column, instance) => ({
                        onClick: (e, handleOriginal) => this.rowClickHandler(rowInfo, handleOriginal)
                    })}
                />
                <div className="d-flex flex-row-reverse">
                    <button type="button" className="btn btn-success" onClick={this.addRecordHandler}
                            disabled={addRecordDisabled}>Dodaj nagranie
                    </button>
                </div>
            </div>
        )
    }
}

Records.prototypes = {
    records: PropTypes.any.isRequired,
    showRecord: PropTypes.bool.isRequired,
    userForm: PropTypes.any.isRequired,
    prepareRecord: PropTypes.func.isRequired,
    toggleShowRecord: PropTypes.func.isRequired,
    showRecordById: PropTypes.func.isRequired,
    clearCurrentRecord: PropTypes.func.isRequired,
    deleteRecord: PropTypes.func.isRequired,
    getRecords: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    records: state.records.list,
    showRecord: state.records.showRecord,
    userForm: state.userForm.data
})

const mapDispatchToProps = {
    prepareRecord: makeAction(recordsActionTypes.PREPARE_STAGE_FOR_RECORD),
    toggleShowRecord: makeAction(recordsActionTypes.TOGGLE_SHOW_RECORD),
    showRecordById: makeAction(recordsActionTypes.SHOW_RECORD_BY_ID),
    clearCurrentRecord: makeAction(recordsActionTypes.CLEAR_CURRENT_RECORD),
    deleteRecord: makeAction(recordsActionTypes.DELETE_RECORD_BY_ID)
}

export default connect(mapStateToProps, mapDispatchToProps)(Records);
