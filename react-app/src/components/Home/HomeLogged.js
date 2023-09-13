import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton';
import SignupFormModal from '../SignupFormModal';
import WalletPortfolio from '../Wallet/WalletPortfolio';
import WalletBreakdown from '../Wallet/WalletBreakdown';
import SideBar from '../Sidebar/index'
import './Home.css'
import TopCoins from '../AllAssets/TopCoins';






export default function HomeLoggedIn() {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch()
    const history = useHistory()




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

