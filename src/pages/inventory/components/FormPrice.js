import React from 'react';
import { useSelector } from 'react-redux';

export default function FormPrice({ price, setPrice }) {
    const mode = useSelector(state => state.mode);
    return (
        <div className="input-group mb-3">
            <span className="input-group-text">Price</span>
            <span className={ `input-group-text bg-${mode.bg} text-${mode.txt}` }>$</span>
            <input type="number" className={`form-control bg-${mode.bg} text-${mode.txt}`} placeholder="0" value={ price } onChange={ (x) => setPrice(x.target.value) } required />
            <span className={ `input-group-text bg-${mode.bg} text-${mode.txt}` }>.00</span>
        </div>
    );
}