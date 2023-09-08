import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkRemoveComment, thunkGetComments } from "../../store/comment";
import { useParams } from "react-router-dom";
import coins from './coins';


function DeleteCommentModal({ commentId, cryptoId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const sessionUser = useSelector(state => state.session.user);


    const handleKeep = async (e) => {
        e.preventDefault()
        closeModal()
    }

    console.log("heres cryptoId inside delete", cryptoId);

    const handleDelete = async (e, commentId) => {
        e.preventDefault();
        dispatch(thunkRemoveComment(commentId))
        closeModal()
        dispatch(thunkGetComments(cryptoId))
    };


    return (
        <>
            <div>
                <span>Are you sure you want to delete your comment?</span>
                <button onClick={(e) => { handleDelete(e, commentId).then(dispatch(thunkGetComments(cryptoId))) }}>Yes, delete my comment</button>
                <button onClick={handleKeep} >No, keep my comment</button>
            </div>
        </>
    )
}


export { DeleteCommentModal };

