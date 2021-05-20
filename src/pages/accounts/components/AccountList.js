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
        <div className="d-flex flex-column">
            <h1 className="text-center txtJasper">Account List</h1>
            <ul className="list-group">
                { accounts.map((item, key) => (
                    <li key={ key } className="list-group-item shadow">
                        <div className="d-flex">
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