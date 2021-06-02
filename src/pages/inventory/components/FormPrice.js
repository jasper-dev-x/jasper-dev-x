import React from 'react';

export default function FormPrice({ mode, price, setPrice }) {

    return (
        <div className="input-group mb-3">
            <span className="input-group-text">Price</span>
            <span className={ `input-group-text bg-${mode.bg} text-${mode.txt}` }>$</span>
            <input type="number" className="form-control" placeholder="0" value={ price } onChange={ (x) => setPrice(x.target.value) } required />
            <span className={ `input-group-text bg-${mode.bg} text-${mode.txt}` }>.00</span>
        </div>
    );
}