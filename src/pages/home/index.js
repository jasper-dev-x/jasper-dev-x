import React from 'react';

export default function Home({ mode }) {

    return (
        <div className="d-flex flex-fill centerFlex">
            <h1 className={ `display-1 txtJasper text-${mode.txt}` }>Welcome</h1>
        </div>
    );
}