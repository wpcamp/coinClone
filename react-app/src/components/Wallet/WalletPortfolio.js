import React, { useEffect, useState } from 'react';
import { Tooltip, Legend, ResponsiveContainer, Pie, PieChart, Cell } from 'recharts';
import { useSelector, useDispatch } from 'react-redux';
import { thunkGetWallet } from '../../store/wallet';
import { thunkGetPrice2 } from '../../store/crypto';
import { PropagateLoader } from 'react-spinners';
import coins from '../Asset/coins.js'
import '../Home/Home.css'
import './Wallet.css'


export default function WalletPortfolio() {
    const sessionUser = useSelector(state => state.session.user);
    const wallets = useSelector(state => state.wallet.wallet.wallets)
    const crypto = useSelector(state => state.crypto)
    const [isLoaded, setIsLoaded] = useState(false)
    const dispatch = useDispatch()



    // console.log("heres my wallets:", crypto);

    const walletCoins = coins.map((coin) => {
        const matchingWallet = wallets?.find((wallet) => wallet?.cryptoId === coin?.id);
        if (matchingWallet) {
            return {
                coinSymbol: coin?.name,
                walletId: matchingWallet?.id,
                quantity: matchingWallet?.quantity,
            };
        }
        return null;
    });

    const walletCoinsA = walletCoins
        .filter((walletCoin) => walletCoin !== null)
        .map((walletCoin) => walletCoin.coinSymbol);

    const walletCoinsB = walletCoins
        .filter((walletCoin) => walletCoin !== null)


    const finalWallet = walletCoinsA.join("%2C");





    useEffect(() => {
        dispatch(thunkGetWallet(sessionUser.id))
        dispatch(thunkGetPrice2(finalWallet))
        setIsLoaded(true)
    }, [dispatch, sessionUser])



    const coinData = walletCoinsA.map((coinSymbol) => {
        const priceData = crypto.crypto[coinSymbol];
        const matchingWalletCoinB = walletCoinsB.find((walletCoin) => walletCoin.coinSymbol === coinSymbol);
        if (priceData && walletCoins) {
            const price = priceData.usd;
            const quantity = matchingWalletCoinB.quantity;
            const value = price * quantity;
            return {
                name: coinSymbol,
                price,
                quantity,
                value,
            };
        }
    })

    const colorList = ["#FF5733", "#3498DB", "#2ECC71", "#FF33FF", "#FFA500"];


    return (
        <>
            {isLoaded && coinData && coinData.every((coin) => coin !== undefined)?
                (
                    <div>
                        <div>
                        </div>
                        <div id='thisDiv'>
                            <ResponsiveContainer width="100%" height={400} >
                                <PieChart>
                                    <Pie
                                        data={coinData}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={80}
                                        fill="#8884d8"
                                        label={false}
                                    >
                                        {coinData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={colorList[index % colorList.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />

                                    <Legend layout="horizontal" verticalAlign="bottom" align="right" />

                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                ) : (
                    <div className='loader-container'>
                        <PropagateLoader color='#36D7B7' size={15} />
                    </div>
                )}
        </>
    )
}