// Constant
const GET_PRICE = "crypto/getPrice"

// Action Creator 
const getPrice = (cryptoSymbol) => {
    return {
        type: GET_PRICE,
        cryptoSymbol
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




// State
const initialState = {
    crypto: {
    }
}


// Reducer
const cryptoReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRICE: {
            return { ...state, crypto: action.cryptoSymbol }
        }
        default: {
            return state
        }
    }
}

export default cryptoReducer;