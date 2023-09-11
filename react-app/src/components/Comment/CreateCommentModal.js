import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkCreateComment, thunkGetComments } from "../../store/comment";
import './Comment.css'


function CreateCommentModal({ cryptoId }) {
    const dispatch = useDispatch();
    const [text, setText] = useState("");
    const [bullish, setBullish] = useState(null)
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();
    const sessionUser = useSelector(state => state.session.user);


    const handleSubmit = async (e) => {
        e.preventDefault();
        let comment = {
            cryptoId: cryptoId.cryptoId,
            userId: sessionUser.id,
            text: text,
            bullish: bullish,
        }
        const data = await dispatch(thunkCreateComment(cryptoId, comment))
        if (data) {
            setErrors(data)
        } else {
            closeModal()
            dispatch(thunkGetComments(cryptoId))
        }
        closeModal()
        dispatch(thunkGetComments(cryptoId))
    };


    return (
        <>

            <div id="createCommentHeader">Leave a comment below</div>
            <div id="updateCommentTextAreaDiv">
                <textarea placeholder="Please write at least 10 characters" 
                onChange={(e) => setText(e.target.value)}
                id="updateCommentTextArea"
                ></textarea>
            </div>
                <div id="createButtons">
                    <button
                        onClick={() => setBullish(true)}
                        className={bullish ? 'isActiveG' : 'isNotActive'}
                    >Bullish</button>
                    <button
                        onClick={() => setBullish(false)}
                        className={!bullish ? 'isActiveR' : 'isNotActive'}
                    >Bearish</button>
                </div>
            <div>
                <div id="nothingDiv">
                </div>
                <div id="submitUpdateCommentButtonDiv">
                    <button onClick={handleSubmit} disabled={text?.length <= 9 || (bullish !== true && bullish !== false)}
                    id='submitUpdateCommentButton'
                    >Submit Your Comment</button>
                </div>
            </div>
        </>
    )
}


export { CreateCommentModal };

