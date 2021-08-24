import React from 'react';
import { JDXLoading } from '../../components/JDXLoading';

export default function Home({ mode }) {

    return (
        <div className="d-flex flex-fill">
            <JDXLoading mode={ mode } />
        </div>
    );
}