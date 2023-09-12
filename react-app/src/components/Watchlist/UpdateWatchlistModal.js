import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import './Watchlist.css'
import { thunkGetWatchlist, thunkUpdateWatchlist } from "../../store/watchlist";
import { authenticate } from "../../store/session";


function UpdateWatchlistModal() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory()
    const [title, setTitle] = useState(sessionUser.title);
    const { closeModal } = useModal();


    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(thunkUpdateWatchlist(sessionUser.id, title));
        await dispatch(authenticate())
        closeModal()
    };
    

    return (
        <>
            <div id="updateModalDiv">
                <div id="updateWatchlistHeader">
                    <div id="updateWatchlistHeaderB">Update your watchlist title below</div>
                    <div>Name must be at least 5 characters</div>
                </div>
                <div id="updateWatchlistTextAreaDiv">
                    <input
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        id="updateWatchlistInput"
                        placeholder="Title must be more than 4 characters"
                    ></input>
                </div>
                <div>
                    <div id="nothingDiv"></div>
                    <div id="submitUpdateWatchlistButtonDiv">
                        <button
                            onClick={handleSubmit}
                            disabled={title.length <= 4}
                            id="submitUpdateWatchlistButton"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export { UpdateWatchlistModal };
