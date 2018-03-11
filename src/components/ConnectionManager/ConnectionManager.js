/**
 * Created by Mazi on 2018-03-11.
 */

export default class ConnectionManager {

    static init(store) {
        ConnectionManager.dispatch = store.dispatch;
        ConnectionManager.ws = new WebSocket("ws://localhost:8090");
        ConnectionManager.ws.onclose = ConnectionManager.connectionCloseHandler;
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

}
