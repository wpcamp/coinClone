import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkGetWallet } from '../../store/wallet';
import { thunkGetPrice2 } from '../../store/crypto';
import { PropagateLoader } from 'react-spinners';
import coins from '../Asset/coins.js';
import '../Home/Home.css';
import './Wallet.css';

export default function WalletBreakdown() {
    const sessionUser = useSelector((state) => state.session.user);
    const wallets = useSelector((state) => state.wallet.wallet.wallets);
    const crypto = useSelector((state) => state.crypto);
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch();

    // console.log("heres my wallets:", crypto);

    const walletCoins = coins
        .map((coin) => {
            const matchingWallet = wallets?.find((wallet) => wallet?.cryptoId === coin?.id);
            if (matchingWallet) {
                return {
                    coinSymbol: coin?.name,
                    walletId: matchingWallet?.id,
                    quantity: matchingWallet?.quantity,
                };
            }
            return null;
        })
        .filter((walletCoin) => walletCoin !== null); 

    // console.log("HERES THE WALLET COINS: ", walletCoins);

    const finalWallet = walletCoins.map((walletCoin) => walletCoin.coinSymbol).join("%2C");

    useEffect(() => {
        const fetchData = async () => {
            // console.log('Fetching data...');
            await dispatch(thunkGetWallet(sessionUser.id));

            await dispatch(thunkGetPrice2(finalWallet));

            // setIsLoaded(true); 
        };

        fetchData()
        setIsLoaded(true)
    }, [dispatch, sessionUser, finalWallet]);

    const coinData = walletCoins.map((walletCoin) => {
        const priceData = crypto.crypto[walletCoin.coinSymbol];
        if (priceData && walletCoins) {
            const price = priceData.usd;
            const quantity = walletCoin.quantity;
            const value = price * quantity;
            return {
                name: walletCoin.coinSymbol,
                price,
                quantity,
                value,
            };
        }
        return null;
    });


    const colorList = ["#FF5733", "#3498DB", "#2ECC71", "#FF33FF", "#FFA500"];

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
        } else {
            return num?.toString();
        }
    }

    let totalBalance = 0;
    coinData.map((coin) => {
        totalBalance += coin?.value;
    });
    const formattedBalance = totalBalance.toFixed(2);
    console.log('heres coinData', coinData);

    return (
        <>
            {isLoaded && coinData && coinData.every((coin) => coin !== null) ? (
                <>
                    <div id='portfolioBalDiv'>
                        <div id='portfolioBalText'>Total Portfolio Balance: ${parseFloat(formattedBalance).toLocaleString()}</div>
                        <div></div>
                    </div>
                    <div id='cryptoHeadTab'>
                        My Crypto:
                    </div>
                    <div>
                        <table className='coinTable'>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Total Balance</th>
                                    <th>Unit Price</th>
                                    <th>Value</th>
                                    <th>Portfolio Allocation</th>
                                    <th>24h Change</th>
                                    <th>Market Cap</th>
                                    <th>24h Volume</th>
                                </tr>
                            </thead>
                            <tbody>
                                {coinData?.map((coin) => {
                                    const matchingCrypto = Object.entries(crypto.crypto).find(([name]) => coin?.name === name);
                                    // console.log("HERES MATCHING COINS", matchingCrypto);
                                    return (
                                        <tr key={coin?.symbol}>
                                            <td>{coin?.name.charAt(0).toUpperCase() + coin?.name.slice(1)}</td>
                                            <td className='xCoinBalance'> {coin?.quantity}</td>
                                            <td className='xCoinPrice'>${formatPrice(coin?.price)}</td>
                                            <td>${(coin?.price * coin?.quantity) > 0.1 ? parseFloat((coin?.price * coin?.quantity).toFixed(2)).toLocaleString() : formatPrice(coin?.price * coin?.quantity)}</td>
                                            <td className='xCoinAllocation'>{(coin?.value / formattedBalance * 100) > 0.01 ? (coin?.value / formattedBalance * 100).toFixed(2) : formatPrice(coin?.value / formattedBalance * 100)}%</td>
                                            <td className='xCoin24h'>
                                                {matchingCrypto && matchingCrypto[1]?.usd_24h_change !== undefined
                                                    ? (matchingCrypto[1]?.usd_24h_change > 0 ? "+" + matchingCrypto[1]?.usd_24h_change?.toFixed(3) + "%" : matchingCrypto[1]?.usd_24h_change?.toFixed(3) + "%")
                                                    : "Loading..."}
                                            </td>
                                            <td className='xCoinMC'>{matchingCrypto && matchingCrypto[1]?.usd_market_cap !== undefined
                                                ? formatValuation(matchingCrypto[1]?.usd_market_cap)
                                                : "Loading..."}
                                            </td>
                                            <td className='xCoinVolume'>{matchingCrypto && matchingCrypto[1]?.usd_24h_vol !== undefined
                                                ? formatValuation(matchingCrypto[1]?.usd_24h_vol)
                                                : "Loading..."}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div id='buyingPowerFull'>
                        <div id='buyingPowerHead'>
                        My Cash:
                        </div>
                        <table className='coinTable' id='buyingPowerTable'>
                            <thead>
                                <th>Name</th>
                                <th>Balance</th>
                            </thead>
                            <tbody>
                                <td>
                                    USDC
                                </td>
                                <td>
                                ${sessionUser.buyingPower}
                                </td>
                            </tbody>
                        </table>
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
