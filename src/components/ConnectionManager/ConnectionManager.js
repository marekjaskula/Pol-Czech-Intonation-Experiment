/**
 * Created by Mazi on 2018-03-11.
 */

import recordsActionTypes from "../../redux/actions/recordsActionTypes";
import {makeAction} from "../../redux/actions/makeAction";
import applicationActionTypes from "../../redux/actions/applicationActionTypes"
import {APPLICATION_STATE} from "../../App"

export default class ConnectionManager {
    static COMMAND = {
        CSV: 'csv',
        UPLOAD_AUDIO: 'upload_audio',
        UPLOAD_RECORD: 'upload_record',
        GET_RECORDS: 'get_records'
    }

    static init(store) {
        ConnectionManager.dispatch = store.dispatch;
        ConnectionManager.ws = new WebSocket("ws://localhost:8090");
        ConnectionManager.ws.onclose = ConnectionManager.connectionCloseHandler;
        ConnectionManager.ws.onmessage = ConnectionManager.handleMessage;
    }

    static sendBundle(bundle) {
        if (!bundle.hasOwnProperty('command')) {
            throw new Error('No command defined in bundle')
        }
        ConnectionManager.ws.send(JSON.stringify(bundle));
    }

    static connectionCloseHandler(evt) {
        console.log(`Connection Closed: ${evt}`);
    }

    static handleMessage(event) {
        try {
            const response = JSON.parse(event.data);

            if (response.hasOwnProperty('records')) {
                ConnectionManager.dispatch(makeAction(recordsActionTypes.GET_FETCHED_RECORDS)(response.records));
            }

            if (response.hasOwnProperty('upload_record') && response.upload_record) {
                ConnectionManager.dispatch(makeAction(applicationActionTypes.CHANGE_APPLICATION_STATE)(APPLICATION_STATE.RECORDS));
                ConnectionManager.dispatch(makeAction(recordsActionTypes.TOGGLE_SHOW_RECORD)(false));
            }

        } catch(error) {

        }
    }

}
