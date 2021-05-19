import React, { useState } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    inventory: state.inventory
});

const mapDispatchToProps = dispatch => ({

});

export function Inventory() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [tags, setTags] = useState([]);

    return (
        <div className="d-flex flex-fill flex-column align-items-center pt-2">
            <h1 className="txtJasper txtRed display-3 mb-3">Inventory</h1>
            <div>
                <div className="input-group">
                    <span className="input-group-text bgRed">Name</span>
                    <input type="text" className="form-control" value={ name } onChange={ (x) => setName(x.target.value) } />
                </div>
                <div className="input-group">
                    <span className="input-group-text">$</span>
                    <input type="number" className="form-control" value={ price } onChange={ (x) => setPrice(x.target.value) } />
                    <span className="input-group-text">.00</span>
                </div>
                <div className="input-group">
                    <span className="input-group-text">Quantity</span>
                    <button className="btn bg-success" onClick={ () => setQuantity(quantity + 1) }>+</button>
                    <input type="number" className="form-control" value={ quantity } onChange={ (x) => setQuantity(x.target.value) } disabled />
                    <button className="btn btn-danger" onClick={ () => setQuantity(quantity - 1) }>-</button>
                </div>
                <div className="input-group">
                    <span className="input-group-text">Tags</span>
                    <input type="text" className="form-control" value={ tags } disabled />
                </div>
            </div>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);