import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton';
import { PropagateLoader } from 'react-spinners';
import { thunkGetWatchlist, thunkRemoveWatchlist } from '../../store/watchlist';
import { thunkGetPrices } from '../../store/crypto';
import { UpdateWatchlistModal } from './UpdateWatchlistModal';
import coins from './coins'
import './Watchlist.css'

export default function WatchlistCard() {
    const dispatch = useDispatch();
    const watchlist = useSelector(state => state.watchlist.watchlist.watchlists ?? []);
    const sessionUser = useSelector(state => state.session.user);
    const crypto = useSelector(state => state.crypto.crypto);
    const history = useHistory()
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoaded2, setIsLoaded2] = useState(false);
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
        await dispatch(thunkRemoveWatchlist(watchlistId));
        await dispatch(thunkGetWatchlist(sessionUser.id));
    };

    useEffect(() => {
        dispatch(thunkGetWatchlist(sessionUser.id)).then(() => {
            // Check if watchlist contains any undefined values
            const hasUndefinedValues = watchlist.some(item => item === undefined);
            if (!hasUndefinedValues) {
                setIsLoaded(true);
            }
        });
    }, [dispatch, sessionUser]);

    for (let i = 0; i < coins.length; i++) {
        for (let j = 0; j < watchlist?.length; j++) {
            if (watchlist[j]?.cryptoId === coins[i]?.id) {
                const watchlistId = watchlist[j]?.id
                const coinSymbol = coins[i]?.symbol
                watchlistCoinIds[coinSymbol] = watchlistId
            }
        }
    }

    useEffect(() => {
        const output = [];
        for (let i = 0; i < coins.length; i++) {
            for (let j = 0; j < watchlist?.length; j++) {
                if (watchlist[j]?.cryptoId === coins[i]?.id) {
                    const coinSymbol = coins[i]?.symbol
                    output.push(coinSymbol);
                }
            }
        }
        setWatchlistCoins(output);
    }, [watchlist]);

    // useEffect(() => {
    //     if (watchlistCoins.length > 0) {
    //         const searchParams = watchlistCoins.join(",").toUpperCase();
    //         dispatch(thunkGetPrices(searchParams)).then(() => setIsLoaded2(true))
    //     } else {
    //         setIsLoaded2(true)
    //     }
    // }, [dispatch, watchlistCoins]);

    useEffect(() => {
        if (watchlistCoins.length > 0) {
            const searchParams = watchlistCoins.join(",").toUpperCase();
            dispatch(thunkGetPrices(searchParams))
                .then(() => {
                    // Set isLoaded2 to true when the data fetching is complete
                    setIsLoaded2(true);
                })
                .catch((error) => {
                    // Handle any errors here if needed
                    console.error('Error fetching prices:', error);
                });
        } else {
            // If watchlistCoins is empty, just set isLoaded2 to true
            setIsLoaded2(true);
        }
    }, [dispatch, watchlistCoins]);

    const cryptoArray = Object.keys(crypto).map(symbol => ({
        symbol,
        ...crypto[symbol],
    }));


    // console.log("heres watchlist", Object.keys(crypto));
    // console.log("heres crypto", crypto);
    // Display a loading indicator while the data is loading
    if (!isLoaded || !isLoaded2 || Object.keys(crypto).length > 50 || crypto.hasOwnProperty('created')) {
        return (
            <div className='loader-container' id='watchlistLoaderDiv'>
                <PropagateLoader color='#36D7B7' size={15} />
            </div>
        );
    }

    return (
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
            {watchlist.length ? (
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
                                    <td id='goToAddDiv'>
                                        <button className='watchlistButtonA' onClick={() => history.push(`/assets/${coinData.symbol}`)}>Go to asset</button>
                                        <i className="fa-solid fa-delete-left watchlistButtonB" onClick={() => handleDelete(watchlistCoinIds[coinData.symbol.toLowerCase()])}></i>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>

                </table>
            ) : (
                <div id='emptyWatchlistDivA'>
                    <div className="emptyWatchlistMessage">You aren't currently watching any coins</div>
                    <button className="checkOutAssetsMessage" onClick={() => history.push('/assets')}>Select an Asset</button>
                </div>
            )}
        </div>
    );
}

