import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkGetChartData } from '../../store/crypto';
import { useParams } from 'react-router-dom';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { PropagateLoader } from 'react-spinners';
import { thunkCreateWatchlist, thunkGetWatchlist } from '../../store/watchlist';
import { thunkGetPrice } from '../../store/crypto';
import { useHistory } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import AssetSelect from './AssetSelect';
import coins from './coins';
import "./Asset.css";

export default function AssetChart() {
    const dispatch = useDispatch();
    const data = useSelector(state => state.crypto.chartData);
    const sessionUser = useSelector(state => state.session.user);
    const watchlist = useSelector(state => state.watchlist);
    const history = useHistory()
    const chartData = data.prices;
    const coin = useSelector(state => state.crypto.crypto);

    const { cryptoSymbol } = useParams();

    // useEffect(() => {
    //     dispatch(thunkGetPrice(cryptoSymbol));
    //     setIsLoaded(true);
    // }, [dispatch, cryptoSymbol]);
    //!! SEEMS TO WORK WITHOUT THIS USEEFFECT. MAYBE DELETE?


    function formatPrice(value) {
        const base = 1;
        if (Math.abs(value) >= base) {
            return value?.toFixed(2);
        } else {
            return value?.toFixed(8).replace(/\.?0+$/, '');
        }
    }

    const handleAdd = async () => {
        await dispatch(thunkCreateWatchlist(matchingId));
        await dispatch(thunkGetWatchlist(sessionUser.id));
        history.push(`/watchlist`);
    };

    const match = coins.find(coin => coin.symbol.toUpperCase() === cryptoSymbol.toUpperCase());
    const name = match ? match.name.toLowerCase() : null;

    const [startTime, setStartTime] = useState(Math.floor(Date.now() / 1000) - 86400);
    const [endTime, setEndTime] = useState(Math.floor(Date.now() / 1000));
    const [selectedInterval, setSelectedInterval] = useState('24h');
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        function calcStartTime(selectedInterval) {
            switch (selectedInterval) {
                case '1h':
                    setStartTime(endTime - 3600);
                    break;
                case '24h':
                    setStartTime(endTime - 86400);
                    break;
                case '7d':
                    setStartTime(endTime - 604800);
                    break;
                case '30d':
                    setStartTime(endTime - 2592000);
                    break;
                case '60d':
                    setStartTime(endTime - 5184000);
                    break;
                case '90d':
                    setStartTime(endTime - 7776000);
                    break;
                default:
                    break;
            }
        }
        calcStartTime(selectedInterval);
    }, [selectedInterval, endTime]);

    useEffect(() => {
        const fetchChartData = async () => {
            await dispatch(thunkGetChartData(name, startTime, endTime));
            setIsLoaded(true);
        };
        fetchChartData();
    }, [dispatch, name, selectedInterval, startTime, endTime]);

    const finalData = [];
    for (let i = 0; i < chartData?.length; i++) {
        const [time, value] = chartData[i];
        finalData.push({
            time: new Date(time).toLocaleString(),
            value,
        });
    }

    const min = Math.min(...finalData.map(dataPoint => dataPoint.value));
    const max = Math.max(...finalData.map(dataPoint => dataPoint.value));

    let matchingId;
    for (let i = 0; i < coins.length; i++) {
        if (coins[i].symbol == cryptoSymbol.toLowerCase()) {
            matchingId = coins[i].id;
            break;
        }
    }

    let inWatchlist = false;
    if (Array.isArray(watchlist)) { // Check if watchlist is an array
        for (let i = 0; i < watchlist.length; i++) {
            if (watchlist[i].cryptoId === matchingId) {
                inWatchlist = true;
                break;
            }
        }
    }

    return (
        <>
            {isLoaded ? (
                <div>
                    <div id='selectAddButtonDiv'>
                        <div id='coinAndWatchlist'>
                            <h2>${cryptoSymbol} • ${formatPrice(coin?.price)}</h2>
                            {!inWatchlist && <button id='addToWatchlistButton' onClick={() => handleAdd()}>Add to watchlist</button>}
                        </div>
                    </div>
                    <div id='intervalSelectDiv'>
                        <select
                            value={selectedInterval}
                            onChange={(e) => setSelectedInterval(e.target.value)}>
                            <option value="1h">1h</option>
                            <option value="24h">24h</option>
                            <option value="7d">7d</option>
                            <option value="30d">30d</option>
                            <option value="60d">60d</option>
                            <option value="90d">90d</option>
                        </select>
                    </div>
                    <ResponsiveContainer height={600} width={"100%"}>
                        <LineChart data={finalData} margin={{ top: 5, right: 20, bottom: 5, left: 20 }}>
                            <Line type="monotone" dataKey="value" stroke="#82ca9d" dot={false} />
                            <CartesianGrid strokeDasharray="1 1" />
                            <XAxis dataKey="time" />
                            <YAxis domain={[min, max]} label={{ value: 'Price', angle: 0, position: 'insideLeft' }} tickFormatter={(value) => value.toFixed(2)} />
                            <Tooltip />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            ) : (
                <div>
                    <h5>This is likely a sympton of rate-limiting from free-tier APIs. I apologize for the inconvience. Please wait approxiamtely 1 minute and refresh.</h5>
                    <h5>If you would like to help increase the functionality of this website feel free to send any ETH Chain tokens to the following address:</h5>
                    <h5>willcampbell.eth</h5>
                    <div className='loader-container'>
                        <PropagateLoader color='#36D7B7' size={15} />
                    </div>

                </div>
            )}
        </>
    );
}

