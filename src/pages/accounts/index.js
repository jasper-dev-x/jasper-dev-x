import React, { useState } from 'react';
import { connect } from 'react-redux';
import AccountForm from './components/AccountForm';
import AccountList from './components/AccountList';

const mapStateToProps = state => ({
    accounts: state.accounts
});

export function Accounts({ accounts = [] }) {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    return (
        <div className="d-flex flex-fill flex-column align-items-center bgRed pt-2">
            <h1 className="txtJasper display-3 mb-3">Accounts</h1>
            <div className="d-flex flex-grow-1 flex-column container">
                <AccountForm name={ name } setName={ setName } phone={ phone } setPhone={ setPhone } />
                <div className="d-flex row flex-grow-1">
                    <AccountList accounts={ accounts } />
                </div>
            </div>
        </div>
    );
}

export default connect(mapStateToProps)(Accounts);