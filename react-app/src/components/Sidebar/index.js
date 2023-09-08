import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from "../../store/session";


export default function Sidebar() {
    const history = useHistory()

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
      };

    return (
        <>
            <button onClick={()=> history.push('/home')}>Home</button>
            <button>My assets</button>
            <button>My watchlist</button>
            <button>My account</button>
            <button onClick={handleLogout}>Sign out</button>
        </>
    )
}