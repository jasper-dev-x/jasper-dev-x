import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function FormEmail({ count = "", email, setEmail }) {
    const mode = useSelector(state => state.mode);

    // EMAIL VALIDATION
    useEffect(() => {
        const formEmail = document.getElementById(`formEmail${count}`);
        if (!email.startsWith("@") && email.includes("@") && email.endsWith(".com")) {
            formEmail.classList.replace("is-invalid", "is-valid");
            document.getElementById(`formPhone${count}1`).focus();
        } else if (email.length > 0) {
            formEmail.classList.add("is-invalid");
        } else {
            formEmail.classList.remove("is-invalid", "is-valid");
        }
    }, [email, count]);

    return (
        <div className="form-floating mb-3">
            <input id={ `formEmail${count}` } type="text" className={ `form-control bg-${mode.bg} text-${mode.txt}` } placeholder="Avg.Joe@your.com" value={ email } onChange={ (x) => setEmail(x.target.value) } required />
            <label htmlFor={ `formEmail${count}` } className={ `text-${mode.txt}` }>Email</label>
        </div>
    );
}