import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleMode } from '../reduxPie/modeSlice';
import darkLogo from '../images/darkLogo.png';
import lightLogo from '../images/lightLogo.png';
import TWINZ from '../images/TwinzLogo.png';
import MIB from '../images/MIB.png';
import COLORCAM from '../images/ColorCam.png';

export default function Header() {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const mode = useSelector(state => state.mode);
    const [totalCartQty, setTotalCartQty] = useState(0);
    const XY = 30;
    const links = ['accounts', 'inventory', 'menu'];
    const minHeight = (window.innerHeight - 1) * .12;
    useEffect(() => {
        var localTotalCartQty = 0;
        try {
            cart.addedIds.forEach((item) => {
                localTotalCartQty += cart.quantityById[`${item}`];
            });
        } finally {
            setTotalCartQty(localTotalCartQty);
        }
    }, [cart]);

    return (
        <div className={ `d-flex fixed-top centered bg-${mode.bg} shadow` } style={ { minHeight } }>
            <div className="d-flex flex-fill px-3">

                {/* NIGHT MODE TOGGLE */ }
                <div className="d-flex centered">
                    <div className={ `btn btn-${mode.bg}` } onClick={ () => dispatch(toggleMode()) }>
                        <svg xmlns="http://www.w3.org/2000/svg" width={ XY - 5 } height={ XY - 5 } fill="currentColor" className="bi bi-moon-stars" viewBox="0 0 16 16">
                            <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278zM4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z" />
                            <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z" />
                        </svg>
                    </div>
                </div>

                {/* HOME LOGO LINK */ }
                <div className="d-flex centered flex-grow-1">
                    <Link to="/">
                        <img src={ mode.txt === 'dark' ? darkLogo : lightLogo } alt="..." height={ XY * 2.2 } />
                    </Link>
                </div>

                {/* OFFCANVAS MENU */ }
                <div className="d-flex centered">
                    {/* MENU BUTTON */ }
                    <button className={ `btn btn-outline-${mode.bg} border-0` } data-bs-toggle="offcanvas" data-bs-target="#offcanvasNav">
                        <svg xmlns="http://www.w3.org/2000/svg" width={ XY } height={ XY } fill="#9A182B" className="bi bi-list" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                        </svg>
                    </button>
                    <span className={ `badge rounded-pill bg-${mode.txt} text-${mode.bg} position-absolute` } style={ { right: 10, bottom: `60%` } } data-bs-toggle="offcanvas" data-bs-target="#offcanvasNav">{ totalCartQty }</span>

                    {/* MENU CONTENTS */ }
                    <div id="offcanvasNav" className="offcanvas offcanvas-end d-flex" tabIndex="-1">
                        {/* HEADER */ }
                        <div className="offcanvas-header centered bgRed rounded">
                            <h1 className="display-5 txtJasper">Jasper.Dev.X</h1>
                            <button type="button" className="btn-close text-reset me-1" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className={ `offcanvas-body d-flex bg-${mode.bg}` }>
                            <div className="d-flex flex-column flex-fill">
                                <div className="d-flex flex-column centered myLinkGroup p-2 mb-3">
                                    {/* NAV LINKS */ }
                                    { links.map((item, key) => (
                                        <div key={ key }>
                                            <Link to={ `/${item}` } onClick={ () => window.scrollTo(0, 0) }>
                                                <div className={ `btn btn-outline-${mode.txt} border-0 mb-2` } data-bs-dismiss="offcanvas">
                                                    <span className="txtJasper display-6">{ item.slice(0, 1).toUpperCase() + item.slice(1) }</span>
                                                </div>
                                            </Link>
                                        </div>
                                    )) }

                                    {/* CART LINK */ }
                                    <Link to={ `/cart` } onClick={ () => window.scrollTo(0, 0) }>
                                        <div className={ `btn btn-outline-${mode.txt} border-0` } data-bs-dismiss="offcanvas">
                                            <span className="txtJasper display-6">Cart</span>
                                        </div>
                                        <span className="badge rounded-pill bgRed cartBadge">{ totalCartQty }</span>
                                    </Link>
                                </div>
                                <div className="d-flex flex-fill flex-column myLinkGroup p-2">
                                    <h1 className="display-6 text-center mb-5">Other Projects</h1>
                                    <div className="d-flex justify-content-around">
                                        <a href="https://colorcam-jxrmd.mongodbstitch.com/" className="btn">
                                            <img src={ COLORCAM } alt="..." width={ XY * 2 } height={ XY * 2 } />

                                        </a>
                                        <a href="https://mib-productions-escdq.mongodbstitch.com/" className="btn btn-dark">
                                            <img src={ MIB } alt="..." width={ XY * 1.75 } height={ XY * 1.75 } />
                                        </a>
                                        <a href="https://twinzhotchicken-mmeew.mongodbstitch.com/" className="btn btn-light">
                                            <img src={ TWINZ } alt="..." width={ XY * 2 } height={ XY * 2 } />
                                        </a>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}