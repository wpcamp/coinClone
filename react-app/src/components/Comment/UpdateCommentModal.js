import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkUpdateComment, thunkGetComments } from "../../store/comment";
import './Comment.css'


function UpdateCommentModal({ cryptoId, comment }) {
    const dispatch = useDispatch();
    const [text, setText] = useState(comment?.text);
    const [bullish, setBullish] = useState(comment?.bullish);
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();
    const sessionUser = useSelector(state => state.session.user);



    const handleSubmit = async (e) => {
        e.preventDefault();


        const updatedComment = {
            id: comment?.id,
            cryptoId: cryptoId.cryptoId,
            userId: sessionUser.id,
            text: text,
            bullish: bullish,
        };

        await dispatch(thunkUpdateComment(updatedComment))
        closeModal()
        await dispatch(thunkGetComments(cryptoId))
    };



    return (
        <>
            <div id="updateModalDiv">
                <div id="updateCommentHeader">
                    <div id="updateCommentHeaderA">Changed your mind?</div>
                    <div id="updateCommentHeaderB">Update your comment below</div>
                </div>
                <div id="updateCommentTextAreaDiv">
                    <textarea
                        onChange={(e) => setText(e.target.value)}
                        value={text}
                        id="updateCommentTextArea"
                    ></textarea>
                </div>
                <div id="updateButtons">
                    <button
                        onClick={() => setBullish(true)}
                        className={bullish ? 'isActiveG' : 'isNotActive'}
                    >
                        Bullish
                    </button>
                    <button
                        onClick={() => setBullish(false)}
                        className={!bullish ? 'isActiveR' : 'isNotActive'}
                    >
                        Bearish
                    </button>
                </div>
                <div>
                    <div id="nothingDiv"></div>
                    <div id="submitUpdateCommentButtonDiv">
                        <button
                            onClick={handleSubmit}
                            disabled={text?.length <= 9 || (bullish !== true && bullish !== false)}
                            id="submitUpdateCommentButton"
                        >
                            Submit Your Comment
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export { UpdateCommentModal };
