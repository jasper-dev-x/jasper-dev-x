import React from 'react';
import InventoryForm from './components/InventoryForm';
import InventoryList from './components/InventoryList';

export default function InventoryPage({ mode }) {
    return (
        <div className={ `d-flex flex-fill text-center text-${mode.txt}` }>
            <div className="container">
                <div className="col">
                    <InventoryList mode={ mode } />
                </div>
                <div className="col">
                    <InventoryForm mode={ mode } />
                </div>
            </div>
        </div>
    );
}

