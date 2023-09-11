import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkGetPrice } from '../../store/crypto';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


export default function AssetHeader() {
    const dispatch = useDispatch()
    let { cryptoSymbol } = useParams()
    cryptoSymbol = cryptoSymbol.toUpperCase()
    const [isLoaded, setIsLoaded] = useState(false)
    const data = useSelector(state => state.crypto.crypto)

    useEffect(() => {
        const fetchPrice = async () => {
            await dispatch(thunkGetPrice(cryptoSymbol))
        }
        fetchPrice().then(setIsLoaded(true))
    }, [dispatch, cryptoSymbol])

    return (
        <>
            {isLoaded ? (
                <>
                    <h2>${cryptoSymbol} • ${data.price?.toFixed(2)}</h2>
                </>
            ) : (
                <>
                    <h1>Content is loading...</h1>
                </>
            )}
        </>
    );
}










