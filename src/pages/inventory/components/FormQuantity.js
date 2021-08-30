import React from 'react';
import { useSelector } from 'react-redux';

export default function FormQuantity({ quantity, setQuantity }) {
    const mode = useSelector(state => state.mode);

    return (
        <div className="input-group mb-3">
            <span className="input-group-text">Qty</span>
            <input type="number" className={ `form-control bg-${mode.bg} text-${mode.txt}` } value={ quantity } onChange={ (x) => setQuantity(x.target.value) } required />
        </div>
    );
};