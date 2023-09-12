import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from "../../store/session";
import Sidebar from '../Sidebar';
import './AccountDetails.css'

export default function AccountDetails() {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
    };

    return (
        <>
            <div id='fullPageDiv'>
                <div id='sideBarDivAccount' >
                    <Sidebar />
                </div>
                <div id='contentDiv'>
                    <div>
                        <p>Basic Information</p>
                        <p>Name: {user.firstName} {user.lastName}</p>
                        <p>Email: {user.email}</p>
                    </div>
                    <div>
                        <p>Wallet Info</p>
                        <p>Buying Power: ${user.buyingPower}</p>
                    </div>
                    <div>
                        <button onClick={handleLogout}>Sign Out</button>
                    </div>
                </div>
            </div>
        </>
    );
}
