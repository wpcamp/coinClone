import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { thunkGetPrice } from '../../store/crypto';
import './AssetMarketDetails.css';

export default function AssetMarketDetails() {
    const dispatch = useDispatch();
    let { cryptoSymbol } = useParams();
    cryptoSymbol = cryptoSymbol.toUpperCase();
    const [isLoaded, setIsLoaded] = useState(false);
    const [selectedInterval, setSelectedInterval] = useState('24h');
    const data = useSelector(state => state.crypto.crypto);

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
        const fetchPrice = async () => {
            await dispatch(thunkGetPrice(cryptoSymbol));
        };
        fetchPrice().then(() => setIsLoaded(true));
    }, [dispatch, cryptoSymbol]);

    return (
        <div className="assetDetailsContainer">
            {isLoaded ? (
                <>
                    <div className="detailsHeading">Details:</div>
                    <div className="coinInfo">
                        <div className="coinInfoSpec">
                            <div className="specLabel">Market Cap:</div>
                            <div className="specValue">{formatValuation(data.market_cap)}</div>
                        </div>
                        <div className="coinInfoSpec">
                            <div className="specLabel">Rank (by market cap):</div>
                            <div className="specValue">{data.rank}</div>
                        </div>
                        <div className="coinInfoSpec">
                            <div className="specLabel">% Change in the last {selectedInterval}:</div>
                            <div className="specValue">
                                {data[`percent_change_${selectedInterval}`]?.toFixed(2)}%
                            </div>
                        </div>
                        <div className="intervalSelect">
                            <label htmlFor="intervalSelect">Interval:</label>
                            <select
                                id="intervalSelect"
                                value={selectedInterval}
                                onChange={(e) => setSelectedInterval(e.target.value)}
                            >
                                <option value="1h">1h</option>
                                <option value="24h">24h</option>
                                <option value="7d">7d</option>
                                <option value="30d">30d</option>
                                <option value="60d">60d</option>
                                <option value="90d">90d</option>
                            </select>
                        </div>
                        <div className="coinInfoSpec">
                            <div className="specLabel">Created:</div>
                            <div className="specValue">{data.date_added?.slice(0, 10)}</div>
                        </div>
                        <div className="coinInfoSpec">
                            <div className="specLabel">Last updated:</div>
                            <div className="specValue">{data.last_updated?.slice(0, 10)}</div>
                        </div>
                    </div>
                </>
            ) : (
                <h1 className="loadingMessage">Content is loading...</h1>
            )}
        </div>
    );
}
