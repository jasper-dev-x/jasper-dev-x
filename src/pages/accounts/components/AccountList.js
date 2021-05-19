import React from 'react';
import { connect } from 'react-redux';
import { deleteAccount } from '../actions';

const mapStateToProps = state => ({
    accounts: state.accounts
});

const mapDispatchToProps = dispatch => ({
    onDeleteAccount: (phone) => dispatch(deleteAccount(phone))
});

export function AccountList({ accounts = [], onDeleteAccount = x => x }) {

    return (
        <div>
            <h1 className="text-center txtJasper">Account List</h1>
            <ul className="list-group shadow">
                { accounts.map((item, key) => (
                    <li key={ key } className="list-group-item container">
                        <div className="row px-3">
                            <div className="col">
                                <span>Name: { item.name }</span>
                            </div>
                            <div className="col">
                                <span>Phone: { item.phone }</span>
                            </div>
                            <div className="col-1">
                                <button className="btn btn-close" onClick={ () => onDeleteAccount(item.phone) }></button>
                            </div>
                        </div>
                    </li>
                )) }
            </ul>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountList);