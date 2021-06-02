import React, { useEffect } from 'react';

export default function FormName({ count = "", name, setName }) {

    // NAME VALIDATION
    useEffect(() => {
        const formName = document.getElementById(`formName${count}`);
        if (name.length !== 0)
            formName.classList.add("is-valid");
        else
            formName.classList.remove("is-valid");

    }, [name, count]);

    return (
        <div className="form-floating mb-3">
            <input id={ `formName${count}` } type="text" className="form-control" placeholder="Name" value={ name } onChange={ (x) => setName(x.target.value) } required />
            <label htmlFor={ `formName${count}` } className="txtRed">Name</label>
        </div>
    );
}