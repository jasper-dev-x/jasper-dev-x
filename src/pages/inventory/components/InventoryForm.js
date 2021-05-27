import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createItem } from '../actions';

const mapDispatchToProps = dispatch => ({
    onCreateItem: (item) => dispatch(createItem(item))
});

export function InventoryForm({ onCreateItem = x => x, mode }) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');

    function addItem(item) {
        onCreateItem(item);
        setName('');
        setPrice(0);
        setQuantity(0);
        window.scrollTo(0, 0);
    }
    const contrast = () => { return mode === 'light' ? 'dark' : 'light'; };

    return (
        <div className="container" style={ { height: `88vh` } }>
            <h1 className={ `txtJasper display-4 text-${contrast()} py-3` }>Inventory Form</h1>
            <div className="input-group mb-3">
                <span className="input-group-text bgRed">Name</span>
                <input type="text" className="form-control" value={ name } onChange={ (x) => setName(x.target.value) } />
            </div>
            <div className="col">
                <div className="input-group mb-3">
                    <span className="input-group-text">Price</span>
                    <span className={ `input-group-text bg-${mode} text-${contrast()}` }>$</span>
                    <input type="number" className="form-control" placeholder="0" value={ price } onChange={ (x) => setPrice(x.target.value) } />
                    <span className={ `input-group-text bg-${mode} text-${contrast()}` }>.00</span>
                </div>
            </div>
            <div className="col">
                <div className="input-group mb-3">
                    <span className="input-group-text">Qty</span>
                    {/* <button className="btn btn-outline-success rounded" onClick={ () => setQuantity(quantity + 1) }>+</button> */ }
                    <input type="number" className="form-control" value={ quantity } onChange={ (x) => setQuantity(x.target.value) } />
                    {/* <button className="btn btn-outline-danger rounded" onClick={ () => setQuantity(quantity <= 0 ? 0 : quantity - 1) }>-</button> */ }
                </div>
            </div>

            <div className="d-grid">
                <button className="btn btn-outline-success" onClick={ () => addItem({ name, price, quantity }) }>Add Item</button>
            </div>
        </div >
    );
}

export default connect(null, mapDispatchToProps)(InventoryForm);