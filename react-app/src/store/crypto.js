// Constant
const GET_PRICE = "crypto/getPrice"
const GET_PRICE2 = "crypto/getPrice"
const GET_PRICES = "crypto/getPrices"
const GET_CHART_DATA = "crypto/getChartData"

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

export const thunkGetChartData = (cryptoName, timeStart, timeEnd) => async (dispatch) => {
    const res = await fetch(`/api/coin/data/chart/${cryptoName}/${timeStart}/${timeEnd}`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
    })
    if (res.ok) {
        const data = await res.json()
        // console.log("HERE IS THE RESPONSE DATA:", data);
        dispatch(getChartData(data))
        // console.log("HERE IS THE CHART DATA IN THUNK:", data);
    } else {
        const errors = await res.json()
        return errors
    }
}




// State
const initialState = {
    crypto: {},
    chartData: {}
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
            // console.log("HERES THE action.data:", action.data);
            return { ...state, chartData: action.data};
        }
        case GET_PRICES: {
            return {...state, crypto: action.cryptoSymbols}
        }
        default: {
            return state
        }
    }
}

export default cryptoReducer;