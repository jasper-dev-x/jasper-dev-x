import React from 'react';
import { useSelector } from 'react-redux';

export function MenuForm({ sort, setSort, search, setSearch, sortMenu }) {
    const mode = useSelector(state => state.mode);
    
    return (
        <>
            {/* SEARCH */ }
            <input type="text" placeholder="Search" className={ `form-control bg-${mode.bg} text-${mode.txt} mb-3 border-secondary` } value={ search } onChange={ (x) => setSearch(x.target.value) } />

            {/* SORT BY DROPDOWN */ }
            <select className={ `form-select bg-${mode.bg} text-${mode.txt} mb-3 border-secondary` } value={ sort } onChange={ (x) => {
                setSort(x.target.value);
                sortMenu(x.target.value);
            } }>
                <option value="0" disabled>Sort By</option>
                <option value="1">Price Hi-Lo</option>
                <option value="2">Price Lo-Hi</option>
                <option value="3">Name A-Z</option>
                <option value="4">Name Z-A</option>
            </select>
        </>
    );
}