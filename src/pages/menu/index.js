import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { displayAlert, loadInventory } from '../inventory/thunks';
import { MenuForm } from './components/MenuForm';
import { MenuList } from './components/MenuList';
import { getInventory, getIsInventoryLoading } from '../inventory/selectors';

const mapStateToProps = state => ({
    inventory: getInventory(state),
    isLoading: getIsInventoryLoading(state),
});

const mapDispatchToProps = dispatch => ({
    onDisplayAlert: (msg) => dispatch(displayAlert(msg)),
    startLoadingInventory: () => dispatch(loadInventory())
});

export function Menu({ mode, inventory = [], isLoading, startLoadingInventory = x => x }) {
    const [menu, setMenu] = useState(inventory);
    const [sort, setSort] = useState("0");
    const [search, setSearch] = useState("");

    useEffect(() => {
        startLoadingInventory();
    }, [startLoadingInventory]);

    useEffect(() => {
        setMenu(inventory.filter((x) => x.name.toLowerCase().match(search.toLowerCase())));
    }, [search, inventory]);

    function sortMenu(num) {
        switch (num) {
            // HI -> LO
            case "1": {
                setMenu(menu.sort((a, b) => b.price.$numberInt - a.price.$numberInt));
                document.getElementById("menu").scrollTo(0, 0);
                break;
            }
            // LO -> HI
            case "2": {
                setMenu(menu.sort((a, b) => a.price.$numberInt - b.price.$numberInt));
                document.getElementById("menu").scrollTo(0, 0);
                break;
            }
            // A - Z
            case "3": {
                setMenu(menu.sort((a, b) => (a.name.toLowerCase() < b.name.toLowerCase()) ? -1 : 1));
                document.getElementById("menu").scrollTo(0, 0);
                break;
            }
            // Z - A
            case "4": {
                setMenu(menu.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? -1 : 1));
                document.getElementById("menu").scrollTo(0, 0);
                break;
            }
            default: {
                setMenu(inventory);
                document.getElementById("menu").scrollTo(0, 0);
                break;
            }
        }
    }

    if (isLoading)
        return (
            <div className="d-flex flex-fill centerFlex" style={ { height: `88vh` } }>
                <span className={ `display-3 txtJasper text-${mode.txt}` }>Loading...</span>
            </div>
        );
    else
        return (
            <div className="container-fluid">
                <h1 className={ `txtJasper text-center text-${mode.txt} display-4 my-3` }>Menu</h1>
                <div className="row">
                    <div className="col">
                        <MenuForm mode={ mode } search={ search } setSearch={ setSearch } sort={ sort } setSort={ setSort } sortMenu={ sortMenu } />
                    </div>
                    <div className="col-md-9">
                        <MenuList mode={ mode } menu={ menu } />
                    </div>
                </div>
            </div>
        );
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);