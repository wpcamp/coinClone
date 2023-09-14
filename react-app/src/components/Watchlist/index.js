import React from 'react';
import Sidebar from '../Sidebar';
import WatchlistCard from './Watchlist';
import './Watchlist.css'

function Watchlist() {

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