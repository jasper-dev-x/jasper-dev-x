import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createItem as createSeshItem } from '../actions';
import { createItem as createDBItem } from '../thunks';
import FormName from './FormName';
import FormPrice from './FormPrice';
import FormQuantity from './FormQuantity';

const mapDispatchToProps = dispatch => ({
    onCreateSeshItem: (item) => dispatch(createSeshItem(item)),
    onCreateDBItem: (item) => dispatch(createDBItem(item))
});

export function InventoryForm({ mode, onCreateDBItem, onCreateSeshItem }) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const height = window.screen.height * .72;
    const minHeight = `88vh`;

    function addItem() {
        const item = {
            name,
            price,
            quantity
        };
        try {
            if (name === '' || price === '' || quantity === '')
                return;
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

    return (
        <form className={ `container bg-${mode.bg}` } style={ { minHeight, height } }>
            <h1 className={ `txtJasper display-4 py-3` }>Inventory Form</h1>
            <FormName name={ name } setName={ setName } />
            <FormPrice mode={ mode } price={ price } setPrice={ setPrice } />
            <FormQuantity quantity={ quantity } setQuantity={ setQuantity } />
            <div className="d-grid">
                <button type="submit" className={ `btn btn-${mode.txt}` } onClick={ () => addItem() }>Add Item</button>
            </div>
        </form>
    );
}

export default connect(null, mapDispatchToProps)(InventoryForm);