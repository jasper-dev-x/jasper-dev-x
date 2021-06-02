import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import FormName from './FormName';
import FormPrice from './FormPrice';
import { deleteItem as deleteSeshItem, updateItem as updateSeshItem } from '../actions';
import { loadInventory, deleteItem as deleteDBItem, updateItem as updateDBItem } from '../thunks';

const mapStateToProps = state => ({
    inventory: state.inventory,
    isLoading: state.inventoryIsLoading
});

const mapDispatchToProps = dispatch => ({
    onSeshDeleteItem: (id) => dispatch(deleteSeshItem(id)),
    onDBDeleteItem: (id) => dispatch(deleteDBItem(id)),
    onSeshUpdateItem: (item) => dispatch(updateSeshItem(item)),
    onDBUpdateItem: (item) => dispatch(updateDBItem(item)),
    startLoadingInventory: () => dispatch(loadInventory())
});

export function InventoryList({ mode, inventory = [], onSeshDeleteItem, onDBDeleteItem, onSeshUpdateItem, onDBUpdateItem, startLoadingInventory, isLoading }) {
    const [oid, setOid] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');

    useEffect(() => {
        startLoadingInventory();
    }, [startLoadingInventory]);

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
        const item = { oid, name, price, quantity };
        onSeshUpdateItem(item);
        onDBUpdateItem(item);
    }

    function onDeleteItem() {
        onSeshDeleteItem(oid);
        onDBDeleteItem(oid);
    }

    if (isLoading)
        return (
            <div className="d-flex centerFlex" style={ { height: `88vh` } }>
                <span className={ `display-3 txtJasper text-${mode.txt}` }>Loading...</span>
            </div>
        );
    else
        return (
            <div style={ { height: `88vh` } }>
                <h1 className={ `txtJasper display-4 py-3` }>Inventory List</h1>
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
                    <div className="overflow-auto" style={ { height: `60vh` } } >
                        <table className="table text-center table-hover lead table-striped">
                            <tbody className="user-select-none">
                                { inventory.map((item, key) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(InventoryList);