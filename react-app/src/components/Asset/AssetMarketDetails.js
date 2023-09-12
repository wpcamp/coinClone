import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkGetPrice } from '../../store/crypto';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


export default function AssetMarketDetails() {
    const dispatch = useDispatch()
    let { cryptoSymbol } = useParams()
    cryptoSymbol = cryptoSymbol.toUpperCase()
    console.log("heres crypto symbol:", cryptoSymbol);
    const [isLoaded, setIsLoaded] = useState(false)
    const [selectedInterval, setSelectedInterval] = useState('24h');
    const data = useSelector(state => state.crypto.crypto)

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



    return (
        <>
            {isLoaded ? (
                <>
                    <div id='fullCoinInfoDiv'>

                        <div>Details:</div>
                        <div id='coinInfoDiv'>
                            <div className='coinInfoSpecs'>
                                <div>Market Cap:</div>
                                <div>{formatValuation(data.market_cap)}</div>
                            </div>
                            <div className='coinInfoSpecs'>
                                <div>Rank (by market cap): </div>
                                <div>{data.rank}</div>
                            </div>
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
                            <div className='coinInfoSpecs'>
                                <div>
                                    % Change in the last {selectedInterval}:
                                </div>
                                <div>
                                    {data[`percent_change_${selectedInterval}`]?.toFixed(2)}%
                                </div>
                            </div>
                            <div className='coinInfoSpecs'>
                                <div>
                                    Created:
                                </div>
                                <div>
                                    {data.date_added?.slice(0, 10)}
                                </div>
                            </div>
                            <div className='coinInfoSpecs'>
                                <div>
                                    Last updated:
                                </div>
                                <div>
                                    {data.last_updated?.slice(0, 10)}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <h1>Content is loading...</h1>
                </>
            )}
        </>
    );
}










