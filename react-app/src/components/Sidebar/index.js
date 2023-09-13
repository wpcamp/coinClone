import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from "../../store/session";
import './Sidebar.css'


export default function Sidebar() {
    const history = useHistory()
    const dispatch = useDispatch()

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
    };

    return (
        <>
            <div id='sideBarDiv'>
                <button className='sideBarButtons' onClick={() => history.push('/')}><i className="fa-solid fa-house"></i> Home</button>
                <button className='sideBarButtons' onClick={() => history.push('/assets')}><i className="fa-solid fa-chart-simple"></i> All Assets</button>
                <button className='sideBarButtons' onClick={() => history.push('/watchlist')}><i className="fa-solid fa-binoculars"></i> Watchlist</button>
                <button className='sideBarButtons' onClick={() => history.push('/account')}><i className="fa-solid fa-user"></i> Account</button>
                <button className='sideBarButtons' onClick={handleLogout}><i className="fa-solid fa-right-from-bracket"></i> Sign out</button>
            </div>
        </>
    )
}