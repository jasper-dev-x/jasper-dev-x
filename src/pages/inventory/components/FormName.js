import React from 'react';

export default function FormName({ name, setName }) {

    return (
        <div className="input-group mb-3">
            <span className="input-group-text bgRed">Name</span>
            <input type="text" className="form-control" value={ name } onChange={ (x) => setName(x.target.value) } required />
        </div>
    );
}