import React from 'react';

export default function Home({ mode }) {
    const contrast = () => (mode === 'light' ? 'dark' : 'light');

    return (
        <div className="d-flex flex-fill centerFlex">
            <h1 className={ `display-1 txtJasper text-${contrast()}` }>Welcome</h1>
        </div>
    );
}