const coins = [
    {
        "id": 1,
        "name": "bitcoin",
        "symbol": "btc"
    },
    {
        "id": 2,
        "name": "ethereum",
        "symbol": "eth"
    },
    {
        "id": 3,
        "name": "tether",
        "symbol": "usdt"
    },
    {
        "id": 4,
        "name": "pepe",
        "symbol": "pepe"
    },
    {
        "id": 5,
        "name": "ripple",
        "symbol": "xrp"
    },
    {
        "id": 6,
        "name": "usd",
        "symbol": "usd"
    },
    {
        "id": 7,
        "name": "cardano",
        "symbol": "ada"
    },
    {
        "id": 8,
        "name": "dogecoin",
        "symbol": "doge"
    },
    {
        "id": 9,
        "name": "solana",
        "symbol": "sol"
    },
    {
        "id": 10,
        "name": "tron",
        "symbol": "trx"
    },
    {
        "id": 11,
        "name": "dai",
        "symbol": "dai"
    },
    {
        "id": 12,
        "name": "polkadot",
        "symbol": "dot"
    },
    {
        "id": 13,
        "name": "matic-network",
        "symbol": "matic"
    },
    {
        "id": 14,
        "name": "litecoin",
        "symbol": "ltc"
    },
    {
        "id": 15,
        "name": "shiba-inu",
        "symbol": "shib"
    },
    {
        "id": 16,
        "name": "wrapped-bitcoin",
        "symbol": "wbtc"
    },
    {
        "id": 17,
        "name": "bitcoin-cash",
        "symbol": "bch"
    },
    {
        "id": 18,
        "name": "avalanche-2",
        "symbol": "avax"
    },
    {
        "id": 19,
        "name": "stellar",
        "symbol": "xlm"
    },
    {
        "id": 20,
        "name": "chainlink",
        "symbol": "link"
    },
    {
        "id": 21,
        "name": "wbnb",
        "symbol": "wbnb"
    },
    {
        "id": 22,
        "name": "monero",
        "symbol": "xmr"
    },
    {
        "id": 23,
        "name": "binance-usd",
        "symbol": "busd"
    },
    {
        "id": 24,
        "name": "uniswap",
        "symbol": "uni"
    },
    {
        "id": 25,
        "name": "okb",
        "symbol": "okb"
    },
    {
        "id": 26,
        "name": "cosmos",
        "symbol": "atom"
    },
    {
        "id": 27,
        "name": "ethereum-classic",
        "symbol": "etc"
    },
    {
        "id": 28,
        "name": "hedera-hashgraph",
        "symbol": "hbar"
    },
    {
        "id": 29,
        "name": "internet-computer",
        "symbol": "icp"
    },
    {
        "id": 30,
        "name": "filecoin",
        "symbol": "fil"
    },
    {
        "id": 31,
        "name": "lido-dao",
        "symbol": "ldo"
    },
    {
        "id": 32,
        "name": "mantle",
        "symbol": "mnt"
    },
    {
        "id": 33,
        "name": "crypto-com-chain",
        "symbol": "cro"
    },
    {
        "id": 34,
        "name": "aptos",
        "symbol": "apt"
    },
    {
        "id": 35,
        "name": "quant-network",
        "symbol": "qnt"
    },
    {
        "id": 36,
        "name": "arbitrum",
        "symbol": "arb"
    },
    {
        "id": 37,
        "name": "vechain",
        "symbol": "vet"
    },
    {
        "id": 38,
        "name": "maker",
        "symbol": "mkr"
    },
    {
        "id": 39,
        "name": "near",
        "symbol": "near"
    },
    {
        "id": 40,
        "name": "optimism",
        "symbol": "op"
    },
    {
        "id": 41,
        "name": "aave",
        "symbol": "aave"
    },
    {
        "id": 42,
        "name": "the-graph",
        "symbol": "grt"
    },
    {
        "id": 43,
        "name": "xdce-crowd-sale",
        "symbol": "xdc"
    },
    {
        "id": 44,
        "name": "algorand",
        "symbol": "algo"
    },
    {
        "id": 45,
        "name": "usdd",
        "symbol": "usdd"
    },
    {
        "id": 46,
        "name": "blockstack",
        "symbol": "stx"
    },
    {
        "id": 47,
        "name": "tezos",
        "symbol": "xtz"
    },
    {
        "id": 48,
        "name": "eos",
        "symbol": "eos"
    },
    {
        "id": 49,
        "name": "axie-infinity",
        "symbol": "axs"
    },
    {
        "id": 50,
        "name": "elrond-erd-2",
        "symbol": "egld"
    },
    {
        "id": 51,
        "name": "the-sandbox",
        "symbol": "sand"
    },
    {
        "id": 52,
        "name": "theta-token",
        "symbol": "theta"
    },
    {
        "id": 53,
        "name": "havven",
        "symbol": "snx"
    },
    {
        "id": 54,
        "name": "immutable-x",
        "symbol": "imx"
    },
    {
        "id": 55,
        "name": "bitcoin-cash-sv",
        "symbol": "bsv"
    },
    {
        "id": 56,
        "name": "injective-protocol",
        "symbol": "inj"
    },
    {
        "id": 57,
        "name": "fantom",
        "symbol": "ftm"
    },
    {
        "id": 58,
        "name": "decentraland",
        "symbol": "mana"
    },
    {
        "id": 59,
        "name": "render-token",
        "symbol": "rndr"
    },
    {
        "id": 60,
        "name": "thorchain",
        "symbol": "rune"
    },
    {
        "id": 61,
        "name": "neo",
        "symbol": "neo"
    },
    {
        "id": 62,
        "name": "iota",
        "symbol": "miota"
    },
    {
        "id": 63,
        "name": "kava",
        "symbol": "kava"
    },
    {
        "id": 64,
        "name": "apecoin",
        "symbol": "ape"
    },
    {
        "id": 65,
        "name": "pax-gold",
        "symbol": "paxg"
    },
    {
        "id": 66,
        "name": "dao-maker",
        "symbol": "dao"
    },
    {
        "id": 67,
        "name": "dfx-finance",
        "symbol": "dfx"
    },
    {
        "id": 68,
        "name": "pulsechain-flow",
        "symbol": "flow"
    },
    {
        "id": 69,
        "name": "juventus-fan-token",
        "symbol": "juv"
    },
    {
        "id": 70,
        "name": "dydx",
        "symbol": "dydx"
    }
]


export default coins