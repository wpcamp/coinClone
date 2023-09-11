import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { thunkGetComments } from "../../store/comment";
import OpenModalButton from "../OpenModalButton"
import { CreateCommentModal } from "./CreateCommentModal";
import { DeleteCommentModal } from "./DeleteCommentModal";
import { UpdateCommentModal } from "./UpdateCommentModal";
import coins from './coins';
import "./Comment.css"


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
            await dispatch(thunkGetComments(match?.id))
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

    // console.log("Heres symbol:", cryptoSymbol);
    // console.log("Heres id:", match.id);
    // console.log("heres the pastcomment value:", pastComment);

    const coinComments = comments?.comments
    console.log("COIN COMMENTS: ", coinComments);


    return (
        <>
            {isLoaded && (
                <div id="fullCommentDiv">
                    <div>Hear what the community thinks about {cryptoSymbol.toUpperCase()}:</div>
                    {!pastComment && <span className="commentModalContainer">
                        <OpenModalButton
                            buttonText="Leave a comment"
                            modalComponent={<CreateCommentModal cryptoId={match.id} />} />
                    </span>}
                    <div id="scrollComment">
                        {coinComments?.map((comment) => (
                            <div id="commentDiv">
                                <div key={comment.id}>
                                    <div id="commentInfoDiv">
                                        <div id="commentTextContainer">
                                            <div id="commentDate">{comment.createdAt.slice(4, 11)}</div>
                                            <div>{comment.text}</div>
                                        </div>
                                        {comment.bullish === true ? <div id="bullishTag"> Bullish </div> : <div id="bearishTag">Bearish</div>}
                                    </div>
                                    <div>
                                        {sessionUser.id === comment?.userId && <span className="commentModalContainer">
                                            <OpenModalButton
                                                buttonText="Delete comment"
                                                modalComponent={<DeleteCommentModal commentId={comment.id} cryptoId={match.id} />} />
                                        </span>}
                                        {sessionUser.id === comment.userId && <span className="commentModalContainer">
                                            <OpenModalButton
                                                buttonText="Update comment"
                                                modalComponent={<UpdateCommentModal comment={comment} cryptoId={match.id} />} />
                                        </span>}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}

