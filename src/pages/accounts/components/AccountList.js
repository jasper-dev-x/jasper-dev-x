import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { deleteAccount as deleteSeshAccount, updateAccount as updateSeshAccount } from '../actions';
import { loadAccounts, deleteAccount as deleteDBAccount, updateAccount as updateDBAccount } from '../thunks';

const mapStateToProps = state => ({
    accounts: state.accounts,
    isLoading: state.accountsAreLoading
});

const mapDispatchToProps = dispatch => ({
    onSeshDeleteAccount: (id) => dispatch(deleteSeshAccount(id)),
    onDBDeleteAccount: (id) => dispatch(deleteDBAccount(id)),
    onSeshUpdateAccount: (account) => dispatch(updateSeshAccount(account)),
    onDBUpdateAccount: (account) => dispatch(updateDBAccount(account)),
    startLoadingAccounts: () => dispatch(loadAccounts())
});

export function AccountList({ mode, accounts = [], isLoading, onSeshDeleteAccount, onDBDeleteAccount, onSeshUpdateAccount, onDBUpdateAccount, startLoadingAccounts }) {
    // eslint-disable-next-line
    const [oid, setOid] = useState('');
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
        setOid(account._id.$oid);
        setName(account.name);
        setPhone(account.phone.$numberLong);
        setEmail(account.email);
    }

    function onDeleteAccount(id) {
        try {
            onSeshDeleteAccount(id);
            onDBDeleteAccount(id);
        } catch (err) {
            console.error("ERROR ON DELETE ACCOUNT AccountList.js: ", err);
        }
    }
    function onUpdateAccount(account) {
        try {
            onSeshUpdateAccount(account);
            onDBUpdateAccount(account);
        } catch (err) {
            console.error("ERROR ON UPDATE ACCOUNT AccountList.js: ", err);
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
                                                        <h1 className={ `display-6 text-${contrast()}` }>{ item.name }</h1>
                                                        <button className="btn btn-close bg-light" data-bs-dismiss="modal" />
                                                    </div>
                                                    <div className="modal-body">
                                                        <div className="input-group mb-3">
                                                            <span className="input-group-text">Name</span>
                                                            <input type="text" className="form-control" value={ name } onChange={ (x) => setName(x.target.value) } />
                                                        </div>
                                                        <div className="input-group mb-3">
                                                            <span className="input-group-text">Email</span>
                                                            <input type="email" className="form-control" value={ email } onChange={ (x) => setEmail(x.target.value) } />
                                                        </div>
                                                        <div className="input-group mb-3">
                                                            <span className="input-group-text">Phone</span>
                                                            <input type="phone" className="form-control" value={ phone } onChange={ (x) => setPhone(x.target.value) } />
                                                        </div>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <div className="d-grid flex-fill">
                                                            <button className={ `btn btn-${contrast()} mb-2` } onClick={ () => onUpdateAccount({ oid, name, phone, email }) } data-bs-dismiss="modal">Save</button>
                                                            <button className="btn btn-danger" onClick={ () => onDeleteAccount(oid) } data-bs-dismiss="modal">Delete</button>
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