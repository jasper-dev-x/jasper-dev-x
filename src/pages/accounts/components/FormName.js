import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function FormName({ count = "", name, setName }) {
    const mode = useSelector(state => state.mode);

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
            <input id={ `formName${count}` } type="text" className={ `form-control bg-${mode.bg} text-${mode.txt}` } placeholder="Name" value={ name } onChange={ (x) => setName(x.target.value) } required />
            <label htmlFor={ `formName${count}` } className={ `text-${mode.txt}` }>Name</label>
        </div>
    );
}