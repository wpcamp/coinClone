import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import coins from '../Asset/coins'
import './Searchbar.css'



export default function Searchbar() {
    const [ticker, setTicker] = useState("")
    const history = useHistory()

    const handleSearch = () => {
        const isCoinSupported = coins.some((coin) => coin.symbol == ticker.toLowerCase());
        if (isCoinSupported) {
            history.push(`/assets/${ticker}`)
            setTicker("")
        } else {
            window.alert("This coin is not supported on this platform, please refer to the all assets page to see a complete list of options.")
        }
    }

    return (
        <>
            <div id='searchBarFull'>
                <div id="searchInputDiv">
                    <input
                        type="text"
                        placeholder="Enter coin ticker (e.g. BTC)"
                        value={ticker}
                        onChange={(e) => setTicker(e.target.value)}
                    />
                    <div id="submitSearchButton">
                        <button onClick={handleSearch}>
                            <div><i class="fa-solid fa-magnifying-glass"></i></div>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}