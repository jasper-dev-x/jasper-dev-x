import React from 'react';
import { connect } from 'react-redux';
import InventoryForm from './components/InventoryForm';
import InventoryList from './components/InventoryList';

export function InventoryPage({ mode }) {
    const contrast = () => mode === 'light' ? 'dark' : 'light';

    return (
        <div className={ `d-flex flex-fill text-center text-${contrast()}` }>
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