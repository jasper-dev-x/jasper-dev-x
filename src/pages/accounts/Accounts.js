import React from 'react';
import AccountForm from './components/AccountForm';
import AccountList from './components/AccountList';

export default function Accounts({ mode }) {
    return (
        <div className={ `d-flex flex-fill flex-column bg-${mode.bg} text-${mode.txt}` } >
            <AccountList mode={ mode } />
            <AccountForm mode={ mode } />
        </div>
    );
}