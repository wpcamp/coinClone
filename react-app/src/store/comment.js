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
    const res = await fetch(`LINK`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    })
    if (res.ok) {
        const comments = await res.json()
        dispatch(getComments(comments))
    } else {
        const errors = await res.json()
        return errors
    }
}

export const thunkCreateComment = (cryptoId, comment) => async (dispatch) => {

}

export const thunkRemoveComment = (commentId) => async (dispatch) => {

}


// State 

const initialState = {
    comments: {}
}


// Reducer 

const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_COMMENTS: {

        }
        case CREATE_COMMENT: {

        }
        case REMOVE_COMMENT: {

        }
        default: {
            return state
        }
    }
}

export default commentsReducer;