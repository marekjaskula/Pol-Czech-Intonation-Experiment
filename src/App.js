import React, {Component} from 'react';

import './App.css';
import PolCzechIntonationContainer from "./components/PolCzechIntonationContainer"

class App extends Component {
    render() {
        return (
            <div className="container app">
                <div className="row">
                    <div className="col-12 app-header">
                    <h2>Polish-Czech Intonation Experiment</h2>
                        <ul className="nav nav-pills">
                            <li className="nav-item">
                                <div className="nav-link active nav-pointer">Dane osobowe</div>
                            </li>
                            <li className="nav-item">
                                <div className="nav-link nav-pointer">Nagrania</div>
                            </li>
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

export default App;
