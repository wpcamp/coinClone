// Constant 

const GET_WALLET = "wallet/getWallet"




// Action Creator 

const getWallet = (wallet) => {
    return {
        type: GET_WALLET,
        wallet
    }
}


// Thunks

export const thunkGetWallet = (userId) => async (dispatch) => {
    const res = await fetch(`/api/wallet/${userId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    })

    if (res.ok) {
        const wallet = await res.json()
        dispatch(getWallet(wallet))
    } else {
        const errors = await res.json()
        return errors
    }
}



// State 

const initialState = {
    wallet: {}
}

const walletReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_WALLET: {
            const newState = { ...state, wallet: action.wallet }
            return newState
        }
        default: {
            return state
        }
    }
}

export default walletReducer;