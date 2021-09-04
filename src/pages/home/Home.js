import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { apiGetAllItems } from '../../reduxPie/inventorySlice';
import { JDXLoading } from '../../components/JDXLoading';

export default function Home() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(apiGetAllItems());
    }, [dispatch]);

    return (
        <div className="d-flex flex-fill">
            <JDXLoading />
        </div>
    );
}