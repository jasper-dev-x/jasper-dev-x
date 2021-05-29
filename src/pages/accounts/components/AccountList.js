import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { deleteAccount as deleteSeshAccount, updateAccount } from '../actions';
import { loadAccounts, deleteAccount as deleteDBAccount } from '../thunks';

const mapStateToProps = state => ({
    accounts: state.accounts,
    isLoading: state.accountsAreLoading
});

const mapDispatchToProps = dispatch => ({
    onDeleteSeshAccount: (id) => dispatch(deleteSeshAccount(id)),
    onDeleteDBAccount: (id) => dispatch(deleteDBAccount(id)),
    onUpdateAccount: (account) => dispatch(updateAccount(account)),
    startLoadingAccounts: () => dispatch(loadAccounts())
});

export function AccountList({ mode, accounts = [], isLoading, onDeleteSeshAccount, onDeleteDBAccount, onUpdateAccount, startLoadingAccounts }) {
    // eslint-disable-next-line
    const [name, setName] = useState('');
    // eslint-disable-next-line
    const [phone, setPhone] = useState('');
    // eslint-disable-next-line
    const [email, setEmail] = useState('');
    const contrast = () => { return mode === 'light' ? 'dark' : 'light'; };

    useEffect(() => {
        startLoadingAccounts();
    }, [startLoadingAccounts]);

    function setEditAccount(account) {
        setName(account.name);
        setPhone(account.phone.$numberLong);
        setEmail(account.email);
    }

    function onDeleteAccount(id) {
        try {
            onDeleteSeshAccount(id);
            onDeleteDBAccount(id);
        } catch (err) {
            console.error("ERROR DELETE ACCOUNT AccountList.js: ", err);
        }
    }

    if (isLoading)
        return <div>Loading...</div>;
    else
        return (
            <div style={ { height: `88vh` } }>
                <h1 className="text-center txtJasper display-4 my-5">Account List</h1>
                <div id="accountList" className="accordion overflow-auto" style={ { height: `60vh` } }>
                    { accounts.map((item, key) => (
                        <div key={ key } className="accordion-item bgRed">
                            <div className="accordion-header d-grid rounded">
                                <div className="btn-group">
                                    <button className={ `btn btn-${mode} text-${contrast()} collapsed` } data-bs-toggle="collapse" data-bs-target={ `#account${key}` } aria-expanded="false" aria-controls={ `account${key}` }>
                                        <span>{ item.name }</span>
                                        <span className="dropdown-toggle ms-5" />
                                    </button>
                                </div>
                            </div>
                            <div id={ `account${key}` } className={ `accordion collapse bg-${mode}` } data-bs-parent="#accountList">
                                <div className="accordion-body">
                                    <div className="d-grid flex-fill">
                                        <button className={ `btn btn-outline-${contrast()} my-3` } onClick={ () => setEditAccount(item) } data-bs-toggle="modal" data-bs-target={ `#editAccountPopup${key}` } data-bs-keyboard="false">View { item.name }'s Details</button>
                                        <div id={ `editAccountPopup${key}` } className="modal fade" data-bs-backdrop="static">
                                            <div className="modal-dialog modal-dialog-centered">
                                                <div className={ `modal-content bg-${mode}` }>
                                                    <div className="modal-header">
                                                        <h1 className="display-6">{ item.name }</h1>
                                                        <button className="btn btn-close bg-light" data-bs-dismiss="modal" />
                                                    </div>
                                                    <div className="modal-body">
                                                        <div className="input-group mb-3">
                                                            <span className="input-group-text">Name</span>
                                                            <input type="email" className="form-control" value={ name } onChange={ (x) => setName(x.target.value) } />
                                                        </div>
                                                        <div className="input-group mb-3">
                                                            <span className="input-group-text">Email</span>
                                                            <input type="email" className="form-control" value={ email } onChange={ (x) => setEmail(x.target.value) } />
                                                        </div>
                                                        <div className="input-group mb-3">
                                                            <span className="input-group-text">Phone</span>
                                                            <input type="email" className="form-control" value={ phone } onChange={ (x) => setPhone(x.target.value) } />
                                                        </div>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <div className="d-grid flex-fill">
                                                            <button className={ `btn btn-${contrast()} mb-2` }>Save</button>
                                                            <button className="btn btn-danger">Delete</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )) }
                </div>
            </div>
        );
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountList);