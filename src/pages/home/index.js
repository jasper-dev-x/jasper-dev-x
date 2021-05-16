import React from 'react';

export default function Home({ mode }) {
    const textMode = () => { return mode === 'light' ? 'dark' : 'light'; };

    return (
        <div className="d-flex flex-fill centerFlex">
            <h1 className={ `display-1 txtJasper text-${textMode()}` }>Jasper.Dev.x</h1>
        </div>
    );
}