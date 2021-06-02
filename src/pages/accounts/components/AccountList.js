import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { deleteAccount as deleteSeshAccount, updateAccount as updateSeshAccount } from '../actions';
import { loadAccounts, deleteAccount as deleteDBAccount, updateAccount as updateDBAccount } from '../thunks';
import FormName from './FormName';
import FormEmail from './FormEmail';
import FormPhone from './FormPhone';

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
    const [phone, setPhone] = useState({ a: '', b: '', c: '' });
    // eslint-disable-next-line
    const [email, setEmail] = useState('');

    useEffect(() => {
        startLoadingAccounts();
    }, [startLoadingAccounts]);

    function setEditAccount({ _id, name, email, phone }) {
        setOid(_id.$oid ? _id.$oid : "reload");
        setName(name);
        setPhone({
            a: phone.$numberLong.slice(0, 3),
            b: phone.$numberLong.slice(3, 6),
            c: phone.$numberLong.slice(6)
        });
        setEmail(email);
    }

    function onDeleteAccount(id) {
        try {
            if (id !== "reload") {
                onSeshDeleteAccount(id);
                onDBDeleteAccount(id);
            }
        } catch (err) {
            console.error("ERROR ON DELETE ACCOUNT AccountList.js: ", err);
        }
    }

    function onUpdateAccount() {
        const account = {
            oid,
            name,
            email,
            phone: phone.a + phone.b + phone.c
        };
        try {
            onSeshUpdateAccount(account);
            onDBUpdateAccount(account);
        } catch (err) {
            console.error("ERROR ON UPDATE ACCOUNT AccountList.js: ", err);
        }
    }

    if (isLoading)
        return <div className="d-flex flex-fill centerFlex" style={ { height: `88vh` } }>
            <span className={ `display-3 txtJasper text-${mode.txt}` }>Loading...</span>
        </div>;
    else
        return (
            <div className="container-fluid" style={ { height: `88vh` } }>
                <h1 className="text-center txtJasper display-4 my-4">Account List</h1>
                <div id="accountList" className="accordion overflow-auto px-2 bgRed shadow rounded" style={ { height: `60vh`, paddingBottom: `12vh` } }>
                    {/* ACCOUNT LIST */ }
                    { accounts.map((item, key) => (
                        <div key={ key } className="accordion-item bgRed mx-3 mt-3">
                            {/* ACCORDION BUTTON */ }
                            <div className="accordion-header d-grid rounded">
                                <div className="btn-group">
                                    <button className={ `btn btn-${mode.bg} text-${mode.txt} py-3 collapsed` } data-bs-toggle="collapse" data-bs-target={ `#account${key}` } aria-expanded="false" aria-controls={ `account${key}` }>
                                        <span className="lead">{ item.name }</span>
                                        <span className="dropdown-toggle ms-5" />
                                    </button>
                                </div>
                            </div>
                            <div id={ `account${key}` } className={ `accordion collapse bg-${mode.bg}` } data-bs-parent="#accountList">
                                <div className="accordion-body">
                                    <div className="d-grid flex-fill">
                                        {/* VIEW DETAILS BUTTON */ }
                                        <button className={ `btn btn-${mode.txt} my-3` } onClick={ () => setEditAccount(item) } data-bs-toggle="modal" data-bs-target={ `#editAccountPopup${key}` } data-bs-keyboard="false">View { item.name }'s Details</button>

                                        {/* DELETE BUTTON */ }
                                        <button className="btn btn-secondary" onClick={ () => setEditAccount(item) } data-bs-toggle="modal" data-bs-target={ `#deleteAccountPopup${key}` }>Delete { item.name }'s Account</button>

                                        {/* DELETE POP-UP */ }
                                        <div id={ `deleteAccountPopup${key}` } className="modal fade" data-bs-backdrop="static">
                                            <div className="modal-dialog modal-dialog-centered">
                                                <div className={ `modal-content bg-${mode.bg} text-center` }>
                                                    <div className="modal-body">
                                                        <h1 className={ `display-5 text-${mode.txt}` }>Are you sure?</h1>
                                                    </div>
                                                    <div className="modal-body lead fw-bold text-danger">
                                                        <p>This is a *PERMANENT* account removal of:</p>
                                                        <p className="display-6">{ name }</p>
                                                    </div>
                                                    <div className="modal-body">
                                                        <div className="d-flex flex-fill justify-content-around">
                                                            <button className="btn btn-danger" data-bs-dismiss="modal" onClick={ () => onDeleteAccount(oid) }>Delete</button>
                                                            <button className={ `btn btn-${mode.txt}` } data-bs-dismiss="modal">Cancel</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* VIEW DETAILS POP-UP */ }
                                        <div id={ `editAccountPopup${key}` } className="modal fade" data-bs-backdrop="static">
                                            <div className="modal-dialog modal-dialog-centered">
                                                <div className={ `modal-content bg-${mode.bg} text-${mode.txt}` }>
                                                    <div className="modal-body d-flex justify-content-between">
                                                        <h1 className="display-6">{ item.name }</h1>
                                                        <button className="btn btn-close bg-light" data-bs-dismiss="modal" />
                                                    </div>
                                                    <div className="modal-body">
                                                        <FormName count={ key } name={ name } setName={ setName } />
                                                        <FormEmail count={ key } email={ email } setEmail={ setEmail } />
                                                        <FormPhone count={ key } phone={ phone } setPhone={ setPhone } />
                                                    </div>
                                                    <div className="modal-body">
                                                        <div className="d-grid flex-fill">
                                                            <button className={ `btn btn-${mode.txt} mb-2` } onClick={ () => onUpdateAccount() } data-bs-dismiss="modal">Save</button>
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
            </div >
        );
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountList);