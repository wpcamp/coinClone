import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton';
import SignupFormModal from '../SignupFormModal';
import Sidebar from '../Sidebar';
import WatchlistCard from './Watchlist';
import './Watchlist.css'

function Watchlist() {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch()
    const history = useHistory()

    return (
        <>
            <div id='fullPageDivP'>
                <div id='sideBarDivWatchlist' >
                    <Sidebar />
                </div>
                <div>
                    <WatchlistCard />
                </div>
            </div>
        </>
    );
}

export default Watchlist;