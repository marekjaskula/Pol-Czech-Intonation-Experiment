import takeEvery from "redux-saga/es/internal/sagaHelpers/takeEvery"

export function * setupApplicationSaga(action) {
    try {

        console.error('hello');
    } catch(error) {

    }
}

export function* watchSetupApplicationSaga() {
    yield takeEvery("INIT_APPLICATION", setupApplicationSaga);
}