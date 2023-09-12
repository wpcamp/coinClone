import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkGetPrice } from '../../store/crypto';
import { thunkCreateWatchlist, thunkGetWatchlist } from '../../store/watchlist';
import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import coins from './coins'


export default function AssetHeader() {
    const dispatch = useDispatch()
    let { cryptoSymbol } = useParams()
    cryptoSymbol = cryptoSymbol.toUpperCase()
    const [isLoaded, setIsLoaded] = useState(false)
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user);
    const data = useSelector(state => state.crypto.crypto)
    const watchlist = useSelector(state => state.watchlist.watchlist.watchlists);

    function formatPrice(value) {
        const base = 1;
        if (Math.abs(value) >= base) {
            return value?.toFixed(2);
        } else {
            return value?.toFixed(8).replace(/\.?0+$/, '');
        }
    }

    console.log("inside asset header,", watchlist);




    let matchingId
    for (let i = 0; i < coins.length; i++) {
        if (coins[i].symbol == cryptoSymbol.toLowerCase()) {
            matchingId = coins[i].id;
            break;
        }
    }
    let inWatchlist = false
    if (watchlist){
        for (let i = 0; i < watchlist.length; i++) {
            if (watchlist[i].cryptoId == matchingId) {
                inWatchlist = true
    
            }
        }
    }


    console.log('YESYSYSRS id:', inWatchlist);

    useEffect(() => {
        dispatch(thunkGetPrice(cryptoSymbol))
        setIsLoaded(true)
    }, [dispatch, cryptoSymbol])

    const handleAdd = async () => {
        await dispatch(thunkCreateWatchlist(matchingId))
        await dispatch(thunkGetWatchlist(sessionUser.id))
        history.push(`/watchlist`)
    };

    return (
        <>
            {isLoaded && data ? (
                <>
                    <div>
                        <div>
                            <h2>${cryptoSymbol} • ${formatPrice(data?.price)}</h2>
                        </div>
                        <div>
                            {!inWatchlist && <button onClick={() => handleAdd()}>Add to watchlist</button>}
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div>Loading...</div>
                </>
            )}
        </>
    );
}











