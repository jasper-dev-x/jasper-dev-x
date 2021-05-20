import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createItem } from '../actions';

const mapDispatchToProps = dispatch => ({
    onCreateItem: (item) => dispatch(createItem(item))
});

export function InventoryForm({ onCreateItem = x => x }) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState(0);

    function addItem(item) {
        onCreateItem(item);
        setName('');
        setPrice(0);
        setQuantity(0);
    }

    return (
        <div className="p-3">
            <div className="input-group mb-3">
                <span className="input-group-text bgRed">Name</span>
                <input type="text" className="form-control" value={ name } onChange={ (x) => setName(x.target.value) } />
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text">$</span>
                <input type="number" className="form-control" placeholder="0" value={ price } onChange={ (x) => setPrice(x.target.value) } />
                <span className="input-group-text">.00</span>
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text rounded me-2">Quantity</span>
                <button className="btn btn-outline-success rounded" onClick={ () => setQuantity(quantity + 1) }>+</button>
                <input type="number" className="form-control" value={ quantity } onChange={ (x) => setQuantity(x.target.value) } disabled />
                <button className="btn btn-outline-danger rounded" onClick={ () => setQuantity(quantity <= 0 ? 0 : quantity - 1) }>-</button>
            </div>
            <div className="d-grid">
                <button className="btn btn-success" onClick={ () => addItem({
                    name,
                    price,
                    quantity
                }) }>Add Item</button>
            </div>
        </div>
    );
}

export default connect(null, mapDispatchToProps)(InventoryForm);