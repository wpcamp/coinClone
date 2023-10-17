import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import { thunkRemoveWatchlist, thunkGetWatchlist } from "../../store/watchlist";
import './DeleteWatchlistItemModal.css'

function DeleteWatchlistItemModal({ watchlistId }) {
    const dispatch = useDispatch();
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user);
    const { closeModal } = useModal();

    const keepReview = () => {
        closeModal()
    }

    const deleteWatchlistItem = async (watchlistId) => {
        dispatch(thunkRemoveWatchlist(watchlistId))
        dispatch(thunkGetWatchlist(sessionUser.id))
        closeModal()
    };


    return (
        <>
            <div id='deleteModal'>
                <div className="deleteModalHeader">Confirm Delete</div>
                <div className="deleteModalSecondaryText">
                    <a id='deleteModalSecondaryText'>Are you sure you want to remove this from your watchlist?</a>
                </div>
                <div id="yesNoButtons">
                    <button type="submit" id='deleteModalYesButton' onClick={() => {
                        deleteWatchlistItem(watchlistId)
                    }}>Remove from watchlist</button>
                    <button type="submit" id='deleteModalNoButton' onClick={keepReview}>Cancel</button>
                </div>
            </div>
        </>
    );
}


export { DeleteWatchlistItemModal };