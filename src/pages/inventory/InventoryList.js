import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { apiUpdateItem, apiDeleteItem, updateItem, deleteItem, initInventory, apiGetAllItems } from '../../reduxPie/inventorySlice';
import FormName from './components/FormName';
import FormPrice from './components/FormPrice';

export default function InventoryList() {
    const dispatch = useDispatch();
    const inventory = useSelector((state) => state.inventory);
    const mode = useSelector(state => state.mode);
    const [oid, setOid] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const minHeight = `88vh`;
    const XY = 30;
    const fill = () => mode.bg === 'light' ? 'black' : 'white';

    useEffect(() => {
        dispatch(initInventory());
        dispatch(apiGetAllItems());
    }, [dispatch]);

    // FORM QUANTITY VALIDATION
    useEffect(() => {
        const formQuantity = document.getElementById("formQty");
        if (quantity === "0") {
            formQuantity.classList.remove("bg-warning");
            formQuantity.classList.add("bg-danger");
        }
        else if (parseInt(quantity) < 10) {
            formQuantity.classList.remove("bg-danger");
            formQuantity.classList.add("bg-warning");
        }
        else
            formQuantity.classList.remove("bg-warning", "bg-danger");
    }, [quantity]);

    function setEditForm(item) {
        setOid(item._id.$oid);
        setName(item.name);
        setPrice(item.price.$numberInt);
        setQuantity(item.quantity.$numberInt);
    }

    function onUpdateItem() {
        const item = { _id: oid, name, price, quantity };
        dispatch(updateItem(item));
        dispatch(apiUpdateItem(item));
    }

    function onDeleteItem() {
        dispatch(deleteItem({ _id: oid }));
        dispatch(apiDeleteItem(oid));
    }

    if (inventory.isLoading)
        return (
            <div className="d-flex flex-fill centered" style={ { minHeight } }>
                <h1 className={ `display-6 text-${mode.txt} txtJasper` }>Loading...</h1>
            </div>
        );
    else
        return (
            <div className="container" style={ { minHeight } }>
                <div className="p-4">
                    <div className="d-flex justify-content-between align-items-center">
                        <h1 className={ `txtJasper display-4` }>Inventory</h1>
                        <Link to="/inventory/create">
                            <svg xmlns="http://www.w3.org/2000/svg" width={ XY } height={ XY } fill={ fill() } className="bi bi-plus-square-dotted" viewBox="0 0 16 16">
                                <path d="M2.5 0c-.166 0-.33.016-.487.048l.194.98A1.51 1.51 0 0 1 2.5 1h.458V0H2.5zm2.292 0h-.917v1h.917V0zm1.833 0h-.917v1h.917V0zm1.833 0h-.916v1h.916V0zm1.834 0h-.917v1h.917V0zm1.833 0h-.917v1h.917V0zM13.5 0h-.458v1h.458c.1 0 .199.01.293.029l.194-.981A2.51 2.51 0 0 0 13.5 0zm2.079 1.11a2.511 2.511 0 0 0-.69-.689l-.556.831c.164.11.305.251.415.415l.83-.556zM1.11.421a2.511 2.511 0 0 0-.689.69l.831.556c.11-.164.251-.305.415-.415L1.11.422zM16 2.5c0-.166-.016-.33-.048-.487l-.98.194c.018.094.028.192.028.293v.458h1V2.5zM.048 2.013A2.51 2.51 0 0 0 0 2.5v.458h1V2.5c0-.1.01-.199.029-.293l-.981-.194zM0 3.875v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zM0 5.708v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zM0 7.542v.916h1v-.916H0zm15 .916h1v-.916h-1v.916zM0 9.375v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zm-16 .916v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zm-16 .917v.458c0 .166.016.33.048.487l.98-.194A1.51 1.51 0 0 1 1 13.5v-.458H0zm16 .458v-.458h-1v.458c0 .1-.01.199-.029.293l.981.194c.032-.158.048-.32.048-.487zM.421 14.89c.183.272.417.506.69.689l.556-.831a1.51 1.51 0 0 1-.415-.415l-.83.556zm14.469.689c.272-.183.506-.417.689-.69l-.831-.556c-.11.164-.251.305-.415.415l.556.83zm-12.877.373c.158.032.32.048.487.048h.458v-1H2.5c-.1 0-.199-.01-.293-.029l-.194.981zM13.5 16c.166 0 .33-.016.487-.048l-.194-.98A1.51 1.51 0 0 1 13.5 15h-.458v1h.458zm-9.625 0h.917v-1h-.917v1zm1.833 0h.917v-1h-.917v1zm1.834-1v1h.916v-1h-.916zm1.833 1h.917v-1h-.917v1zm1.833 0h.917v-1h-.917v1zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                            </svg>
                        </Link>
                    </div>
                    <small className="text-muted">Only items in stock will appear in Menu</small>
                </div>
                <div className="shadow">
                    {/* TABLE HEADER */ }
                    <table className="table text-center lead user-select-none">
                        <thead>
                            <tr className="bgRed">
                                <td className="col-1 py-2">#</td>
                                <td className="col py-2">Name</td>
                                <td className="col-3 py-2">Price</td>
                                <td className="col-2 py-2">Qty</td>
                            </tr>
                        </thead>
                    </table>

                    {/* TABLE BODY */ }
                    <div className="overflow-auto" style={ { height: `50vh` } } >
                        <table className="table text-center table-hover lead table-striped">
                            <tbody className="user-select-none">
                                { inventory.data.map((item, key) => {
                                    if (item.quantity.$numberInt === "0")
                                        return (
                                            <tr key={ key } onClick={ () => setEditForm(item) } data-bs-toggle="modal" data-bs-target="#editPopup" className="table-danger">
                                                <td className="col-1 ">{ key + 1 }</td>
                                                <td className="col">{ item.name }</td>
                                                <td className="col-3">${ item.price.$numberInt }.00</td>
                                                <td className="col-2">x{ item.quantity.$numberInt }</td>
                                            </tr>
                                        );
                                    if (item.quantity.$numberInt < 10)
                                        return (
                                            <tr key={ key } onClick={ () => setEditForm(item) } data-bs-toggle="modal" data-bs-target="#editPopup" className="table-warning">
                                                <td className="col-1 py-2">{ key + 1 }</td>
                                                <td className="col py-2">{ item.name }</td>
                                                <td className="col-3 py-2">${ item.price.$numberInt }.00</td>
                                                <td className="col-2 py-2">x{ item.quantity.$numberInt }</td>
                                            </tr>
                                        );
                                    return (
                                        <tr key={ key } onClick={ () => setEditForm(item) } data-bs-toggle="modal" data-bs-target="#editPopup" className={ `table-${mode.bg}` }>
                                            <td className="col-1 py-2">{ key + 1 }</td>
                                            <td className="col py-2">{ item.name }</td>
                                            <td className="col-3 py-2">${ item.price.$numberInt }.00</td>
                                            <td className="col-2 py-2">x{ item.quantity.$numberInt }</td>
                                        </tr>
                                    );
                                }) }
                            </tbody>
                        </table>

                        {/* DETAILS POPUP */ }
                        <div className="modal fade" id="editPopup" tabIndex="-1">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className={ `modal-content bg-${mode.bg}` }>
                                    <div className="modal-body d-flex justify-content-between align-items-center">
                                        <span className="display-6">{ name }</span>
                                        <span className="btn btn-close bg-light" data-bs-dismiss="modal" />
                                    </div>
                                    <div className="modal-body">
                                        <FormName mode={ mode } name={ name } setName={ setName } />
                                        <FormPrice mode={ mode } price={ price } setPrice={ setPrice } />
                                        <div className="input-group mb-3">
                                            <span className="input-group-text rounded me-2">Qty</span>
                                            <button className="btn btn-outline-success rounded" onClick={ () => setQuantity((parseInt(quantity) + 1).toString()) }>+</button>
                                            <input id="formQty" type="number" className="form-control" value={ quantity } onChange={ (x) => setQuantity(x.target.value) } />
                                            <button className="btn btn-outline-danger rounded" onClick={ () => setQuantity(quantity <= 0 ? "0" : (parseInt(quantity) - 1).toString()) }>-</button>
                                        </div>
                                    </div>

                                    {/* BUTTON GROUP */ }
                                    <div className="modal-body">
                                        <div className="d-flex">
                                            <div className="col d-grid">
                                                <button className={ `btn btn-${mode.txt}` } data-bs-dismiss="modal" onClick={ () => onUpdateItem() }>Save</button>
                                            </div>
                                            <div className="col-1" />
                                            <div className="col d-grid">
                                                <button className="btn btn-danger" data-bs-dismiss="modal" onClick={ () => onDeleteItem() }>Delete</button>
                                            </div>
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