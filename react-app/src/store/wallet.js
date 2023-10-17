// Constant 

const GET_WALLET = "wallet/getWallet"
const BUY_COIN = "wallet/buyCoin"
const SELL_COIN = "wallet/sellCoin"
const CREATE_EMPTY_WALLETS = "wallet/createEmptyWallets"



// Action Creator 

const getWallet = (wallet) => {
    return {
        type: GET_WALLET,
        wallet
    }
}

const buyCoin = (wallet) => {
    return {
        type: BUY_COIN,
        wallet
    }
}

const sellCoin = (wallet) => {
    return {
        type: SELL_COIN,
        wallet
    }
}


const createEmptyWallets = (wallet) => {
    return {
        type: CREATE_EMPTY_WALLETS,
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

export const thunkBuyCoin = (coinId, quantity, fiat, method) => async (dispatch) => {
    const res = await fetch(`/api/coin/buy/${coinId}/${quantity}/${fiat}`, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ coinId, quantity, fiat })
    })

    if (res.ok) {
        const wallet = await res.json()
        // console.log("*****wallet*****", wallet);
        dispatch(buyCoin(wallet))
        return wallet
    } else {
        const errors = await res.json()
        return errors
    }
}

export const thunkSellCoin = (coinId, quantity, fiat) => async (dispatch) => {
    const res = await fetch(`/api/coin/sell/${coinId}/${quantity}/${fiat}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ coinId, quantity, fiat })
    })

    if (res.ok) {
        const wallet = await res.json()
        dispatch(sellCoin(wallet))
    } else {
        const errors = await res.json()
        return errors
    }
}

export const thunkCreateEmptyWallets = (id) => async (dispatch) => {
    // console.log("*****id*****", id);
    const res = await fetch(`/api/wallet/create/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
    })

    if (res.ok) {
        const wallet = await res.json()
        console.log("*****wallet*****", wallet);
        dispatch(createEmptyWallets([wallet]))
        return wallet
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
            // console.log("*****action.wallet*****", action.wallet);
            // console.log("*****newState*****", newState);
            return newState
        }
        case BUY_COIN: {
            return {
                ...state,
                wallet: {
                    ...state.wallet,
                    [action.wallet.id]: action.wallet,
                },
            };
        }
        case SELL_COIN: {
            return{
                ...state,
                wallet: {
                    ...state.wallet,
                    [action.wallet.id]: action.wallet
                }
            }
        }
        case CREATE_EMPTY_WALLETS: {
            return {
                ...state,
                wallet: {
                    ...state.wallet,
                    [action.wallet.id]: action.wallet 
                }
            };
        }
        default: {
            return state
        }
    }
}

export default walletReducer;