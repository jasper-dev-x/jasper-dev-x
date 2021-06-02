import React from 'react';
import { connect } from 'react-redux';
import InventoryForm from './components/InventoryForm';
import InventoryList from './components/InventoryList';

export function InventoryPage({ mode }) {
    return (
        <div className={ `d-flex flex-fill text-center text-${mode.txt}` }>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <InventoryList mode={ mode } />
                    </div>
                    <div className="col-md-6">
                        <InventoryForm mode={ mode } />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default connect()(InventoryPage);