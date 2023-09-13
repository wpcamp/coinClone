import React, { useEffect, useState } from 'react';
import { Tooltip, Legend, ResponsiveContainer, Pie, PieChart, Cell } from 'recharts';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton';
import { thunkGetWallet } from '../../store/wallet';
import { thunkGetPrice2 } from '../../store/crypto';
import SignupFormModal from '../SignupFormModal';
import { PropagateLoader } from 'react-spinners';
import coins from '../Asset/coins.js'
import '../Wallet/Wallet.css'
import Sidebar from '../Sidebar';
import './TopCoins.css'



export default function TopCoins() {
    const sessionUser = useSelector(state => state.session.user);
    const wallets = useSelector(state => state.wallet.wallet.wallets)
    const crypto = useSelector(state => state.crypto)
    const [isLoaded, setIsLoaded] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()


    const walletCoinsA = [
        'bitcoin', 'ethereum', 'tether',
        'pepe', 'ripple', 'usd',
        'cardano', 'dogecoin', 'solana',
        'tron', 'dai', 'polkadot',
        'matic-network', 'litecoin', 'shiba-inu',
        'wrapped-bitcoin', 'bitcoin-cash', 'avalanche-2',
        'stellar', 'chainlink', 'wbnb',
        'monero', 'binance-usd', 'uniswap',
        'okb', 'cosmos', 'ethereum-classic',
        'hedera-hashgraph', 'internet-computer', 'filecoin',
        'lido-dao', 'mantle', 'crypto-com-chain',
        'aptos', 'quant-network', 'arbitrum',
        'vechain', 'maker', 'near',
        'optimism', 'aave', 'the-graph',
        'xdce-crowd-sale', 'algorand', 'usdd',
        'blockstack', 'tezos', 'eos',
        'axie-infinity', 'elrond-erd-2', 'the-sandbox',
        'theta-token', 'havven', 'immutable-x',
        'bitcoin-cash-sv', 'injective-protocol', 'fantom',
        'decentraland', 'render-token', 'thorchain',
        'neo', 'iota', 'kava',
        'apecoin', 'pax-gold', 'dao-maker',
        'dfx-finance', 'juventus-fan-token',
        'dydx'
    ]

    const finalWallet = walletCoinsA.join("%2C");


    useEffect(() => {
        dispatch(thunkGetPrice2(finalWallet))
        setIsLoaded(true)
    }, [dispatch, sessionUser])


    function formatPrice(value) {
        const base = 1;
        if (Math.abs(value) >= base) {
            return value?.toFixed(2);
        } else {
            return value?.toFixed(8).replace(/\.?0+$/, '');
        }
    }

    function formatValuation(num) {
        if (num >= 1000000000) {
            return (num / 1000000000).toFixed(1) + 'B';
        } else if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 25000) {
            return (num / 1000).toFixed(1) + 'K';
        } else {
            return num?.toString();
        }
    }

    const coinDataArray = Object.keys(crypto.crypto).map((name) => ({
        name,
        ...crypto.crypto[name],
    }));

    return (
        <>
            {isLoaded && coinDataArray ?
                (
                    <>
                        <div id='topCoinsFullD'>
                            <div id='sideBarfullCoin'>
                                <Sidebar />
                            </div>
                            <div id='supportedCoinTable'>
                                <table className='coinTable' >
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Ticker</th>
                                            <th>Price</th>
                                            <th>24h Change</th>
                                            <th>Market Cap</th>
                                            <th>24h Volume</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {coinDataArray.map((coin) => {
                                            const coinInfo = coins.find((c) => c.name === coin.name);
                                            const ticker = coinInfo ? coinInfo.symbol.toUpperCase() : '';
                                            return (
                                                <tr key={coin?.name}>
                                                    <td className='clickToAsset' onClick={() => history.push(`/assets/${ticker}`)}>{coin?.name ? coin.name.charAt(0).toUpperCase() + coin.name.slice(1) : "N/A"}</td>
                                                    <td className='clickToAsset' onClick={() => history.push(`/assets/${ticker}`)}>{ticker}</td>
                                                    <td className='xCoinPrice clickToAsset' onClick={() => history.push(`/assets/${ticker}`)}>${formatPrice(coin?.usd)}</td>
                                                    <td className='xCoin24h clickToAsset' onClick={() => history.push(`/assets/${ticker}`)}>
                                                        {coin.usd_24h_change !== undefined
                                                            ? (coin.usd_24h_change > 0 ? "+" + coin.usd_24h_change?.toFixed(3) + "%" : coin.usd_24h_change?.toFixed(3) + "%")
                                                            : "Loading..."}
                                                    </td>
                                                    <td className='xCoinMC clickToAsset' onClick={() => history.push(`/assets/${ticker}`)}>{coin.usd_market_cap !== undefined
                                                        ? formatValuation(coin.usd_market_cap)
                                                        : "Loading..."}
                                                    </td>
                                                    <td className='xCoinVolume clickToAsset' onClick={() => history.push(`/assets/${ticker}`)}>{coin.usd_24h_vol !== undefined
                                                        ? formatValuation(coin.usd_24h_vol)
                                                        : "Loading..."}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className='loader-container'>
                        <PropagateLoader color='#36D7B7' size={15} />
                    </div>
                )}
        </>
    );
}