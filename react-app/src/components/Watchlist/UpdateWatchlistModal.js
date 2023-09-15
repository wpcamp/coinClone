import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkUpdateWatchlist } from "../../store/watchlist";
import { authenticate } from "../../store/session";
import './UpdateWatchlist.css';

function UpdateWatchlistModal() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [title, setTitle] = useState(sessionUser.title);
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(thunkUpdateWatchlist(sessionUser.id, title));
        await dispatch(authenticate());
        closeModal();
    };

    return (
        <div className="updateWatchlistModal">
            <div className="updateWatchlistHeader">
                <div className="updateWatchlistHeaderText">Update your watchlist title below</div>
                <div className="updateWatchlistHeaderNote">Name must be at least 5 characters</div>
            </div>
            <div className="updateWatchlistInputDiv">
                <input
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    className="updateWatchlistInput"
                    placeholder="Title must be more than 4 characters"
                ></input>
            </div>
            <div className="updateWatchlistButtons">
                <div className="updateWatchlistNothingDiv"></div>
                <div className="updateWatchlistSubmitButtonDiv">
                    <button
                        onClick={handleSubmit}
                        disabled={title.length <= 4}
                        className="updateWatchlistSubmitButton"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}

export { UpdateWatchlistModal };
