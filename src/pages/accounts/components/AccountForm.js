import React from 'react';
import { connect } from 'react-redux';
import { createAccount } from '../actions';

const mapDispatchToProps = dispatch => ({
    onCreateAccount: (account) => dispatch(createAccount(account)),
});

export function AccountForm({ name, setName = x => x, phone, setPhone = x => x, onCreateAccount = x => x }) {

    return (
        <div className="row">
            <div className="col-md-6 mb-3">
                <input type="text" className="form-control" placeholder="Name" value={ name } onChange={ (x) => setName(x.target.value) } />
            </div>
            <div className="col-md-4 mb-3">
                <input type="number" className="form-control" placeholder="Phone Number" value={ phone } onChange={ (x) => setPhone(x.target.value) } />
            </div>
            <div className="col-md-2 d-grid mb-3">
                <button className="btn btn-dark" onClick={ () => {
                    onCreateAccount({ name, phone });
                    setName('');
                    setPhone('');
                } }>Create Account</button>
            </div>
        </div>
    );
}

export default connect(null, mapDispatchToProps)(AccountForm);