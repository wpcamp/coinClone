// Constant 

const GET_WATCHLIST = "watchlist/getWatchlist"
const CREATE_WATCHLIST = "watchlist/createWatchlist"
const REMOVE_WATCHLIST = "watchlist/removeWatchlist"
const UPDATE_WATCHLIST = "watchlist/updateWatchlist"

// Action Creator 

const getWatchlist = (watchlist) => {
    return {
        type: GET_WATCHLIST,
        watchlist
    }
}

const createWatchlist = (watchlist) => {
    return {
        type: CREATE_WATCHLIST,
        watchlist
    }
}

const removeWatchlist = (id) => {
    return {
        type: REMOVE_WATCHLIST,
        id
    }
}

const updateWatchlist = (watchlist) => {
    return {
        type: UPDATE_WATCHLIST,
        watchlist
    }
}

// Thunks

export const thunkGetWatchlist = (userId) => async (dispatch) => {
    const res = await fetch(`/api/watchlist/user/${userId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    })

    if (res.ok) {
        const watchlists = await res.json()
        dispatch(getWatchlist(watchlists))
    } else {
        const errors = await res.json()
        return errors
    }
}

export const thunkCreateWatchlist = (cryptoId) => async (dispatch) => {
    const res = await fetch(`/api/watchlist/${cryptoId}/create`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            crypto_id: cryptoId
        })
    })
    if (res.ok) {
        const newWatchlist = await res.json()
        dispatch(createWatchlist(newWatchlist))
        return newWatchlist
    } else {
        const errors = await res.json()
        return errors
    }
}

export const thunkRemoveWatchlist = (id) => async (dispatch) => {
    const res = await fetch(`/api/watchlist/${id}/delete`, {
        method: "DELETE"
    })
    if (res.ok) {
        dispatch(removeWatchlist(id))
    } else {
        const errors = await res.json()
        return errors
    }
}


export const thunkUpdateWatchlist = (userId, title) => async (dispatch) => {
    const res = await fetch(`/api/watchlist/${userId}/update`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
    })
    if (res.ok) {
        const watchlist = await res.json()
        dispatch(updateWatchlist(watchlist))
        return watchlist
    } else {
        const errors = await res.json()
        return errors
    }
}


// State 

const initialState = {
    watchlist: {}
}

const watchlistReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_WATCHLIST: {
            const newState = { ...state, watchlist: action.watchlist }
            return newState
        }
        case CREATE_WATCHLIST: {
            const newState = {
                ...state, watchlist: {
                    ...state.watchlist,
                    [action.watchlist.id]: action.watchlist
                }
            }
            return newState
        }
        case REMOVE_WATCHLIST: {
            const newState = { ...state }
            delete newState.watchlist[action.id]
            return newState
        }
        case UPDATE_WATCHLIST: {
            const newState = {
                ...state, watchlist: {
                    ...state.watchlist,
                    [action.watchlist.id]: action.watchlist
                }
            }
            return newState
        }
        default: {
            return state
        }
    }
}

export default watchlistReducer;