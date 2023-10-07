import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { thunkBuyCoin, thunkGetWallet, thunkSellCoin } from "../../store/wallet";
import { useParams } from "react-router-dom";
import { thunkGetUser } from "../../store/session";
import coins from '../Asset/coins.js';
import "./BuyCard.css"; // Import your CSS file here

export default function BuyCard() {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.session.user);
    const wallets = useSelector((state) => state.wallet.wallet.wallets);
    const coinTicker = useParams();
    const crypto = useSelector((state) => state.crypto);

    const [amount, setAmount] = useState(0);
    const [error, setError] = useState("");
    const [currency, setCurrency] = useState("USD"); // Default to USD for now

    useEffect(() => {
        dispatch(thunkGetWallet(user.id))
    }, [dispatch, user.id])

    const coin = coins.find((c) => c.symbol.toUpperCase() === coinTicker.cryptoSymbol.toUpperCase());
    const matchedWallet = wallets?.find((wallet) => wallet.cryptoId === coin.id);

    // function formatValuation(num) {
    //     if (num >= 1000000000) {
    //         return (num / 1000000000) + 'B'; // No rounding
    //     } else if (num >= 1000000) {
    //         return (num / 1000000) + 'M'; // No rounding
    //     } else {
    //         return num?.toString();
    //     }
    // }
    


    const handleBuy = () => {
        if (currency === "USD") {
            let fiat = +amount
            console.log("fiat", fiat);
            console.log("crypto.crypto.price", crypto.crypto.price);
            console.log("userbuyingpower", user.buyingPower);
            console.log(+fiat > user.buyingPower);
            if (amount <= 0) {
                setError("Amount must be greater than zero");
                return;
            }

            const selectedCoin = coins.find((c) => c.id === coin.id);
            if (!selectedCoin) {
                setError("Invalid coin selection");
                return;
            }

            const quantity = fiat / crypto.crypto.price;

            if (fiat > user.buyingPower) {
                setError("Insufficient buying power");
                return;
            }

            const method = matchedWallet ? 'PUT' : 'POST';
            fiat = `${fiat}`
            dispatch(thunkBuyCoin(`${selectedCoin.id}`, `${quantity}`, `${fiat}`, method)).then(() => dispatch(thunkGetWallet(user.id))).then(() => dispatch(thunkGetUser(user.id)))
        } else {

            let quantity = amount
            if (quantity <= 0) {
                setError("Amount must be greater than zero");
                return;
            }
            let method = matchedWallet ? 'PUT' : 'POST';
            let fiatFinal = quantity * crypto.crypto.price;
            dispatch(thunkBuyCoin(`${coin.id}`, `${quantity}`, `${fiatFinal}`, method)).then(() => dispatch(thunkGetWallet(user.id))).then(() => dispatch(thunkGetUser(user.id)))
        }
        setAmount(0);
        setError("");
    }


    const handleSell = () => {
        if (currency === "USD") {
            const quantity = amount / crypto.crypto.price
            if (quantity <= 0) {
                setError("Amount must be greater than zero");
                return;
            }
            dispatch(thunkSellCoin(`${coin.id}`, `${quantity}`, `${amount}`)).then(() => dispatch(thunkGetWallet(user.id))).then(() => dispatch(thunkGetUser(user.id))) 
            setAmount(0)   
        } else {
            const fiatAmount = amount
            if (fiatAmount <= 0) {
                setError("Amount must be greater than zero");
                return;
            }
            if (amount > matchedWallet.quantity) {
                setError("Insufficient quantity");
                return;
            }
            const fiatFinal = fiatAmount * crypto.crypto.price;
            dispatch(thunkSellCoin(`${coin.id}`, `${fiatAmount}`, `${fiatFinal}`)).then(() => dispatch(thunkGetWallet(user.id))).then(() => dispatch(thunkGetUser(user.id)))
        }
        setAmount(0)
    }

    return (
        <div className="buy-card">
            <div className="card-container">
                <h2>Trading</h2>
                <table className="wallet-table">
                    <thead>
                        <tr>
                            <th>Holdings</th>
                            <th>
                                Trade in:
                                <select
                                    value={currency}
                                    onChange={(e) => setCurrency(e.target.value)}
                                >
                                    <option value="USD">USD</option>
                                    <option value={coinTicker.cryptoSymbol.toUpperCase()}>
                                        {coinTicker.cryptoSymbol.toUpperCase()}
                                    </option>
                                </select>
                            </th>
                            <th>Buying Power</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{matchedWallet ? matchedWallet.quantity.toFixed(4) : 0}</td>
                            <td>
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    min="0"
                                />
                            </td>
                            <td>${user.buyingPower.toLocaleString(2)}</td>
                            <td>
                                {error && <div className="error-message">{error}</div>} {/* Display error message */}
                                <button className="buy-button" onClick={handleBuy}>
                                    Buy
                                </button>
                                <button className="sell-button" onClick={handleSell}>
                                    Sell
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
