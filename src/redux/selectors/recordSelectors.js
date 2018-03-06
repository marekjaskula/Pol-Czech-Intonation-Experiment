/**
 * Created by Mazi on 2018-03-05.
 */

export function getRecordById(state, recordId) {
    return state.records.list.get(recordId);
}

export function getAllRecords(state) {
    return state.records.list;
}
