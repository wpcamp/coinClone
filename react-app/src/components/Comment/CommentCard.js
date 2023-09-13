import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { thunkGetComments } from '../../store/comment';
import OpenModalButton from '../OpenModalButton';
import { CreateCommentModal } from './CreateCommentModal';
import { DeleteCommentModal } from './DeleteCommentModal';
import { UpdateCommentModal } from './UpdateCommentModal';
import coins from './coins';
import './Comment.css';

export default function CommentCard() {
    const dispatch = useDispatch();
    const { cryptoSymbol } = useParams();
    const comments = useSelector((state) => state.comments.comments);
    const sessionUser = useSelector((state) => state.session.user);
    const [pastComment, setPastComment] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    const match = coins.find(
        (coin) => coin.symbol.toUpperCase() === cryptoSymbol.toUpperCase()
    );
    const name = match ? match.name.toLowerCase() : null;

    useEffect(() => {
        const fetchComments = async () => {
            await dispatch(thunkGetComments(match?.id));
            setIsLoaded(true);
        };
        fetchComments();
    }, [dispatch, name]);

    const commentList = Object.values(comments)[0];
    const flatCommentId = comments?.comments?.map((obj) => obj['userId']);

    useEffect(() => {
        if (comments && sessionUser) {
            if (flatCommentId?.includes(sessionUser.id)) {
                setPastComment(true);
            } else {
                setPastComment(false);
            }
        }
    }, [comments, sessionUser]);

    const coinComments = comments?.comments;

    return (
        <>
        <div id='commentCardBackground'>
            {isLoaded && (
                <div id="fullCommentDiv">
                    <div id='commentsHeadingA'>
                        Hear what the community thinks about {cryptoSymbol.toUpperCase()}:
                    </div>
                    {!pastComment && (
                        <span className="commentModalContainer">
                            <OpenModalButton
                                buttonText="Leave a comment"
                                modalComponent={
                                    <CreateCommentModal cryptoId={match.id} />
                                }
                            />
                        </span>
                    )}
                    <div id="scrollComment">
                        {coinComments
                            ?.sort(
                                (a, b) =>
                                    new Date(b.createdAt) - new Date(a.createdAt)
                            )
                            ?.map((comment) => (
                                <div id="commentDiv" key={comment.id}>
                                    <div id="commentInfoDiv">
                                        <div id="commentTextContainer">
                                            <div id="commentDate">
                                                {comment.createdAt.slice(4, 11)}
                                            </div>
                                            <div>{comment.text}</div>
                                        </div>
                                        {comment.bullish === true ? (
                                            <div id="bullishTag"> Bullish </div>
                                        ) : (
                                            <div id="bearishTag">Bearish</div>
                                        )}
                                    </div>
                                    <div id="actionButtonsCommentDiv">
                                        {sessionUser.id === comment?.userId && (
                                            <span className="commentModalContainer">
                                                <OpenModalButton
                                                    buttonText="Delete comment"
                                                    modalComponent={
                                                        <DeleteCommentModal
                                                            commentId={comment.id}
                                                            cryptoId={match.id}
                                                        />
                                                    }
                                                />
                                            </span>
                                        )}
                                        {sessionUser.id === comment.userId && (
                                            <span className="commentModalContainer">
                                                <OpenModalButton
                                                    buttonText="Update comment"
                                                    modalComponent={
                                                        <UpdateCommentModal
                                                            comment={comment}
                                                            cryptoId={match.id}
                                                        />
                                                    }
                                                />
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            )}
        </div>
        </>
    );
}
