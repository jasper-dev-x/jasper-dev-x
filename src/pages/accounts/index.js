import React from 'react';
import { connect } from 'react-redux';
import AccountForm from './components/AccountForm';
import AccountList from './components/AccountList';

export function Accounts() {

    return (
        <div className="d-flex flex-fill flex-column align-items-center bgRed pt-2">
            <h1 className="txtJasper display-3 mb-3">Accounts</h1>
            <div className="d-flex flex-grow-1 flex-column container">
                <AccountForm />
                <div className="d-flex row flex-grow-1">
                    <AccountList />
                </div>
            </div>
        </div>
    );
}

export default connect()(Accounts);