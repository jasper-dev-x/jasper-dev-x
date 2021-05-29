import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createItem as createSeshItem } from '../actions';
import { createItem as createDBItem } from '../thunks';

const mapDispatchToProps = dispatch => ({
    onCreateSeshItem: (item) => dispatch(createSeshItem(item)),
    onCreateDBItem: (item) => dispatch(createDBItem(item))
});

export function InventoryForm({ mode, onCreateDBItem, onCreateSeshItem }) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');

    function addItem(item) {
        try {
            onCreateDBItem(item);
            onCreateSeshItem(item);
            setName('');
            setPrice(0);
            setQuantity(0);
            window.scrollTo(0, 0);
        } catch (err) {
            console.error("ERROR ADD ITEM InventoryForm.js: ", err);
        }
    }
    const contrast = () => { return mode === 'light' ? 'dark' : 'light'; };

    return (
        <div className="container" style={ { height: `88vh` } }>
            <h1 className={ `txtJasper display-4 py-3` }>Inventory Form</h1>
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
                    <input type="number" className="form-control" value={ quantity } onChange={ (x) => setQuantity(x.target.value) } />
                </div>
            </div>

            <div className="d-grid">
                <button className="btn btn-outline-success" onClick={ () => addItem({ name, price, quantity }) }>Add Item</button>
            </div>
        </div >
    );
}

export default connect(null, mapDispatchToProps)(InventoryForm);