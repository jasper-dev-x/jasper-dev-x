import React from 'react';
import { useSelector } from 'react-redux';

export default function FormName({ name, setName }) {
    const mode = useSelector(state => state.mode);

    return (
        <div className="input-group mb-3">
            <span className="input-group-text bgRed">Name</span>
            <input type="text" className={ `form-control bg-${mode.bg} text-${mode.txt}` } value={ name } onChange={ (x) => setName(x.target.value) } required />
        </div>
    );
}