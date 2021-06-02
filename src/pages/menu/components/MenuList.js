import React from 'react';

export function MenuList({ mode, menu }) {

    return (
        <ul className="list-group shadow bgRed rounded-3 overflow-auto" style={ { height: `58vh` } }>
            { menu.map((item, key) => {
                if (item.quantity.$numberInt === "0")
                    return <div></div>;
                return (
                    <li key={ key } className={ `list-group-item bgRed text-${mode.txt}` }>
                        <div className={ `d-flex flex-fill card bg-${mode.bg}` }>
                            <div className="card-header display-6">{ item.name }</div>
                            <div className="card-body">
                                <h1 className="lead text-center">Price: ${ item.price.$numberInt }.00</h1>
                            </div>
                        </div>
                    </li>
                );
            }) }
        </ul>
    );
}