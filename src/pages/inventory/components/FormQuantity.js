import React from 'react';

export default function FormQuantity({ quantity, setQuantity }) {

    return (
        <div className="input-group mb-3">
            <span className="input-group-text">Qty</span>
            <input type="number" className="form-control" value={ quantity } onChange={ (x) => setQuantity(x.target.value) } required />
        </div>
    );
};