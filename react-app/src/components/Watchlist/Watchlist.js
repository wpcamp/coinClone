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
import { UpdateWatchlistModal } from './UpdateWatchlistModal';


function WatchlistCard() {
    const dispatch = useDispatch();
    const watchlist = useSelector(state => state.watchlist.watchlist.watchlists ?? []);
    const sessionUser = useSelector(state => state.session.user);
    const crypto = useSelector(state => state.crypto.crypto);
    const history = useHistory()
    const [isLoaded, setIsLoaded] = useState(false);
    const [watchlistCoins, setWatchlistCoins] = useState([]);


    console.log("heres the sessionUser: ", sessionUser);

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

    useEffect(() => {

        dispatch(thunkGetWatchlist(sessionUser.id));
        setIsLoaded(true);

    }, [dispatch, sessionUser]);

    const watchlistCoinIds = {}

    for (let i = 0; i < coins.length; i++) {
        for (let j = 0; j < watchlist?.length; j++) {
            if (watchlist[j]?.cryptoId === coins[i]?.id) {
                const watchlistId = watchlist[j]?.id
                // console.log("watchlistId: ", watchlistId);
                const coinSymbol = coins[i]?.symbol
                // console.log('coinsymbol:', coinSymbol);
                watchlistCoinIds[coinSymbol] = watchlistId
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
            {isLoaded ? (
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
                                                <button onClick={() => history.push(`/assets/${coinData.symbol}`)}>Go to asset</button>
                                                <button onClick={() => handleDelete(watchlistCoinIds[coinData.symbol.toLowerCase()])}>Remove from watchlist</button>
                                            </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <>
                        <div className="emptyWatchlistMessage">You aren't currently watching any coins</div>
                        <div className="checkOutAssetsMessage">Check out all assets</div>
                    </>
                )
            ) : (
                <div className="loadingMessage">Loading...</div>
            )}
        </>
    );


}

export default WatchlistCard;