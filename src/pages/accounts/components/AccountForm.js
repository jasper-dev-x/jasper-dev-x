import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createAccount as createSeshAccount } from '../actions';
import { createAccount as createDBAccount } from '../thunks';
import FormName from './FormName';
import FormEmail from './FormEmail';
import FormPhone from './FormPhone';

const mapDispatchToProps = dispatch => ({
    onCreateSeshAccount: (account) => dispatch(createSeshAccount(account)),
    onCreateDBAccount: (account) => dispatch(createDBAccount(account))
});

export function AccountForm({ mode, onCreateSeshAccount, onCreateDBAccount }) {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState({ a: '', b: '', c: '' });
    const [email, setEmail] = useState('');

    function addAccount() {
        const add = {
            name,
            email,
            phone: phone.a + phone.b + phone.c
        };
        try {
            if (name === '' || email === '' || phone.a === '' || phone.b === '' || phone.c === '')
                return;
            onCreateSeshAccount(add);
            onCreateDBAccount(add);
            setName('');
            setPhone({ a: '', b: '', c: '' });
            setEmail('');
            window.scrollTo(0, 0);
        } catch (err) {
            console.error("ERROR ADD ACCOUNT AccountForm.js: ", err);
        }
    }

    return (
        <div className="container d-flex flex-column" style={ { height: `88vh` } }>
            <div className="row">
                <h1 className="text-center txtJasper display-4 my-4">Account Sign-Up</h1>
            </div>
            <form>
                <div className="d-flex centerFlex">
                    <div className="col-md-6 col">
                        <FormName name={ name } setName={ setName } />
                    </div>
                </div>
                <div className="d-flex centerFlex">
                    <div className="col-md-6 col">
                        <FormEmail email={ email } setEmail={ setEmail } />
                    </div>
                </div>
                <div className="d-flex centerFlex">
                    <div className="col-md-6 col">
                        <FormPhone phone={ phone } setPhone={ setPhone } />
                    </div>
                </div>
                <div className="d-flex centerFlex">
                    <div className="col-md-6 col">
                        <div className="d-grid">
                            <button id="submitAccount" className={ `btn btn-${mode.txt} mb-3` } onClick={ () => addAccount() }>Create Account</button>
                        </div>
                    </div>
                </div>
            </form>
        </div >
    );
}

export default connect(null, mapDispatchToProps)(AccountForm);