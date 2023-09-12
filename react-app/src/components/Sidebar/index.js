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
            <button className='sideBarButtons' onClick={()=> history.push('/home')}>Home</button>
            <button className='sideBarButtons'>My assets</button>
            <button className='sideBarButtons' onClick={()=> history.push('/watchlist')}>My watchlist</button>
            <button className='sideBarButtons' onClick={()=> history.push('/account')}>My account</button>
            <button className='sideBarButtons' onClick={handleLogout}>Sign out</button>
        </div>
        </>
    )
}