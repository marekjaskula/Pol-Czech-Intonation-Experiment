/**
 * Created by Mazi on 2018-03-01.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {makeAction} from "../../redux/actions/makeAction";
import recordsActionTypes from "../../redux/actions/recordsActionTypes"

class Record extends Component {

    constructor(props) {
        super(props);

        this.handleImageChange = this.handleImageChange.bind(this);
    }

    componentDidMount() {
    }

    handleImageChange(event) {
        event.preventDefault();
        const file = event.target.files[0];

        let reader = new FileReader();

        reader.onloadend = () => {
            this.props.changeRecordImage(reader.result)
        }

        reader.readAsDataURL(file)
    }

    render() {
        const {currentRecord, saveRecord} = this.props;
        const image = currentRecord.get('image');

        const isImageLoaded = image === undefined;
        return (
            <div className="card-body">
                <h5 className="card-title">Nagranie</h5>
                {image && <img className="rounded img-fluid img-thumbnail" src={image} alt="Record image"/>}
                    <div className="card-block">
                        <input type="file" accept="image/*" onChange={this.handleImageChange} />
                        <button type="button" className="btn btn-success" onClick={() => {saveRecord()}} disabled={isImageLoaded}>Zapisz</button>
                    </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    currentRecord: state.records.currentRecord
})

const mapDispatchToProps = {
    changeRecordImage: makeAction(recordsActionTypes.CHANGE_IMAGE_RECORD),
    saveRecord: makeAction(recordsActionTypes.SAVE_RECORD)
}

export default connect(mapStateToProps, mapDispatchToProps)(Record);
