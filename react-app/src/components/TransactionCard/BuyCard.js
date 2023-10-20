import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { thunkBuyCoin, thunkCreateEmptyWallets, thunkGetWallet, thunkSellCoin } from "../../store/wallet";
import { useParams } from "react-router-dom";
import { thunkGetUser } from "../../store/session";
import swal from 'sweetalert';
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
    let matchedWallet = wallets?.find((wallet) => wallet.cryptoId === coin.id);


    // const handleBuy = async () => {
    //     if (!matchedWallet) {
    //         matchedWallet = await dispatch(thunkCreateEmptyWallets(coin.id))
    //     }
    //     if (currency === "USD") {
    //         let fiat = +amount;




    //         if (amount <= 0) {
    //             setError("Amount must be greater than zero");
    //             return;
    //         }

    //         if (amount > matchedWallet.quantity) {
    //             swal("Insufficient quantity");
    //             return;
    //         }

    //         const selectedCoin = coins.find((c) => c.id === coin.id);
    //         if (!selectedCoin) {
    //             setError("Invalid coin selection");
    //             return;
    //         }

    //         const quantity = fiat / crypto.crypto.price;

    //         if (fiat > user.buyingPower) {
    //             swal("Insufficient buying power");
    //             return;
    //         }

    //         const method = matchedWallet ? 'PUT' : 'POST';
    //         fiat = `${fiat}`
    //         dispatch(thunkBuyCoin(`${selectedCoin.id}`, `${quantity}`, `${fiat}`, method)).then(() => dispatch(thunkGetWallet(user.id))).then(() => dispatch(thunkGetUser(user.id)))

    //     } 
    //     if (currency === coinTicker.cryptoSymbol.toUpperCase()) {

    //         let quantity = amount
    //         if (quantity <= 0) {
    //             swal("Amount must be greater than zero");
    //             return;
    //         }

    //         let method = matchedWallet ? 'PUT' : 'POST';
    //         let fiatFinal = quantity * crypto.crypto.price;
    //         dispatch(thunkBuyCoin(`${coin.id}`, `${quantity}`, `${fiatFinal}`, method)).then(() => dispatch(thunkGetWallet(user.id))).then(() => dispatch(thunkGetUser(user.id)))
    //     }
    //     setAmount(0);
    //     setError("");
    // }

    const handleBuy = async () => {
        if (!matchedWallet) {
            matchedWallet = await dispatch(thunkCreateEmptyWallets(coin.id));
        }

        if (currency === "USD") {
            const fiat = +amount;

            if (fiat <= 0) {
                setError("Amount must be greater than zero");
                return;
            }

            const cryptoPrice = crypto.crypto.price;
            const userBuyingPower = user.buyingPower;
            const availableQuantity = matchedWallet.quantity;
            const selectedCoin = coins.find((c) => c.id === coin.id);

            if (!selectedCoin) {
                setError("Invalid coin selection");
                return;
            }

            const quantity = fiat / cryptoPrice;

            if (fiat > userBuyingPower) {
                swal("Insufficient buying power");
                return;
            }

            // if (quantity > availableQuantity) {
            //     swal("Insufficient quantity");
            //     return;
            // }

            const method = 'PUT'

            // Convert quantity and fiat to strings for dispatch
            const quantityStr = `${quantity}`;
            const fiatStr = `${fiat}`;

            await dispatch(thunkBuyCoin(selectedCoin.id, quantityStr, fiatStr, method));
            await dispatch(thunkGetWallet(user.id));
            await dispatch(thunkGetUser(user.id));
        }

        if (currency === coinTicker.cryptoSymbol.toUpperCase()) {
            const quantity = +amount;

            if (quantity <= 0) {
                setError("Amount must be greater than zero");
                return;
            }

            const cryptoPrice = crypto.crypto.price;
            const userBuyingPower = user.buyingPower;
            const availableQuantity = matchedWallet.quantity;
            const fiatValue = quantity * cryptoPrice;

            if (fiatValue > userBuyingPower) {
                swal("Insufficient buying power");
                return;
            }

            // if (quantity > availableQuantity) {
            //     swal("Insufficient quantity");
            //     return;
            // }

            const method = matchedWallet ? 'PUT' : 'POST';

            // Convert quantity and fiatValue to strings for dispatch
            const quantityStr = `${quantity}`;
            const fiatValueStr = `${fiatValue}`;

            await dispatch(thunkBuyCoin(coin.id, quantityStr, fiatValueStr, method));
            await dispatch(thunkGetWallet(user.id));
            await dispatch(thunkGetUser(user.id));
        }

        setAmount(0);
        setError("");
    };





    function formatDecimal(decimalValue, decimalPlaces) {
        if (!isNaN(decimalValue) && decimalValue !== null && decimalValue !== undefined) {
            let output = parseFloat(decimalValue).toFixed(decimalPlaces);
            return output
        } else {
            return '';
        }
    }

    const handleSell = () => {
        if (currency === "USD") {
            const quantity = amount / crypto.crypto.price;
            if (quantity <= 0) {
                swal("Amount must be greater than zero");
                return;
            }
            if (quantity > matchedWallet.quantity) {
                swal("Insufficient quantity");
                return;
            }
            dispatch(thunkSellCoin(`${coin.id}`, `${quantity}`, `${amount}`)).then(() => dispatch(thunkGetWallet(user.id))).then(() => dispatch(thunkGetUser(user.id)));
            setAmount(0);
        } else {
            const quantity = amount;
            if (quantity <= 0) {
                swal("Amount must be greater than zero");
                return;
            }
            if (quantity > matchedWallet.quantity) {
                swal("Insufficient quantity");
                return;
            }
            const fiatFinal = quantity * crypto.crypto.price;
            dispatch(thunkSellCoin(`${coin.id}`, `${quantity}`, `${fiatFinal}`)).then(() => dispatch(thunkGetWallet(user.id))).then(() => dispatch(thunkGetUser(user.id)));
            setAmount(0);
        }
    };


    return (
        <div className="buy-card">
            <div className="card-container">
                <h2>Trading:</h2>
                <table className="wallet-table">
                    <thead>
                        <tr>
                            <th>Holdings</th>
                            <th>Value</th>
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
                            {currency !== "USD" && <th>USD Value</th>}
                            <th>Buying Power</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{matchedWallet ? formatDecimal(matchedWallet.quantity, 4) : 0}</td>
                            <td>{matchedWallet ? ("$" + (matchedWallet?.quantity * crypto.crypto.price).toFixed(2).toLocaleString()) : "$0"}</td>
                            <td>
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    min="0"
                                />
                            </td>
                            {currency !== "USD" && (
                                <td>
                                    {"$"+formatDecimal(amount * crypto.crypto.price, 2)}
                                </td>
                            )}
                            <td>${parseFloat(user.buyingPower).toLocaleString(2)}</td>
                            <td>
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

