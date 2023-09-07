import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkGetPrice } from '../../store/crypto';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


export default function AssetDetails() {
    const dispatch = useDispatch()
    //!! change this back to const if need be - weird 
    let { cryptoSymbol } = useParams()
    cryptoSymbol = cryptoSymbol.toUpperCase()
    //!!
    const [isLoaded, setIsLoaded] = useState(false)
    const [selectedInterval, setSelectedInterval] = useState('24h');
    const data = useSelector(state => state.crypto)
    const filtered_data = data.crypto

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
            await dispatch(thunkGetPrice(cryptoSymbol))
        }
        fetchPrice().then(setIsLoaded(true))
    }, [dispatch, cryptoSymbol])

    console.log(`filtered data of ${cryptoSymbol}`, filtered_data);

    return (
        <>
            {isLoaded ? (
                <>
                    <h2>${cryptoSymbol} • ${filtered_data.price?.toFixed(2)}</h2>
                    <h3>Details:</h3>
                    <div>Market Cap: {formatValuation(filtered_data.market_cap)}</div>
                    <div>Rank (by market cap): {filtered_data.rank}</div>
                    <div>
                        <select
                            id="intervalSelect"
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
                    <div>% Change in the last {selectedInterval}: {filtered_data[`percent_change_${selectedInterval}`]?.toFixed(2)}%</div>
                    <div>Created: {filtered_data.date_added?.slice(0,10)}</div>
                    <div>Last updated: {filtered_data.last_updated?.slice(0,10)}</div>
                </>
            ) : (
                <>
                    <h1>Content is loading...</h1>
                </>
            )}
        </>
    );
}










