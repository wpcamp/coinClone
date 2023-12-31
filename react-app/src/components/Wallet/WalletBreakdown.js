import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkCreateEmptyWallets, thunkGetWallet } from '../../store/wallet';
import { thunkGetPrice2 } from '../../store/crypto';
import { PropagateLoader } from 'react-spinners';
import coins from '../Asset/coins.js';
import '../Home/Home.css';
import './Wallet.css';
import TrendingCard from '../Trending';

export default function WalletBreakdown() {
    const sessionUser = useSelector((state) => state.session.user);
    const wallets = useSelector((state) => state.wallet.wallet.wallets);
    const crypto = useSelector((state) => state.crypto);
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch();

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

    const finalWallet = walletCoins.map((walletCoin) => walletCoin.coinSymbol).join("%2C");

    useEffect(() => {
        dispatch(thunkGetWallet(sessionUser.id));
    }, [dispatch, sessionUser]);


    useEffect(() => {
        if (finalWallet !== "") {
            dispatch(thunkGetPrice2(finalWallet))
            setIsLoaded(true)
        }
    }, [finalWallet]);



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

    const filteredCoinData = coinData.filter((coin) => coin?.value > 0.0001);

    // Calculate total balance and formatted balance
    let totalBalance = 0;
    filteredCoinData.forEach((coin) => {
        if (coin) {
            totalBalance += coin.value;
        }
    });
    const formattedBalance = totalBalance.toFixed(2);

    function formatDecimal(decimalValue, decimalPlaces) {
        // Check if decimalValue is a valid number
        if (!isNaN(decimalValue) && decimalValue !== null && decimalValue !== undefined) {
            // Use Number.toFixed to format the number with the specified decimal places
            return parseFloat(decimalValue).toFixed(decimalPlaces);
        } else {
            // Return an empty string or another default value for invalid inputs
            return '';
        }
    }
    return (
        <>
            {isLoaded && filteredCoinData && filteredCoinData.every((coin) => coin !== null) ? (
                <div id='fullWalletDiv'>
                    <div id='portfolioBalDiv'>
                        <div id='portfolioBalText'>
                            Total Portfolio Balance: ${parseFloat(formattedBalance).toLocaleString()}
                        </div>
                        <div>
                        <i className="fa-solid fa-circle-info"></i><strong>  Rate Limit Disclaimer:</strong> Please note that this website is using a free tier of crypto APIs, which are subject to rate limiting. This means that there might be limitations on the number of requests we can make. If you experience delays or temporary unavailability of certain features, we kindly ask for your patience. Thank you for understanding.
                        </div>
                    </div>

                    <div id='cryptoAndCashTables'>
                        <div id='cryptoHeadTab'>My Crypto:</div>
                        <div id='fullWalletD'>
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
                                    {/* Render cryptocurrency data */}
                                    {filteredCoinData?.map((coin) => {
                                        const portfolioAllo = (coin?.value / formattedBalance * 100) > 0.01
                                            ? (coin?.value / formattedBalance * 100).toFixed(2)
                                            : formatPrice(coin?.value / formattedBalance * 100);
                                        const matchingCrypto = Object.entries(crypto.crypto).find(([name]) => coin?.name === name);
                                        return (
                                            <tr key={coin?.symbol}>
                                                <td>{coin?.name.charAt(0).toUpperCase() + coin?.name.slice(1)}</td>
                                                <td className='xCoinBalance'>{parseFloat(formatDecimal(coin?.quantity, 2)).toLocaleString()}</td>
                                                <td className='xCoinPrice'>${formatPrice(coin?.price)}</td>
                                                <td>
                                                    ${(coin?.price * coin?.quantity) > 0.1
                                                        ? parseFloat((coin?.price * coin?.quantity).toFixed(2)).toLocaleString()
                                                        : formatPrice(coin?.price * coin?.quantity)}
                                                </td>
                                                <td className='xCoinAllocation'>
                                                    {portfolioAllo}%
                                                </td>
                                                <td className='xCoin24h'>
                                                    {matchingCrypto && matchingCrypto[1]?.usd_24h_change !== undefined
                                                        ? (matchingCrypto[1]?.usd_24h_change > 0
                                                            ? "+" + matchingCrypto[1]?.usd_24h_change?.toFixed(3) + "%"
                                                            : matchingCrypto[1]?.usd_24h_change?.toFixed(3) + "%")
                                                        : "Loading..."}
                                                </td>
                                                <td className='xCoinMC'>
                                                    {matchingCrypto && matchingCrypto[1]?.usd_market_cap !== undefined
                                                        ? formatValuation(matchingCrypto[1]?.usd_market_cap)
                                                        : "Loading..."}
                                                </td>
                                                <td className='xCoinVolume'>
                                                    {matchingCrypto && matchingCrypto[1]?.usd_24h_vol !== undefined
                                                        ? formatValuation(matchingCrypto[1]?.usd_24h_vol)
                                                        : "Loading..."}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='loader-container'>
                    <PropagateLoader color='#36D7B7' size={15} />
                </div>
            )}
        </>
    );
}
