import React, { useState } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    inventory: state.inventory
});

export function Menu({ inventory = [], mode }) {
    const contrast = () => mode === "light" ? "dark" : "light";
    const [menu, setMenu] = useState(inventory);
    const [sort, setSort] = useState("0");

    function sortMenu(num) {
        switch (num) {
            // HI -> LO
            case "1": {
                setMenu(inventory.sort((a, b) => b.price - a.price));
                break;
            }
            // LO -> HI
            case "2": {
                setMenu(inventory.sort((a, b) => a.price - b.price));
                break;
            }
            // A - Z
            case "3": {
                setMenu(inventory.sort((a, b) => (a.name.toLowerCase() < b.name.toLowerCase()) ? -1 : 1));
                break;
            }
            // Z - A
            case "4": {
                setMenu(inventory.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? -1 : 1));
                break;
            }
            default: {
                setMenu(inventory);
                break;
            }
        }
    }

    return (
        <div className="d-flex flex-fill flex-column container">

            <div className="row">
                <div className="col">
                    <h1 className={ `txtJasper text-center text-${contrast()} display-4 my-3` }>Menu</h1>
                </div>
                <div className="col-md-3 d-flex align-items-center">
                    <select className={ `form-select bg-${mode} text-${contrast()} mb-3 border-secondary` } value={ sort } onChange={ (x) => {
                        sortMenu(x.target.value);
                        setSort(x.target.value);
                    } }>
                        <option value="0" disabled>Sort By</option>
                        <option value="1">Price Hi-Lo</option>
                        <option value="2">Price Lo-Hi</option>
                        <option value="3">Name A-Z</option>
                        <option value="4">Name Z-A</option>
                    </select>
                </div>
            </div>
            <div className="row">
                <div className="col-md-9">
                    <ul className="list-group shadow rounded-3 overflow-auto" style={ { height: `60vh` } }>
                        { menu.map((item, key) => (
                            <li key={ key } className={ `list-group-item bg-${mode} text-${contrast()} d-flex ` }>
                                <span>{ item.name }</span>
                                <span>{ item.price }.00</span>
                            </li>
                        )) }
                    </ul>
                </div>
                <div className="col">
                </div>
            </div>
        </div>
    );
};

export default connect(mapStateToProps)(Menu);