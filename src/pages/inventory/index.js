import React from 'react';
import { connect } from 'react-redux';
import InventoryForm from './components/InventoryForm';
import InventoryList from './components/InventoryList';

export function Inventory({ inventory = [] }) {


    return (
        <div className="d-flex flex-fill flex-column align-items-center pt-2">
            <h1 className="txtJasper txtRed display-3 mb-3">Inventory</h1>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <InventoryForm />
                    </div>
                    <div className="col-md-6">
                        <InventoryList />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default connect()(Inventory);