import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../reduxPie/cartSlice';

export default function MenuList({ mode, menu }) {
    const minHeight = window.screen.height * .5;
    const height = `54vh`;
    const dispatch = useDispatch();
    const onAddToCart = (_id) => {
        dispatch(addToCart({ _id }));
    };

    return (
        <ul id="menu" className="list-group shadow bgRed rounded-3 overflow-auto pb-5" style={ { minHeight, height } }>
            { menu.map((item, key) => {
                if (item.quantity.$numberInt === "0")
                    return <div key={ key }></div>;
                return (
                    <li key={ key } className={ `list-group-item bgRed text-${mode.txt}` }>
                        <div className={ `d-flex flex-fill card bg-${mode.bg}` } style={ { height: `40vh` } }>
                            <div className="card-header display-6">{ item.name }</div>
                            <div className="card-body d-flex flex-fill flex-column align-items-center justify-content-around">
                                <h1 className="lead text-center">Price: ${ item.price.$numberInt }.00</h1>
                                <button className={ `btn btn-${mode.txt} ` } onClick={ () => onAddToCart(item._id.$oid) }>Add To Cart</button>
                            </div>
                        </div>
                    </li>
                );
            }) }
        </ul>
    );
}