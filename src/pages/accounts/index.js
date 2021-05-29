import React from 'react';
import { connect } from 'react-redux';
import AccountForm from './components/AccountForm';
import AccountList from './components/AccountList';

export function Accounts({ mode }) {
    const contrast = () => mode === 'light' ? 'dark' : 'light';
    return (
        <div className={ `d-flex flex-fill text-${contrast()}` } >
            <div className="d-flex flex-column container">
                <div className="d-flex row flex-grow-1">
                    <AccountList mode={ mode } />
                </div>
                <AccountForm mode={ mode } />
            </div>
        </div>
    );
}

export default connect()(Accounts);