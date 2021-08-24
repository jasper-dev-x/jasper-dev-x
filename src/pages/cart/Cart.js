import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { checkout } from '../../reduxPie/cartSlice';
import CartBody from './components/CartBody';

export default function Cart({ mode }) {
    const dispatch = useDispatch();
    const inventory = useSelector(state => state.inventory);
    const cart = useSelector(state => state.cart);
    const [cartItems, setCartItems] = useState(inventory.data.filter((x) => cart.addedIds.includes(x._id.$oid)));

    const onCheckout = () => {
        dispatch(checkout());
        setCartItems([]);
    };
    return (
        <div className={ `d-flex flex-fill centered bg-${mode.bg} text-${mode.txt} py-5` }>
            <div className="container">
                <div className={ `d-flex card shadow border-${mode.txt} mb-3` } style={ { borderRadius: 20 } }>
                    <div className="d-flex myCard-header">
                        <h1 className="txtJasper">Cart</h1>
                    </div>
                    <CartBody mode={ mode } cartItems={ cartItems } cart={cart} />
                </div>
                <div className="d-grid">
                    <button className={ `btn btn-${mode.txt} btn-lg` } onClick={ () => onCheckout() }>Check Out</button>
                </div>
            </div>
        </div>
    );
}