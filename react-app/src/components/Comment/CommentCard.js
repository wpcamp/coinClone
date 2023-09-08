import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { thunkGetComments } from "../../store/comment";
import OpenModalButton from "../OpenModalButton"
import { CreateCommentModal } from "./CreateCommentModal";
import { DeleteCommentModal } from "./DeleteCommentModal";
import { UpdateCommentModal } from "./UpdateCommentModal";
import coins from './coins';


export default function CommentCard() {
    const dispatch = useDispatch()
    const { cryptoSymbol } = useParams()
    const comments = useSelector(state => state.comments.comments)
    const sessionUser = useSelector(state => state.session.user)
    const crypto = useSelector(state => state.crypto.crypto)
    const [pastComment, setPastComment] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)

    const match = coins.find(coin => coin.symbol.toUpperCase() === cryptoSymbol.toUpperCase());
    const name = match ? match.name.toLowerCase() : null;

    useEffect(() => {
        const fetchComments = async () => {
            await dispatch(thunkGetComments(match.id))
            setIsLoaded(true)
        }
        fetchComments()
    }, [dispatch, name]);


    const commentList = Object.values(comments)[0]
    const flatCommentId = comments?.comments?.map(obj => obj["userId"]);



    useEffect(() => {
        if (comments && sessionUser) {
            if (flatCommentId?.includes(sessionUser.id)) {
                setPastComment(true)
            } else {
                setPastComment(false)
            }
        }
    }, [comments, sessionUser])

    console.log("Heres symbol:", cryptoSymbol);
    console.log("Heres id:", match.id);
    // console.log("heres the pastcomment value:", pastComment);

    const coinComments = comments?.comments


    return (
        <>
            {isLoaded && (
                <>
                    {!pastComment && <div>
                        <OpenModalButton
                            buttonText="Leave a comment"
                            modalComponent={<CreateCommentModal cryptoId={match.id} />} />
                    </div>}
                    {coinComments.map((comment) => (
                        <div key={comment.id}>
                            <p>{comment.text}</p>
                            {comment.bullish ? <p>True</p> : <p>False</p>}
                            {sessionUser.id === comment.userId &&
                                <OpenModalButton
                                    buttonText="Delete comment"
                                    modalComponent={<DeleteCommentModal commentId={comment.id} cryptoId={match.id} />} /> 
                            }
                            {sessionUser.id === comment.userId &&
                                <OpenModalButton
                                    buttonText="Update comment"
                                    modalComponent={<UpdateCommentModal comment={comment} cryptoId={match.id} />} /> 
                            }
                        </div>
                    ))}
                </>
            )}
        </>
    )
}

