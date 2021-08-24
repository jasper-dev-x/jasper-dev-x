import React from 'react';
import darkJ from '../images/darkJ.png';
import darkD from '../images/darkD.png';
import darkX from '../images/darkX.png';
import lightJ from '../images/lightJ.png';
import lightD from '../images/lightD.png';
import lightX from '../images/lightX.png';

export function JDXLoading({ mode }) {
    const XY = window.innerHeight > window.innerWidth * 1.25 ? window.innerWidth / 2 : window.innerHeight * .75 / 2;
    const height = XY;
    const width = XY;
    const position = 'absolute';

    if (mode.txt === 'dark')
        return (
            <div className="d-flex flex-fill flex-column centered">
                <div style={ { height, width } }>
                    <img className="loadJ" src={ darkJ } alt="..." style={ { height, width, position } } />
                    <img className="loadD" src={ darkD } alt="..." style={ { height, width, position } } />
                    <img className="loadX" src={ darkX } alt="..." style={ { height, width, position } } />
                </div>
            </div>
        );
    else {
        return (
            <div className="d-flex flex-fill flex-column centered">
                <div style={ { height, width } }>
                    <img className="loadJ" src={ lightJ } alt="..." style={ { height, width, position } } />
                    <img className="loadD" src={ lightD } alt="..." style={ { height, width, position } } />
                    <img className="loadX" src={ lightX } alt="..." style={ { height, width, position } } />
                </div>
            </div>
        );
    }
}