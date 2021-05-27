import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createAccount } from '../actions';

const mapDispatchToProps = dispatch => ({
    onCreateAccount: (account) => dispatch(createAccount(account)),
});

export function AccountForm({ onCreateAccount = x => x }) {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (phone.length < 10 && phone.length !== 0)
            return document.getElementById("formPhone").classList.add("is-invalid");
        else if (phone.length === 10)
            return document.getElementById("formPhone").classList.replace("is-invalid", "is-valid");
        return document.getElementById("formPhone").classList.remove("is-invalid", "is-valid");
    }, [phone]);

    function addAccount() {
        onCreateAccount({ name, email, phone });
        setName('');
        setEmail('');
        setPhone('');
        window.scrollTo(0, 0);
    }

    return (
        <div className="container d-flex flex-column" style={ { height: `88vh` } }>
            <div className="row">
                <h1 className="text-center txtJasper display-4 my-5">Account Sign-Up</h1>
            </div>
            <div className="row">
                <div className="col-md">
                    <div className="form-floating mb-3">
                        <input id="formName" type="text" className="form-control form-control-sm" placeholder="Name" value={ name } onChange={ (x) => setName(x.target.value) } />
                        <label className="txtRed" htmlFor="form-name">Name</label>
                    </div>
                </div>
                <div className="col-md">
                    <div className="form-floating mb-3">
                        <input id="formEmail" type="text" className="form-control" placeholder="Avg.Joe@your.com" value={ email } onChange={ (x) => setEmail(x.target.value) } />
                        <label className="txtRed" htmlFor="form-email">Email</label>
                    </div>
                </div>
                <div className="col-md">
                    <div className="form-floating mb-3">
                        <input id="formPhone" type="number" className="form-control" placeholder="Phone Number" value={ phone } onChange={ (x) => {
                            if (x.target.value.length <= 10)
                                setPhone(x.target.value);
                            else
                                setPhone(phone.slice(0, 9));
                        } } />
                        <label className="txtRed" htmlFor="formPhone">Phone</label>
                    </div>

                </div>
                <div className="col-md-2 d-grid">
                    <button className="btn btn-dark mb-3" onClick={ () => addAccount() }>Create Account</button>
                </div>
            </div>
        </div>

    );
}

export default connect(null, mapDispatchToProps)(AccountForm);