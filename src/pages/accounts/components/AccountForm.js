import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { createAccount, apiCreateAccount } from '../../../reduxPie/accountSlice';
import FormName from './FormName';
import FormEmail from './FormEmail';
import FormPhone from './FormPhone';

export default function AccountForm({ mode }) {
    const formName = useRef();
    const formEmail = useRef();
    const formPhone = useRef();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState({ a: '', b: '', c: '' });
    const [email, setEmail] = useState('');
    const minHeight = `88vh`;
    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const newAccount = () => {
        const account = {
            name,
            email,
            phone: phone.a + phone.b + phone.c
        };
        try {
            if (name === '' || email === '' || phone.a === '' || phone.b === '' || phone.c === '')
                return;
            dispatch(createAccount(account));
            const newId = dispatch(apiCreateAccount(account));
            console.log("NEW ID: ", newId);
            setName('');
            setPhone({ a: '', b: '', c: '' });
            setEmail('');
            document.getElementById('topOfScreen').focus();
            window.scrollTo(0, 0);
        } catch (err) {
            console.error("ERROR ADD ACCOUNT AccountForm.js: ", err);
        }
    };

    return (
        <div className={ `container-fluid bg-${mode.bg}` } style={ { minHeight } }>
            <div className="row">
                <h1 className="text-center txtJasper display-4 my-4">Account Sign-Up</h1>
            </div>
            <form method="post">
                <div className="d-flex centered">
                    <div className="col-md-6 col">
                        <FormName name={ name } setName={ setName } ref={ formName } />
                    </div>
                </div>
                <div className="d-flex centered">
                    <div className="col-md-6 col">
                        <FormEmail email={ email } setEmail={ setEmail } ref={ formEmail } />
                    </div>
                </div>
                <div className="d-flex centered">
                    <div className="col-md-6 col">
                        <FormPhone phone={ phone } setPhone={ setPhone } ref={ formPhone } />
                    </div>
                </div>
                <div className="d-flex centered">
                    <div className="col-md-6 col">
                        <div className="d-grid">
                            <button id="submitAccount" className={ `btn btn-${mode.txt} mb-3` } onClick={ () => newAccount() }>Create Account</button>
                        </div>
                    </div>
                </div>
            </form>
        </div >
    );
}