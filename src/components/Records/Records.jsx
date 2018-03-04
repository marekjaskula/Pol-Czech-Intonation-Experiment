/**
 * Created by Mazi on 2018-03-04.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {makeAction} from "../../redux/actions/makeAction";
import recordsActionTypes from "../../redux/actions/recordsActionTypes";

import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Record from "./Record"

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
                    accessor: "image",
                    Cell: row => (
                        <img src={row.value} style={{maxHeight: '200px'}}/>
                    )
                },
                {
                    Header: "Nagranie",
                    accessor: "audio"
                },
                {
                    Header: "Akcje",
                    accessor: "actions"
                }
            ]
        }

    }

    componentDidMount() {
    }

    render() {
        const {records, showRecord} = this.props;
        const data = [];

        records.forEach((record) => {
           data.push(record);
        });

        if (showRecord) {
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
                />
                <div className="d-flex flex-row-reverse">
                    <button type="button" className="btn btn-success" onClick={this.props.toggleShowRecord.bind(this, true)}>Dodaj nagranie </button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    records: state.records.list,
    showRecord: state.records.showRecord
})

const mapDispatchToProps = {
    prepareRecord: makeAction(recordsActionTypes.PREPARE_STAGE_FOR_RECORD),
    toggleShowRecord: makeAction(recordsActionTypes.TOGGLE_SHOW_RECORD)
}

export default connect(mapStateToProps, mapDispatchToProps)(Records);
