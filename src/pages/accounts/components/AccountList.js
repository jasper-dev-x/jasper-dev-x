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

export function AccountList({ mode, accounts = [], isLoading = false, onDeleteSeshAccount, onDeleteDBAccount, onUpdateAccount, startLoadingAccounts }) {
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

    // if (isLoading)
    //     return <div>Loading...</div>;
    // else
    return (
        <div style={ { height: `88vh` } }>
            <h1 className="text-center txtJasper display-4 my-5">Account List</h1>
            <div id="accountList" className="accordion overflow-auto" style={ { height: `60vh` } }>
                <div className="list-group">
                    { accounts.map((item, key) => (
                        <div key={ key }>
                            <div className={ `list-group-item list-group-item-action list-group-item-${mode} rounded` }>{ item.name }</div>
                        </div>
                    )) }
                </div>

                {/* { accounts.map((item, key) => (
                    <div className="accordion-item" key={ key }>
                        <h1 className="accordion-header">
                            <button className="accordion-button collapsed" onClick={ () => setEditAccount(item) } data-bs-toggle="collapse" data-bs-target={ `#account${key}` } aria-expanded="false" aria-controls={ `account${key}` }>
                                { item.name }
                            </button>
                        </h1>
                        <div id={ `account${key}` } className="accordion-collapse collapse" data-bs-parent="#accountList">
                            <div className="accordion-body">
                                <ul className="list-group">
                                    <li className="list-group-item">
                                        <div className="input-group">
                                            <span className="input-group-text">Name</span>
                                            <span className={ `input-group-text bg-${mode} text-${contrast()}` }>{ item.name }</span>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <div className="input-group">
                                            <span className="input-group-text">Email</span>
                                            <span className={ `input-group-text bg-${mode} text-${contrast()}` }>{ item.email }</span>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <div className="input-group">
                                            <span className="input-group-text">Phone</span>
                                            <span className={ `input-group-text bg-${mode} text-${contrast()}` }>({ item.phone.$numberLong.slice(0, 3) })-{ item.phone.$numberLong.slice(3, 6) }-{ item.phone.$numberLong.slice(6) }</span>
                                        </div>
                                    </li>
                                    <li className="list-group-item border-0 d-grid"><button className="btn btn-dark" onClick={ () => onUpdateAccount(item.phone) } disabled>Edit Account</button></li>
                                    <li className="list-group-item border-0 d-grid"><button className="btn btn-danger" onClick={ () => onDeleteAccount(item._id.$oid) }>Remove Account</button></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )) } */}
            </div>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountList);