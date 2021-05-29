import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createAccount as createSeshAccount } from '../actions';
import { createAccount as createDBAccount } from '../thunks';

const mapDispatchToProps = dispatch => ({
    onCreateSeshAccount: (account) => dispatch(createSeshAccount(account)),
    onCreateDBAccount: (account) => dispatch(createDBAccount(account))
});

export function AccountForm({ mode, onCreateSeshAccount, onCreateDBAccount }) {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState({ a: '', b: '', c: '' });
    const [email, setEmail] = useState('');
    const contrast = () => mode === 'light' ? 'dark' : 'light';

    useEffect(() => {
        if (phone.length < 10 && phone.length !== 0)
            return document.getElementById("formPhone").classList.add("is-invalid");
        else if (phone.length === 10)
            return document.getElementById("formPhone").classList.replace("is-invalid", "is-valid");
        return document.getElementById("formPhone").classList.remove("is-invalid", "is-valid");
    }, [phone]);

    function addAccount() {
        const add = {
            name,
            email,
            phone: phone.a + phone.b + phone.c
        };
        try {
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
                <h1 className="text-center txtJasper display-4 my-5">Account Sign-Up</h1>
            </div>
            <div className="d-flex centerFlex">
                <div className="col-md-6 col">
                    <div className="form-floating mb-3">
                        <input id="formName" type="text" className="form-control" placeholder="Name" value={ name } onChange={ (x) => setName(x.target.value) } />
                        <label htmlFor="formName" className="txtRed">Name</label>
                    </div>
                </div>
            </div>
            <div className="d-flex centerFlex">
                <div className="col-md-6 col">
                    <div className="form-floating mb-3">
                        <input id="formEmail" type="text" className="form-control" placeholder="Avg.Joe@your.com" value={ email } onChange={ (x) => setEmail(x.target.value) } />
                        <label htmlFor="formEmail" className="txtRed">Email</label>
                    </div>
                </div>
            </div>
            <div className="d-flex centerFlex">
                <div className="col-md-6">
                    <div className="input-group mb-3">
                        <span className={ `d-flex align-items-center pe-2` } style={ { fontSize: 24 } }>(</span>
                        <input id="formPhone" type="number" className="form-control form-control-lg txtRed rounded" value={ phone.a } onChange={ (x) => {
                            if (x.target.value.length <= 3)
                                setPhone({ a: x.target.value, b: phone.b, c: phone.c });
                            else
                                setPhone({ a: phone.a.slice(0, 2), b: phone.b, c: phone.c });
                        } } />
                        <span className={ `d-flex align-items-center px-2` } style={ { fontSize: 24 } }>) -</span>
                        <input id="formPhone" type="number" className="form-control form-control-lg txtRed rounded" value={ phone.b } onChange={ (x) => {
                            if (x.target.value.length <= 3)
                                setPhone({ a: phone.a, b: x.target.value, c: phone.c });
                            else
                                setPhone({ a: phone.a, b: phone.b.slice(0, 2), c: phone.c });
                        } } />
                        <span className={ `d-flex align-items-center px-2` } style={ { fontSize: 24 } }>-</span>

                        <input id="formPhone" type="number" className="form-control form-control-lg txtRed rounded" value={ phone.c } onChange={ (x) => {
                            if (x.target.value.length <= 4)
                                setPhone({ a: phone.a, b: phone.b, c: x.target.value });
                            else
                                setPhone({ a: phone.a, b: phone.b, c: phone.c.slice(0, 3) });
                        } } />
                    </div>
                </div>
            </div>
            <div className="d-flex centerFlex">
                <div className="col-md-6">
                    <div className="d-grid">
                        <button className={ `btn btn-${contrast()} mb-3` } onClick={ () => addAccount() }>Create Account</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default connect(null, mapDispatchToProps)(AccountForm);