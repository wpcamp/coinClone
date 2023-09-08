import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkUpdateComment, thunkGetComments } from "../../store/comment";


function UpdateCommentModal({ cryptoId, comment }) {
    const dispatch = useDispatch();
    const [text, setText] = useState(comment?.text);
    const [bullish, setBullish] = useState(comment?.bullish);
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();
    const sessionUser = useSelector(state => state.session.user);

    // console.log("heres the cryptoID inside update:", cryptoId);

    const handleSubmit = async (e) => {
        const updatedComment = {
            id: comment?.id,
            cryptoId: cryptoId.cryptoId,
            userId: sessionUser.id,
            text: text,
            bullish: bullish,
        };
        
        e.preventDefault();
        dispatch(thunkUpdateComment(updatedComment))
        closeModal()
        dispatch(thunkGetComments(cryptoId))
    };


    return (
        <>
            <div>
                <textarea
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                ></textarea>
            </div>
            <div>
                <button
                    onClick={() => setBullish("True")}
                >
                    Bullish
                </button>
                <button
                    //!! NOT WORKING WHEN YOU SET IT TO FALSE ON UPDATE -- BACKEND ERRORS
                    onClick={() => setBullish("False")}
                >
                    Bearish
                </button>
            </div>
            <div>
                <div></div>
                <div>
                    <button
                        onClick={handleSubmit}
                        disabled={text?.length <= 9 || (bullish !== "True" && bullish !== "False")}
                    >
                        Submit Your Comment
                    </button>
                </div>
            </div>
        </>
    );
}

export { UpdateCommentModal };
