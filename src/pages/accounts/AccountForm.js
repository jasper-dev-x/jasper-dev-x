import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createAccount, apiCreateAccount } from '../../reduxPie/accountSlice';
import FormName from './components/FormName';
import FormEmail from './components/FormEmail';
import FormPhone from './components/FormPhone';

export default function AccountForm() {
    const mode = useSelector(state => state.mode);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState({ a: '', b: '', c: '' });
    const [email, setEmail] = useState('');
    const minHeight = `88vh`;
    const dispatch = useDispatch();

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
            document.getElementById('formName').blur();
            document.getElementById('formEmail').blur();
            document.getElementById(`formPhone1`).blur();
            document.getElementById(`formPhone2`).blur();
            document.getElementById(`formPhone3`).blur();
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
            <div>
                <div className="d-flex centered">
                    <div className="col-md-6 col">
                        <FormName name={ name } setName={ setName } />
                    </div>
                </div>
                <div className="d-flex centered">
                    <div className="col-md-6 col">
                        <FormEmail email={ email } setEmail={ setEmail } />
                    </div>
                </div>
                <div className="d-flex centered">
                    <div className="col-md-6 col">
                        <FormPhone phone={ phone } setPhone={ setPhone } />
                    </div>
                </div>
                <div className="d-flex centered">
                    <div className="col-md-6 col d-grid">
                        <button id="submitAccount" className={ `btn btn-${mode.txt} mb-5` } onClick={ () => newAccount() }>Create Account</button>
                        <Link to="/accounts" className="d-grid">
                            <button className={ `btn btn-${mode.bg}` }>Go Back</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div >
    );
}