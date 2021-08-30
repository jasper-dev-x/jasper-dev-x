import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MenuForm } from './components/MenuForm';
import { apiGetAllItems } from '../../reduxPie/inventorySlice';
import MenuList from './components/MenuList';

export default function Menu() {
    const dispatch = useDispatch();
    const mode = useSelector(state => state.mode);
    const inventory = useSelector(state => state.inventory);
    const [menu, setMenu] = useState(inventory.data.filter((x) => x.quantity.$numberInt !== "0"));
    const [sort, setSort] = useState("0");
    const [search, setSearch] = useState("");
    const minHeight = `88vh`;

    useEffect(() => {
        dispatch(apiGetAllItems());
    }, [dispatch]);

    useEffect(() => {
        setMenu(inventory.data
            .filter((x) => x.quantity.$numberInt !== "0")
            .filter((x) => x.name.toLowerCase().match(search.toLowerCase())));
    }, [search, inventory]);

    function sortMenu(num) {
        switch (num) {
            // PRICE HI -> LO
            case "1": {
                setMenu(menu.sort((a, b) => b.price.$numberInt - a.price.$numberInt));
                document.getElementById("menu").scrollTo(0, 0);
                break;
            }
            // PRICE LO -> HI
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
                setMenu(inventory.data);
                document.getElementById("menu").scrollTo(0, 0);
                break;
            }
        }
    }

    if (inventory.isLoading)
        return (
            <div className="d-flex flex-fill centered" style={ { minHeight } }>
                <span className={ `display-3 txtJasper text-${mode.txt}` }>Loading...</span>
            </div>
        );
    else
        return (
            <div className="d-flex flex-fill container-fluid">
                <div className="d-flex flex-fill row">
                    <div className="col">
                        <h1 className={ `txtJasper text-center text-${mode.txt} display-4 my-3` }>Menu</h1>
                        <MenuForm mode={ mode } search={ search } setSearch={ setSearch } sort={ sort } setSort={ setSort } sortMenu={ sortMenu } />
                    </div>
                    <div className="col-md-9">
                        <MenuList mode={ mode } menu={ menu } />
                    </div>
                </div>
            </div>
        );
};