import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../../reduxPie/cartSlice';

export default function MenuList({ menu }) {
    const mode = useSelector(state => state.mode);
    const height = `84vh`;
    const dispatch = useDispatch();
    const XY = 30;
    const fill = () => {
        if (mode.bg === 'light')
            return 'black';
        else
            return 'white';
    };
    const onAddToCart = (_id) => {
        dispatch(addToCart({ _id }));
    };

    return (
        <div className="d-flex flex-fill centered ps-4" style={ { height: `88vh` } }>
            <div id="menu" className="d-flex row shadow bgRed pb-5 pt-3" style={ { height } }>
                { menu.map((item, key) => {
                    return (
                        <div key={ key } className={ `col-md-6 text-${mode.txt}` }>
                            <div className={ `d-flex flex-fill card bg-${mode.bg} mb-3` }>
                                <div className="card-header display-6">{ item.name }</div>
                                <div className="card-body d-flex flex-fill justify-content-between">
                                    {/* ADD TO CAR BTN */ }
                                    <svg xmlns="http://www.w3.org/2000/svg" onClick={ () => onAddToCart(item._id.$oid) } width={ XY } height={ XY } fill={ fill() } className="bi bi-bag-plus" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z" />
                                        <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                                    </svg>
                                    <h1 className="lead mb-3">${ item.price.$numberInt }.00</h1>
                                </div>
                            </div>
                        </div>
                    );
                }) }
            </div>
        </div>
    );
}