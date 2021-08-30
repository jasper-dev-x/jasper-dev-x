import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { plusOne, minusOne } from '../../../reduxPie/cartSlice';


export default function CartBody({ cartItems, cart }) {
    const mode = useSelector(state => state.mode);
    const dispatch = useDispatch();
    var total = 0;
    const fontSize = 30;

    const qtyxPrice = (sum) => {
        total += sum;
        return sum;
    };

    return (
        <>
            <div className={ `bg-${mode.bg} py-3` }>
                { cartItems.map((item, key) => (
                    <div key={ key } className={ `d-flex container-fluid flex-column bg-${mode.bg} text-${mode.txt}` } >
                        <div className={ `d-flex row card-body border border-secondary` }>
                            {/* NAME */ }
                            <span className="display-6 text-center mb-3">{ item.name }</span>

                            {/* DETAILS ROW */ }
                            <div className="d-flex my-3">
                                <div className="d-flex col">
                                    {/* QTY */ }
                                    <div className="d-flex flex-fill">
                                        <button className="d-flex flex-fill centered myBtn px-2" onClick={ () => dispatch(minusOne({ _id: item._id.$oid })) }>
                                            <svg xmlns="http://www.w3.org/2000/svg" width={ fontSize } height={ fontSize } fill={ mode.bg === 'light' ? 'black' : 'white' } class="bi bi-dash" viewBox="0 0 16 16">
                                                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                                            </svg>
                                        </button>
                                        <input type="text" className="form-control p-0 text-center" style={ { width: 60, fontSize: fontSize - 10 } } value={ cart.quantityById[`${item._id.$oid}`] ? cart.quantityById[`${item._id.$oid}`] : 0 } readOnly />
                                        <button className="d-flex flex-fill centered myBtn px-2" onClick={ () => dispatch(plusOne({ _id: item._id.$oid })) }>
                                            <svg xmlns="http://www.w3.org/2000/svg" width={ fontSize } height={ fontSize } fill={ mode.bg === 'light' ? 'black' : 'white' } className="bi bi-plus" viewBox="0 0 16 16">
                                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                {/* PRICES */ }
                                <div className="d-flex col flex-column centered">
                                    <span className="lead">${ qtyxPrice(item.price.$numberInt * cart.quantityById[`${item._id.$oid}`]) }.00</span>
                                    <small style={ { color: `rgba(170,170,170,1)` } }>${ item.price.$numberInt }.00 x{ cart.quantityById[`${item._id.$oid}`] }</small>
                                </div>
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