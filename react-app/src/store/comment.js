// Constant

const GET_COMMENTS = "comments/getComments"
const CREATE_COMMENT = "comments/createComment"
const REMOVE_COMMENT = "comments/removeComment"


// Action Creator

const getComments = (comments) => {
    return {
        type: GET_COMMENTS,
        comments
    }
}

const createComment = (comment) => {
    return {
        type: CREATE_COMMENT,
        comment
    }
}

const removeComment = (commentId) => {
    return {
        type: REMOVE_COMMENT,
        commentId
    }
}


// Thunks

export const thunkGetComments = (cryptoId) => async (dispatch) => {
    const res = await fetch(`/api/coin/${cryptoId}/comments`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    })
    if (res.ok) {
        const comments = await res.json()
        console.log("im in the thunk : ", comments)
        dispatch(getComments(comments))
    } else {
        const errors = await res.json()
        console.log("im in the errors");
        return errors
    }
}

export const thunkCreateComment = (cryptoId, comment) => async (dispatch) => {
    const res = await fetch(`/api/coin/${cryptoId}/comments`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            text: comment.text,
            bullish: comment.bullish,
        })
    })
    if (res.ok) {
        const newComment = await res.json()
        dispatch(createComment(newComment))
        return newComment
    } else {
        const errors = await res.json()
        return errors
    }
}

export const thunkRemoveComment = (commentId) => async (dispatch) => {
    const res = await fetch(`/api/comment/${commentId}/delete`, {
        method: "DELETE"
    })
    if (res.ok) {
        dispatch(removeComment(commentId))
    } else {
        const errors = await res.json()
        return errors
    }
}


// State 

const initialState = {
    comments: {}
}


// Reducer 

const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_COMMENTS: {
            //double check this works as intended
            const newState = { ...state, comments: action.comments };
            return newState
        }
        case CREATE_COMMENT: {
            const newState = {
                ...state, comments: {
                    ...state.comments,
                    [action.comment.id]: action.comment
                }
            }
            return newState
        }
        case REMOVE_COMMENT: {
            const newState = { ...state }
            delete newState.comments[action.commentId]
            return newState
        }
        default: {
            return state
        }
    }
}

export default commentsReducer;