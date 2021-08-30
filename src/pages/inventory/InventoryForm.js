import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createItem, apiCreateItem } from '../../reduxPie/inventorySlice';
import FormName from './components/FormName';
import FormPrice from './components/FormPrice';
import FormQuantity from './components/FormQuantity';

export default function InventoryForm() {
    const mode = useSelector(state => state.mode);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const height = window.screen.height * .72;
    const minHeight = `88vh`;
    const dispatch = useDispatch();

    function addItem() {
        const item = { name, price, quantity };
        try {
            if (name === '' || price === '' || quantity === '')
                return;
            dispatch(createItem(item));
            dispatch(apiCreateItem(item));
            setName('');
            setPrice(0);
            setQuantity(0);
            window.scrollTo(0, 0);
        } catch (err) {
            console.error("ERROR ADD ITEM InventoryForm.js: ", err);
        }
    }

    return (
        <div className="container" style={ { minHeight, height } }>
            <h1 className="txtJasper display-4 py-3">Add To Inventory</h1>
            <FormName name={ name } setName={ setName } />
            <FormPrice mode={ mode } price={ price } setPrice={ setPrice } />
            <FormQuantity quantity={ quantity } setQuantity={ setQuantity } />
            <div className="d-grid mb-5">
                <button type="submit" className={ `btn btn-${mode.txt}` } onClick={ () => addItem() }>Add Item</button>
            </div>
            <Link to="/inventory" className="d-grid">
                <button className={ `btn btn-${mode.bg}` }>Go Back</button>
            </Link>
        </div>
    );
}