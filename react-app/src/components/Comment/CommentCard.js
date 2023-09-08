import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { thunkGetComments } from "../../store/comment";
import OpenModalButton from "../OpenModalButton"
import coins from './coins';




export default function CommentCard() {
    const dispatch = useDispatch()
    const { cryptoSymbol } = useParams()
    console.log("heres the crypto Id", cryptoSymbol);
    const comments = useSelector(state => state.comments.comments)
    const sessionUser = useSelector(state => state.session.user)
    const crypto = useSelector(state => state.crypto.crypto)
    const [isLoaded, setIsLoaded] = useState(false)

    const match = coins.find(coin => coin.symbol.toUpperCase() === cryptoSymbol.toUpperCase());
    const name = match ? match.name.toLowerCase() : null;
    console.log("name: ", match.id);

    useEffect(() => {
        const fetchComments = async () => {
            await dispatch(thunkGetComments(match.id))
            setIsLoaded(true)
        }
        fetchComments()
    }, [dispatch, name]);

    // const commentList = Object.values(comments.comments)
    // const commentUserIds = commentList.map(comment => comment.userId)

    console.log("here are the comments: ", comments?.comments);

    const coinComments = comments?.comments

    // console.log("here is the commentsList: ", commentList);


    return (
        <>
            {isLoaded && (
                <>
                    {coinComments.map((comment) => (
                        <div key={comment.id}>
                            <p>{comment.text}</p>
                            {comment.bullish ? <p>True</p> : <p>False</p>}
                        </div>
                    ))}
                </>
            )}
        </>
    )
}

