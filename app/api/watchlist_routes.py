from flask import Blueprint, request
from ..models.db import db, Watchlist, User
from ..forms.watchlist_title_form import WatchlistTitleForm
from ..forms.watchlist_form import WatchlistForm
from flask_login import login_required, current_user
import datetime


watchlist_routes = Blueprint("watchlists", __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

## create a watchlist
@watchlist_routes.route('/<int:id>/create', methods=["POST"])
@login_required
def add_to_watchlist(id):
    form = WatchlistForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    user_watchlist = Watchlist.query.filter(
        Watchlist.user_id == current_user.id,
        Watchlist.crypto_id == id
    ).count()

    if user_watchlist > 0:
        return {'message': 'This coin is already in your watchlist'}

    if form.validate_on_submit():
        new_watchlist = Watchlist(
            user_id = current_user.id,
            crypto_id = id,
            created_at = datetime.datetime.now(),
            updated_at = datetime.datetime.now()
        )
        db.session.add(new_watchlist)
        db.session.commit()
        return new_watchlist.to_dict()
    if form.errors:
        return {"errors": validation_errors_to_error_messages(form.errors)}, 404



## update watchlist name
@watchlist_routes.route('/<int:id>/update', methods=["PUT"])
@login_required
def update_watchlist_title(id):
    form = WatchlistTitleForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        item_to_update = User.query.get(id)
        item_to_update.title = form.data["title"]
        item_to_update.updated_at = datetime.datetime.now()
        db.session.commit()
        res = item_to_update.to_dict()
        return res
    if form.errors:
        return {"errors": form.errors}, 400
    

## Delete a watchlist
@watchlist_routes.route("/<int:id>/delete", methods=["DELETE"])
@login_required
def delete_watchlist(id):
    watchlist = Watchlist.query.get(id)
    if watchlist and current_user.id == watchlist.user_id:
        db.session.delete(watchlist)
        db.session.commit()
        return {"message": "success"}, 200
    else:
        return {"message": "Comment couldn't be found"}, 404
    

#get all coins on watchlist for a user
@watchlist_routes.route("/user/<int:id>", methods=["GET"])
@login_required
def get_comments(id):
    if current_user.id != id:
        return {"message": "You can only view your own watchlist"}
    watchlists = Watchlist.query.filter(Watchlist.user_id == id)
    res = {"watchlists": [watchlist.to_dict() for watchlist in watchlists]}
    return res