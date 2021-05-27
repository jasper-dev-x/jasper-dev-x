import React, { useState } from 'react';
import { connect } from 'react-redux';
import { deleteAccount, updateAccount } from '../actions';

const mapStateToProps = state => ({
    accounts: state.accounts
});

const mapDispatchToProps = dispatch => ({
    onDeleteAccount: (phone) => dispatch(deleteAccount(phone)),
    onUpdateAccount: (account) => dispatch(updateAccount(account))
});

export function AccountList({ accounts = [], mode, onDeleteAccount = x => x, onUpdateAccount = x => x }) {
    // eslint-disable-next-line
    const [name, setName] = useState('');
    // eslint-disable-next-line
    const [phone, setPhone] = useState('');
    // eslint-disable-next-line
    const [email, setEmail] = useState('');
    const contrast = () => { return mode === 'light' ? 'dark' : 'light'; };

    function setEditAccount(account) {
        setName(account.name);
        setPhone(account.phone);
        setEmail(account.email);
    }

    return (
        <div style={ { height: `88vh` } }>
            <h1 className="text-center txtJasper display-4 my-5">Account List</h1>
            <div id="accountList" className="accordion overflow-auto" style={ { height: `60vh` } }>
                { accounts.map((item, key) => (
                    <div className="accordion-item">
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
                                            <span className="input-group-text">Phone</span>
                                            <span className={ `input-group-text bg-${mode} text-${contrast()}` }>({ item.phone.slice(0, 3) })-{ item.phone.slice(3, 6) }-{ item.phone.slice(6) }</span>
                                        </div>
                                    </li>
                                    <li className="list-group-item border-0 d-grid"><button className="btn btn-dark" onClick={ () => onUpdateAccount(item.phone) } disabled>Edit Account</button></li>
                                    <li className="list-group-item border-0 d-grid"><button className="btn btn-danger" onClick={ () => onDeleteAccount(item.phone) }>Remove Account</button></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )) }
            </div>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountList);