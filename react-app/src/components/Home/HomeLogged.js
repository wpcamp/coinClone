import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import WalletPortfolio from '../Wallet/WalletPortfolio';
import WalletBreakdown from '../Wallet/WalletBreakdown';
import SideBar from '../Sidebar/index'
import './Home.css'







export default function HomeLoggedIn() {

    return (
        <>
            <div id='homePageFullDiv'>
                <div id='homePageSideWal'>
                    <SideBar />
                </div>
                <div id='walletDivHome'>
                    <div>
                        <WalletBreakdown />
                    </div>
                    <div id='walletPortDiv'>
                        <WalletPortfolio />
                    </div>
                </div>
                <div>
                </div>
            </div>
        </>
    );
}

