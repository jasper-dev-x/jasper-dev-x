import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../../reduxPie/cartSlice';

export default function MenuList({ menu }) {
    const mode = useSelector(state => state.mode);
    const height = window.innerHeight < window.innerWidth * 1.35 ? `84vh` : `59vh`;
    const dispatch = useDispatch();
    const XY = 30;
    const fill = () => {
        if (mode.bg === 'light')
            return 'black';
        else
            return 'white';
    };
    const onAddToCart = async (_id, bagId, checkId) => {
        const bag = document.getElementById(bagId);
        const check = document.getElementById(checkId);
        try {
            bag.classList.add('d-none');
            check.classList.remove('d-none');
            dispatch(addToCart({ _id }));
        } catch (err) {
            console.error("ERROR ON ADD TO CART: " + err);
        } finally {
            setTimeout(() => {
                bag.classList.remove('d-none');
                check.classList.add('d-none');
            }, 1000);
        }
    };

    return (
        <div className="d-flex flex-fill align-items-end ps-4">
            <div id="menu" className="d-flex row bgRed pb-5 pt-3" style={ { height } }>
                { menu.map((item, key) => {
                    return (
                        <div key={ key } className={ `col-md-6 text-${mode.txt}` }>
                            <div className={ `d-flex flex-fill card bg-${mode.bg} shadow-sm mb-3` }>
                                <div className="card-header display-6 user-select-none">{ item.name }</div>
                                <div className="card-body d-flex flex-fill justify-content-between">

                                    {/* ADD TO CAR BTN */ }
                                    <div>
                                        <svg id={ `bag${key}` } xmlns="http://www.w3.org/2000/svg" onClick={ () => onAddToCart(item._id.$oid, `bag${key}`, `check${key}`) } width={ XY } height={ XY } fill={ fill() } className="bi bi-bag-plus position-absolute" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z" />
                                            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                                        </svg>
                                        <svg id={ `check${key}` } xmlns="http://www.w3.org/2000/svg" width={ XY } height={ XY } fill="currentColor" className="bi bi-check-lg position-absolute d-none" viewBox="0 0 16 16">
                                            <path d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z" />
                                        </svg>
                                    </div>

                                    <h1 className="lead mb-3 user-select-none">${ item.price.$numberInt }.00</h1>
                                </div>
                            </div>
                        </div>
                    );
                }) }
            </div>
        </div>
    );
}