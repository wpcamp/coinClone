// Constant
const GET_PRICE = "crypto/getPrice"
const GET_PRICE2 = "crypto/getPrice"
const GET_PRICES = "crypto/getPrices"
const GET_CHART_DATA = "crypto/getChartData"
const GET_TRENDING = "crypto/getTrending"

// Action Creator 
const getPrice = (cryptoSymbol) => {
    return {
        type: GET_PRICE,
        cryptoSymbol
    }
}

const getPrice2 = (cryptoSymbol) => {
    return {
        type: GET_PRICE,
        cryptoSymbol
    }
}

const getPrices = (cryptoSymbols) => {
    return {
        type: GET_PRICES,
        cryptoSymbols
    }
}

const getChartData = (data) => {
    return {
        type: GET_CHART_DATA,
        data
    }
}

const getTrending = (data) => {
    return {
        type: GET_TRENDING,
        data
    }
}

// Thunks

export const thunkGetPrices = (cryptoSymbols) => async (dispatch) => {
    const res = await fetch(`/api/coin/datum/${cryptoSymbols}`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(getPrices(data))
    } else {
        const errors = await res.json()
        return errors
    }
}

export const thunkGetPrice = (cryptoSymbol) => async (dispatch) => {
    const res = await fetch(`/api/coin/data/${cryptoSymbol}`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(getPrice(data))
    } else {
        const errors = await res.json()
        return errors
    }
}

export const thunkGetPrice2 = (cryptoSymbol) => async (dispatch) => {
    const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${cryptoSymbol}&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&precision=18`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(getPrice2(data))
    } else {
        const errors = await res.json()
        return errors
    }
}

export const thunkGetTrending = () => async (dispatch) => {
    const res = await fetch(`https://api.coingecko.com/api/v3/search/trending`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(getTrending(data))
    } else {
        const errors = await res.json()
        return errors
    }
}


export const thunkGetChartData = (cryptoName, timeStart, timeEnd) => async (dispatch) => {
    const url = `https://api.coingecko.com/api/v3/coins/${cryptoName}/market_chart/range?vs_currency=USD&from=${timeStart}&to=${timeEnd}&precision=full`;
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(getChartData(data));

    } else {
        const error = await res.json();
        return error
    }
};


// State
const initialState = {
    crypto: {},
    chartData: {},
    trending: {}
}


// Reducer
const cryptoReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRICE: {
            return { ...state, crypto: action.cryptoSymbol }
        }
        case GET_PRICE2: {
            return { ...state, crypto: action.cryptoSymbol }
        }
        case GET_CHART_DATA: {
            return { ...state, chartData: action.data };
        }
        case GET_PRICES: {
            return { ...state, crypto: action.cryptoSymbols }
        }
        case GET_TRENDING: {
            return { ...state, trending: action.data }
        }
        default: {
            return state
        }
    }
}

export default cryptoReducer;