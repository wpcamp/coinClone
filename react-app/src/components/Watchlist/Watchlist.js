import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton';
import { thunkGetWatchlist, thunkRemoveWatchlist } from '../../store/watchlist';
import { thunkGetWatchlistPrice } from '../../store/crypto';
import { UpdateWatchlistModal } from './UpdateWatchlistModal';
import coins from './coins'
import './Watchlist.css'

export default function WatchlistCard() {
    const dispatch = useDispatch();
    const watchlist = useSelector(state => state.watchlist ?? []);
    const sessionUser = useSelector(state => state.session.user);
    const crypto = useSelector(state => state.crypto.crypto);
    const watchlistPrices = useSelector(state => state.crypto.watchlistPrices);
    const history = useHistory()
    const [isLoaded, setIsLoaded] = useState(false);


    function formatPrice(value) {
        const baseVal = 1;
        if (value) {
            if (Math.abs(value) >= baseVal) {
                return value.toFixed(2);
            } else {
                return value.toFixed(8).replace(/\.?0+$/, '');
            }
        }
    }
    function formatValuation(num) {
        if (num >= 1000000000) {
            return (num / 1000000000).toFixed(1) + 'B';
        } else if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else {
            return num?.toString();
        }
    }

    useEffect(() => {
        const newWatchlistCoins = [];
        for (let i = 0; i < coins.length; i++) {
            for (let j = 0; j < watchlist?.length; j++) {
                if (watchlist[j]?.cryptoId === coins[i]?.id) {
                    const coinSymbol = coins[i]?.symbol;
                    newWatchlistCoins.push(coinSymbol);
                }
            }
        }
        let searchParams = newWatchlistCoins.join(",").toUpperCase();
        dispatch(thunkGetWatchlistPrice(searchParams))
    }, [watchlist]);
    //! added watchlist above and fixes some issue but does a lot of rerenders -- this is why rate-limiting is happening

    useEffect(() => {
        dispatch(thunkGetWatchlist(sessionUser.id));
        setIsLoaded(true);
    }, [watchlist.length]);

    const watchlistArray = Object.keys(watchlistPrices).map(symbol => ({
        symbol,
        ...(watchlistPrices[symbol] || {}),
    }));


    const handleDelete = (watchlistId) => {
        dispatch(thunkRemoveWatchlist(watchlistId))
            .then(() => {
                return dispatch(thunkGetWatchlist(sessionUser.id));
            })
    }

    if (isLoaded && watchlist.length === 0) {
        return (
            <div id='emptyWatchlistDivA'>
                <div className="emptyWatchlistMessage">You aren't currently watching any coins</div>
                <button className="checkOutAssetsMessage" onClick={() => history.push('/assets')}>Select an Asset</button>
            </div>
        )
    }
    return (
        <>
            {isLoaded && watchlistArray && (
                <div className="watchlistCardContainer">
                    <div className="watchlistHeader">
                        <div className="watchlistTitle">
                            Watchlist: {sessionUser.title}
                        </div>
                        <div id='watchlistUpdateDivM'>
                            <OpenModalButton
                                modalComponent={<UpdateWatchlistModal />}
                                buttonText={"Update watchlist title"}
                                className="watchlistUpdateButton"
                            />
                        </div>
                    </div>
                    <table className="coinTable">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>1h Change</th>
                                <th>24h Change</th>
                                <th>7d Change</th>
                                <th>Market Cap</th>
                                <th>Volume</th>
                                <th>    </th>
                            </tr>
                        </thead>
                        <tbody>
                            {watchlistArray?.map((coinData) => {

                                const matchingWatchlistItem = watchlist?.find(item =>
                                    item.cryptoId === coins.find(coin =>
                                        coin.symbol.toLowerCase() === coinData.symbol.toLowerCase()
                                    ).id)

                                return (
                                    <tr key={coinData.symbol}>
                                        <td>{coinData.symbol}</td>
                                        <td className='wCoinPrice'>${formatPrice(coinData.price)}</td>
                                        <td className='wCoin1h'>
                                            {coinData.percent_change_1h > 0
                                                ? "+" + coinData.percent_change_1h?.toFixed(3) + "%"
                                                : coinData.percent_change_1h?.toFixed(3) + "%"}
                                        </td>
                                        <td className='wCoin24h'>
                                            {coinData.percent_change_24h > 0
                                                ? "+" + coinData.percent_change_24h?.toFixed(3) + "%"
                                                : coinData.percent_change_24h?.toFixed(3) + "%"}
                                        </td>
                                        <td className='wCoin7d'>
                                            {coinData.percent_change_7d > 0
                                                ? "+" + coinData.percent_change_7d?.toFixed(3) + "%"
                                                : coinData.percent_change_7d?.toFixed(3) + "%"}
                                        </td>
                                        <td className='wCoinMC'>{formatValuation(coinData.market_cap)}</td>
                                        <td className='wCoinVolume'>{formatValuation(coinData.volume_24h)}</td>
                                        <td id='goToAddDiv'>
                                            <button className='watchlistButtonA' onClick={() => history.push(`/assets/${coinData.symbol}`)}>Go to asset</button>
                                            {/* <div id='deleteFromWatchlist'>
                                                <OpenModalButton
                                                    modalComponent={<DeleteWatchlistItemModal watchlistId={matchingWatchlistItem?.id} />}
                                                    buttonText={<i className="fa-solid fa-delete-left watchlistButtonB"></i>}
                                                    className="watchlistDeleteButton"
                                                />
                                            </div> */}
                                            <div id='deleteFromWatchlist'>
                                                <i className="fa-solid fa-delete-left watchlistButtonB" onClick={() => handleDelete(matchingWatchlistItem?.id)}></i>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>)}
        </>
    );
}


