import React from 'react';
import { connect } from 'react-redux';
import { deleteItem } from '../actions';

const mapStateToProps = state => ({
    inventory: state.inventory
});

const mapDispatchToProps = dispatch => ({
    onDeleteItem: (name) => dispatch(deleteItem(name))
});

export function InventoryList({ inventory = [], onDeleteItem = x => x }) {

    return (
        <div>
            <ul className="list-group">
                { inventory.map((item, key) => (
                    <li key={ key } className="list-group-item container">
                        <div className="d-flex row">
                            <div className="col d-flex centerFlex">
                                <span>{ key + 1 }: { item.name }</span>
                            </div>
                            <div className="col d-flex centerFlex">
                                <span>${ item.price }.00</span>
                            </div>
                            <div className="col d-flex centerFlex">
                                <span>({ item.quantity }x)</span>
                            </div>
                            <div className="col-1 d-flex centerFlex">
                                <button className="btn btn-close" onClick={ () => onDeleteItem(item.name) }></button>
                            </div>
                        </div>
                    </li>
                )) }
            </ul>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(InventoryList);