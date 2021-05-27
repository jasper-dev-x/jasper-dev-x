import React, { useState } from 'react';
import { connect } from 'react-redux';
import { deleteItem, updateItem } from '../actions';

const mapStateToProps = state => ({
    inventory: state.inventory
});

const mapDispatchToProps = dispatch => ({
    onDeleteItem: (name) => dispatch(deleteItem(name)),
    onUpdateItem: (item) => dispatch(updateItem(item))
});

export function InventoryList({ inventory = [], onDeleteItem = x => x, onUpdateItem = x => x, mode }) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');

    function setEditForm(item) {
        setName(item.name);
        setPrice(item.price);
        setQuantity(item.quantity);
    }
    const contrast = () => { return mode === 'light' ? 'dark' : 'light'; };

    return (
        <div style={ { height: `88vh` } }>
            <h1 className={ `txtJasper display-4 text-${contrast()} py-3` }>Inventory List</h1>
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
                                    <td className="col-3 py-2">${ item.price }.00</td>
                                    <td className="col-2 py-2">x{ item.quantity }</td>
                                </tr>
                            )) }
                        </tbody>
                    </table>
                    <div className="modal fade" id="editPopup" tabIndex="-1">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className={ `modal-content bg-${mode} text-${contrast()}` }>
                                <div className="modal-header lead">
                                    <span>{ name }</span>
                                    <span className="btn btn-sm btn-close" data-bs-dismiss="modal" />
                                </div>
                                <div className="modal-body">
                                    <div className="my-5">
                                        <div className="col">
                                            <div className="input-group mb-3">
                                                <span className="input-group-text">Name</span>
                                                <input type="text" className="form-control" value={ name } onChange={ (x) => setName(x.target.value) } disabled />
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
                                                <span className="input-group-text">Qty</span>
                                                {/* <button className="btn btn-outline-success rounded" onClick={ () => setQuantity(quantity + 1) }>+</button> */ }
                                                <input type="number" className="form-control" value={ quantity } onChange={ (x) => setQuantity(x.target.value) } />
                                                {/* <button className="btn btn-outline-danger rounded" onClick={ () => setQuantity(quantity <= 0 ? 0 : quantity - 1) }>-</button> */ }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="d-grid flex-c">
                                            <button className={ `btn btn-${contrast()} mb-3` } data-bs-dismiss="modal" onClick={ () => onUpdateItem({ name, price, quantity }) }>Update</button>
                                            <button className="btn btn-danger" data-bs-dismiss="modal" onClick={ () => onDeleteItem(name) }>Delete Item</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(InventoryList);