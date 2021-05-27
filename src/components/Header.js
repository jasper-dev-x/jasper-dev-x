import React from 'react';
import { Link } from 'react-router-dom';
import SPADE from '../images/jasperSpade.png';

export default function Header({ mode, setMode = x => x }) {
    const XY = 30;
    const changeMode = () => { mode === 'light' ? setMode('dark') : setMode('light'); };
    const contrast = () => { return mode === 'light' ? 'dark' : 'light'; };
    const links = ['accounts', 'inventory', 'menu'];

    return (
        <div className={ `d-flex fixed-top centerFlex bg-${mode} shadow` } style={ { height: `12vh` } }>
            <div className="d-flex flex-fill px-3">
                <div className="d-flex centerFlex">
                    <div className={ `btn btn-${mode}` } onClick={ () => changeMode() }>
                        <svg xmlns="http://www.w3.org/2000/svg" width={ XY - 5 } height={ XY - 5 } fill="currentColor" className="bi bi-moon-stars" viewBox="0 0 16 16">
                            <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278zM4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z" />
                            <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z" />
                        </svg>
                    </div>
                </div>
                <div className="d-flex centerFlex flex-grow-1">
                    <Link to="/">
                        <div className={ `card bg-${mode} border-0` }>
                            <img src={ SPADE } alt="..." width={ XY * 2.5 } />
                            <div className="card-img-overlay d-flex centerFlex">
                                <span className={ `txtJasper text-${contrast()} pb-1` } style={ { fontSize: XY - 6 } }>J</span>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="d-flex centerFlex">
                    <button className={ `btn btn-outline-${mode} border-0` } data-bs-toggle="offcanvas" data-bs-target="#offcanvasNav">
                        <svg xmlns="http://www.w3.org/2000/svg" width={ XY } height={ XY } fill="#9A182B" className="bi bi-list" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                        </svg>
                    </button>
                    <div id="offcanvasNav" className="offcanvas offcanvas-end d-flex" tabIndex="-1">
                        <div className="offcanvas-header centerFlex bgRed rounded">
                            <h1 className="display-5 txtJasper">Jasper.Dev.X</h1>
                            <button type="button" className="btn-close text-reset me-1" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className={ `offcanvas-body d-flex bg-${mode}` }>
                            <div className="d-flex flex-column flex-fill justify-content-around align-items-center">
                                { links.map((item, key) => (
                                    <div key={ key }>
                                        <Link to={ `/${item}` } onClick={ () => window.scrollTo(0, 0) }>
                                            <div className={ `btn btn-outline-${contrast()} border-0` } data-bs-dismiss="offcanvas">
                                                <span className="txtJasper display-6">{ item.slice(0, 1).toUpperCase() + item.slice(1) }</span>
                                            </div>
                                        </Link>
                                    </div>
                                )) }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}