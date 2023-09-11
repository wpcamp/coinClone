import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import coins from './coins' 

export default function AssetSelect() {
    const history = useHistory();
    const [selectedItem, setSelectedItem] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleItemClick = (coinName) => {
        setIsOpen(false);
        const selectedCoin = coins.find((coin) => coin.name.toLowerCase() === coinName.toLowerCase());
        if (selectedCoin) {
            setSelectedItem(selectedCoin.symbol);
            history.push(`/assets/${selectedCoin.symbol}`);
        }
    };

    

    const coinNames = [
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
        'dfx-finance', 'pulsechain-flow', 'juventus-fan-token',
        'dydx'
    ]

    return (
        <div className="dropdown">
            <button onClick={() => setIsOpen(!isOpen)}>
                {selectedItem ? selectedItem : 'Select an asset'}
            </button>
            {isOpen && (
                <ul className="dropdown-list">
                    {coinNames.map((coinName) => (
                        <li key={coinName} onClick={() => handleItemClick(coinName)}>
                            {coinName}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};


