// Constant
const GET_PRICE = "crypto/getPrice"
const GET_CHART_DATA = "crypto/getChartData"

// Action Creator 
const getPrice = (cryptoSymbol) => {
    return {
        type: GET_PRICE,
        cryptoSymbol
    }
}

const getChartData = (data) => {
    return {
        type: GET_CHART_DATA,
        data
    }
}


// Thunks

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
        case GET_CHART_DATA: {
            // console.log("HERES THE action.data:", action.data);
            return { ...state, chartData: action.data};
        }
        default: {
            return state
        }
    }
}

export default cryptoReducer;