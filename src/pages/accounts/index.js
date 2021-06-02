import React from 'react';
import { connect } from 'react-redux';
import AccountForm from './components/AccountForm';
import AccountList from './components/AccountList';

export function Accounts({ mode }) {
    return (
        <div className={ `container d-flex flex-fill flex-column text-${mode.txt}` } >
            <AccountList mode={ mode } />
            <AccountForm mode={ mode } />
        </div>
    );
}

export default connect()(Accounts);