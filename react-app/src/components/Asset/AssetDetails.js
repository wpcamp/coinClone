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
    const data = useSelector(state => state.crypto)
    const filtered_data = data.crypto

    useEffect(() => {
        const fetchPrice = async () => {
            await dispatch(thunkGetPrice(cryptoSymbol))
        }
        fetchPrice().then(setIsLoaded(true))
    }, [dispatch])

    console.log(`filtered data of ${cryptoSymbol}`, filtered_data);

    return (
        <>
            {isLoaded && (
                <>
                    <h1>${cryptoSymbol}</h1>
                    <h3>Current Price: {filtered_data.price}</h3>
                    <h3>Market Cap: {filtered_data.market_cap}</h3>
                    <h3>Rank (by market cap): {filtered_data.rank}</h3>
                    <h3>% Change (24h): {filtered_data.percent_change_24h}</h3>
                </>
            )}
        </>
    )
}










