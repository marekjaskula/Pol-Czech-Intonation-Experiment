import React from 'react';

const UserForm = () => {
    return (
        <div className="card-body">
            <h5 className="card-title">Dane osobowe</h5>

            <form>
				<div className="form-group row">
                    <label htmlFor="Id" className="col-sm-2 col-form-label">Id</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control-short" id="Id" aria-describedby="IdHelp"
                               placeholder="Id"/>
                    </div>
                </div>
				
				
                <div className="form-group row">
                    <label htmlFor="imie" className="col-sm-2 col-form-label">Imię</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="imie" aria-describedby="imieHelp"
                               placeholder="Imię"/>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="nazwisko" className="col-sm-2 col-form-label">Nazwisko</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="nazwisko" aria-describedby="nazwiskoHelp"
                               placeholder="Nazwisko"/>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="rokUrodzenia" className="col-sm-2 col-form-label">Data urodzenia</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="rokUrodzenia"
                               aria-describedby="dataUrodzeniaHelp"
                               placeholder="Rok urodzenia"/>
                    </div>
                </div>


                <button type="submit" className="btn btn-primary">Wyślij</button>

            </form>
        </div>
    );
}

export default UserForm;
