import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { deleteItem as deleteSeshItem, updateItem as updateSeshItem } from '../actions';
import { loadInventory, deleteItem as deleteDBItem, updateItem as updateDBItem } from '../thunks';

const mapStateToProps = state => ({
    inventory: state.inventory
});

const mapDispatchToProps = dispatch => ({
    onSeshDeleteItem: (id) => dispatch(deleteSeshItem(id)),
    onDBDeleteItem: (id) => dispatch(deleteDBItem(id)),
    onSeshUpdateItem: (item) => dispatch(updateSeshItem(item)),
    onDBUpdateItem: (item) => dispatch(updateDBItem(item)),
    startLoadingInventory: () => dispatch(loadInventory())
});

export function InventoryList({ mode, inventory = [], onSeshDeleteItem, onDBDeleteItem, onSeshUpdateItem, onDBUpdateItem, startLoadingInventory }) {
    const [oid, setOid] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');

    useEffect(() => {
        startLoadingInventory();
    }, [startLoadingInventory]);

    function setEditForm(item) {
        setOid(item._id.$oid);
        setName(item.name);
        setPrice(item.price.$numberInt);
        setQuantity(item.quantity.$numberInt);
    }

    function onUpdateItem(item) {
        onSeshUpdateItem(item);
        onDBUpdateItem(item);
    }

    const contrast = () => { return mode === 'light' ? 'dark' : 'light'; };

    return (
        <div style={ { height: `88vh` } }>
            <h1 className={ `txtJasper display-4 py-3` }>Inventory List</h1>
            <div className="shadow">

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
                <div className="overflow-auto" style={ { height: `60vh` } } >
                    <table className="table text-center table-hover lead user-select-none table-striped">
                        <tbody>
                            { inventory.map((item, key) => (
                                <tr key={ key } onClick={ () => setEditForm(item) } data-bs-toggle="modal" data-bs-target="#editPopup" className={ `table-${mode}` }>
                                    <td className="col-1 py-2">{ key + 1 }</td>
                                    <td className="col py-2">{ item.name }</td>
                                    <td className="col-3 py-2">${ item.price.$numberInt }.00</td>
                                    <td className="col-2 py-2">x{ item.quantity.$numberInt }</td>
                                </tr>
                            )) }
                        </tbody>
                    </table>
                    <div className="modal fade" id="editPopup" tabIndex="-1">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className={ `modal-content bg-${mode}` }>
                                <div className="modal-header lead">
                                    <span>{ name }</span>
                                    <span className="btn btn-sm btn-close bg-light" data-bs-dismiss="modal" />
                                </div>
                                <div className="modal-body">
                                    <div className="my-5">
                                        <div className="col">
                                            <div className="input-group mb-3">
                                                <span className="input-group-text">ID</span>
                                                <span type="text" className="input-group-text bg-secondary user-select-none">{ oid }</span>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="input-group mb-3">
                                                <span className="input-group-text">Name</span>
                                                <input type="text" className="form-control" value={ name } onChange={ (x) => setName(x.target.value) } />
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="input-group mb-3">
                                                <span className="input-group-text">Price</span>
                                                <span className={ `input-group-text bg-${mode} text-${contrast()}` }>$</span>
                                                <input type="number" className="form-control" value={ price } onChange={ (x) => setPrice(x.target.value) } />
                                                <span className={ `input-group-text bg-${mode} text-${contrast()}` }>.00</span>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="input-group mb-3">
                                                <span className="input-group-text rounded me-2">Qty</span>
                                                <button className="btn btn-outline-success rounded" onClick={ () => setQuantity(parseInt(quantity) + 1) }>+</button>
                                                <input type="number" className="form-control" value={ quantity } onChange={ (x) => setQuantity(x.target.value) } />
                                                <button className="btn btn-outline-danger rounded" onClick={ () => setQuantity(quantity <= 0 ? 0 : parseInt(quantity) - 1) }>-</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="d-grid flex-c">
                                            <button className={ `btn btn-${contrast()} mb-3` } data-bs-dismiss="modal" onClick={ () => onUpdateItem({ oid, name, price, quantity }) }>Save</button>
                                            <button className="btn btn-danger" data-bs-dismiss="modal" onClick={ () => {
                                                onSeshDeleteItem(oid);
                                                onDBDeleteItem(oid);
                                            } }>
                                                Delete
                                            </button>
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