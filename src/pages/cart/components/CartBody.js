import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { plusOne, minusOne } from '../../../reduxPie/cartSlice';


export default function CartBody({ mode, cartItems, cart }) {
    const dispatch = useDispatch();
    var total = 0;

    const qtyxPrice = (sum) => {
        total += sum;
        return sum;
    };

    return (
        <>
            <div className="my-3">
                { cartItems.map((item, key) => (
                    <div key={ key } className={ `d-flex container-fluid flex-column bg-${mode.bg} text-${mode.txt}` } >
                        <div className={ `d-flex row card-body border border-secondary` }>
                            <div className="d-flex col flex-column centered">
                                {/* NAME */ }
                                <span className="lead mb-3">{ item.name }</span>

                                {/* QTY */ }
                                <div className="input-group mb-3" style={ { width: 120 } }>
                                    <button className="btn btn-outline-success border-0" onClick={ () => dispatch(plusOne({_id: item._id.$oid})) }>+</button>
                                    <input type="text" className="form-control p-0 text-center" value={ cart.quantityById[`${item._id.$oid}`] } readOnly />
                                    <button className="btn btn-outline-danger border-0" onClick={ () => dispatch(minusOne({_id: item._id.$oid})) }>-</button>
                                </div>
                            </div>
                            <div className="d-flex col flex-column centered">
                                {/* PRICES */ }
                                <span className="lead">${ qtyxPrice(item.price.$numberInt * cart.quantityById[`${item._id.$oid}`]) }.00</span>
                                <small style={ { color: `rgba(170,170,170,1)` } }>${ item.price.$numberInt }.00 x{ cart.quantityById[`${item._id.$oid}`] }</small>
                            </div>
                        </div>
                    </div>
                ))
                }
            </div>
            <div className="d-flex myCard-footer">
                <h1 className="txtJasper">Total: $ { total }.00</h1>
            </div>
        </>
    );
}