import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkRemoveComment, thunkGetComments } from "../../store/comment";
import './Comment.css'


function DeleteCommentModal({ commentId, cryptoId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const sessionUser = useSelector(state => state.session.user);


    const handleKeep = async (e) => {
        e.preventDefault()
        closeModal()
    }

    const handleDelete = async (e, commentId) => {
        e.preventDefault();
        dispatch(thunkRemoveComment(commentId))
        closeModal()
        dispatch(thunkGetComments(cryptoId))
    };


    return (
        <>
            <div>
                <div>
                    <p id="deleteHeaderA">Are you sure you want to delete your comment?</p>
                </div>
                <div id="deleteButtonDiv">
                    <button id='submitUpdateCommentButton' onClick={(e) => { handleDelete(e, commentId).then(dispatch(thunkGetComments(cryptoId))) }}>Yes, delete my comment</button>
                    <button id='submitUpdateCommentButton' onClick={handleKeep} >No, keep my comment</button>
                </div>
            </div>
        </>
    )
}


export { DeleteCommentModal };

