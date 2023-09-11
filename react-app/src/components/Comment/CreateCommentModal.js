import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkCreateComment, thunkGetComments } from "../../store/comment";
import { useParams } from "react-router-dom";
import coins from './coins';


function CreateCommentModal({cryptoId}) {
    const dispatch = useDispatch();
    const [text, setText] = useState("");
    const [bullish, setBullish] = useState(null)
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();
    const sessionUser = useSelector(state => state.session.user);

    // console.log('HERES CRYPTO ID', cryptoId);

    // console.log("heres session user: ", sessionUser.id);

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


            <div>
                <textarea placeholder="Please write at least 10 characters" onChange={(e) => setText(e.target.value)}></textarea>
            </div>
            <div>
                <button onClick={() => setBullish(true)}>Bullish</button>
                <button onClick={() => setBullish(false)}>Bearish</button>
            </div>

            <div>
                <div >

                </div>
                <div>
                    <button onClick={handleSubmit} disabled={text?.length <= 9 || (bullish !== true && bullish !== false)}
                    >Submit Your Comment</button>
                </div>
            </div>

        </>
    )
}


export { CreateCommentModal };

