import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton';
import SignupFormModal from '../SignupFormModal';
import { thunkGetWatchlist, thunkRemoveWatchlist } from '../../store/watchlist';
import { thunkGetPrice, thunkGetPrices } from '../../store/crypto';
import coins from './coins'
import AssetChartXS from '../Asset/AssetChartXS';


function WatchlistCard() {
    const dispatch = useDispatch();
    const watchlist = useSelector(state => state.watchlist.watchlist.watchlists);
    const sessionUser = useSelector(state => state.session.user);
    const crypto = useSelector(state => state.crypto.crypto);
    const [isLoaded, setIsLoaded] = useState(false);
    const [watchlistCoins, setWatchlistCoins] = useState([]);


    console.log("heres the watchlist: ", watchlist);

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

        if (Math.abs(value) >= baseVal) {
            return value.toFixed(2);
        } else {
            return value.toFixed(8).replace(/\.?0+$/, '');
        }
    }

    useEffect(() => {
        const fetchWatchlist = async () => {
            await dispatch(thunkGetWatchlist(sessionUser.id));
            setIsLoaded(true);
        };

        fetchWatchlist();
    }, [dispatch, sessionUser]);

    const watchlistCoinIds = {}

    for (let i = 0; i < coins.length; i++) {
        for (let j = 0; j < watchlist?.length; j++) {
            if (watchlist[j]?.cryptoId === coins[i]?.id) {
                const watchlistId = watchlist[j]?.id
                // console.log("watchlistId: ", watchlistId);
                const coinSymbol = coins[i]?.symbol
                // console.log('coinsymbol:', coinSymbol);
                watchlistCoinIds[coinSymbol] =  watchlistId
            }
        }
    }

    console.log("heres the important thing", watchlistCoinIds);

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

    console.log("WATCH LIST IDS", watchlistCoinIds);

    useEffect(() => {
        if (watchlistCoins.length > 0) {
            const searchParams = watchlistCoins.join(",").toUpperCase();
            const fetchPrices = async () => {
                await dispatch(thunkGetPrices(searchParams));
            };
            fetchPrices().then(() => setIsLoaded(true));
        }
    }, [dispatch, watchlistCoins]);

    // console.log("here is watchlist:", watchlist);
    // console.log("HERES THE OUTPUT", watchlistCoins.join(",").toUpperCase());
    // console.log("heres crypto,", crypto);

   

    const handleDelete = async (watchlistId) => {
        await dispatch(thunkRemoveWatchlist(watchlistId))
        await dispatch(thunkGetWatchlist(sessionUser.id))
    };


    const cryptoArray = Object.keys(crypto).map(symbol => ({
        symbol,
        ...crypto[symbol],
    }));

    console.log("heres crypto array", cryptoArray);

    return (
        <>
            <div>
                <table className="coin-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>1h Change</th>
                            <th>24h Change</th>
                            <th>7d Change</th>
                            <th>Market Cap</th>
                            <th>Volume</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cryptoArray.map((coinData) => {
                            return (
                                <>
                                    <tr key={coinData.symbol}>
                                        <td>{coinData.symbol}</td>
                                        <td id='wCoinPrice'>${formatPrice(coinData.price)}</td>
                                        <td id='wCoin1h'>
                                            {coinData.percent_change_1h > 0
                                                ? "+" + coinData.percent_change_1h.toFixed(3) + "%"
                                                : coinData.percent_change_1h.toFixed(3) + "%"}
                                        </td>
                                        <td id='wCoin24h'>{coinData.percent_change_24h > 0 ? "+" + coinData.percent_change_24h.toFixed(3) + "%" : coinData.percent_change_24h.toFixed(3) + "%"}</td>
                                        <td id='wCoin7d'>{coinData.percent_change_7d > 0 ? "+" + coinData.percent_change_7d.toFixed(3) + "%" : coinData.percent_change_7d.toFixed(3) + "%"}</td>
                                        <td id='wCoinMC'>{formatValuation(coinData.market_cap)}</td>
                                        <td id='wCoinVolume'>{formatValuation(coinData.volume_24h)}</td>
                                        <button onClick={()=> handleDelete(watchlistCoinIds[coinData.symbol.toLowerCase()])}>Remove from watchlist</button>
                                    </tr>
                                        {/* {console.log(watchlistCoinIds[coinData.symbol.toLowerCase()])} */}
                                </>

                            );
                        })}
                    </tbody>
                </table>
                {/* {cryptoArray.map((coinData) => {
                    return (
                        <AssetChartXS cryptoSymbol={coinData.symbol} />
                    )
                })} */}
            </div>
        </>
    );
}

export default WatchlistCard;
