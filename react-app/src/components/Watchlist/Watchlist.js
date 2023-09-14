import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton';
import { PropagateLoader } from 'react-spinners';
import { thunkGetWatchlist, thunkRemoveWatchlist } from '../../store/watchlist';
import { thunkGetPrices } from '../../store/crypto';
import { UpdateWatchlistModal } from './UpdateWatchlistModal';
import coins from './coins'


function WatchlistCard() {
    const dispatch = useDispatch();
    const watchlist = useSelector(state => state.watchlist.watchlist.watchlists ?? []);
    const sessionUser = useSelector(state => state.session.user);
    const crypto = useSelector(state => state.crypto.crypto);
    const history = useHistory()
    const [isLoaded, setIsLoaded] = useState(false);
    const [watchlistCoins, setWatchlistCoins] = useState([]);
    const watchlistCoinIds = {}


    function formatValuation(num) {
        if (num >= 1000000000) {
            return (num / 1000000000).toFixed(1) + 'B';
        } else if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else {
            return num?.toString();
        }
    }
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

    const handleDelete = async (watchlistId) => {
        await dispatch(thunkRemoveWatchlist(watchlistId))
        await dispatch(thunkGetWatchlist(sessionUser.id))
    };



    useEffect(() => {
        dispatch(thunkGetWatchlist(sessionUser.id));
    }, [dispatch, sessionUser]);

    useEffect(() => {
        const coinSymbolToWatchlistId = {};
        const watchlistCoinsArray = [];

        if (coins && watchlist) {
            for (let i = 0; i < coins.length; i++) {
                for (let j = 0; j < watchlist.length; j++) {
                    if (watchlist[j]?.cryptoId === coins[i]?.id) {
                        const watchlistId = watchlist[j]?.id;
                        const coinSymbol = coins[i]?.symbol;
                        coinSymbolToWatchlistId[coinSymbol] = watchlistId;
                        watchlistCoinsArray.push(coinSymbol);
                    }
                }
            }
        }
        setWatchlistCoins(watchlistCoinsArray);

        if (watchlistCoinsArray.length > 0) {
            const searchParams = watchlistCoinsArray.join(",").toUpperCase();
            dispatch(thunkGetPrices(searchParams));
            setIsLoaded(true);
        }
    }, [dispatch, coins, watchlist]);

    const cryptoArray = Object.keys(crypto).map(symbol => ({
        symbol,
        ...crypto[symbol],
    }));

    console.log("heres cryptoArray", cryptoArray);

    return (
        <>
            {isLoaded && cryptoArray.length < 30 && cryptoArray.every(coinData => coinData !== undefined)? (
                watchlist.length ? (
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
                                {cryptoArray?.map((coinData) => {
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
                                            <td>
                                                <button className='watchlistButtonA' onClick={() => history.push(`/assets/${coinData.symbol}`)}>Go to asset</button>
                                                <button className='watchlistButtonB' onClick={() => handleDelete(watchlistCoinIds[coinData.symbol.toLowerCase()])}>Remove from watchlist</button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <>
                        <div id='emptyWatchlistDivA'>
                            <div className="emptyWatchlistMessage">You aren't currently watching any coins</div>
                            <button className="checkOutAssetsMessage" onClick={() => history.push('/assets')}>Check out all assets</button>
                        </div>
                    </>
                )
            ) : (
                <div className='loader-container'>
                    <PropagateLoader color='#36D7B7' size={15} />
                </div>
            )}
        </>
    );
}

export default WatchlistCard;