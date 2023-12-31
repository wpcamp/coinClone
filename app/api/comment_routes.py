from flask import Blueprint, request
from ..models.db import db, Comment
from ..forms.comment_form import CommentForm
from flask_login import login_required, current_user
import datetime

comment_routes = Blueprint("comments", __name__)


@comment_routes.route("/<int:id>/delete", methods=["DELETE"])
@login_required
def delete_comment(id):
    comment = Comment.query.get(id)
    if comment and current_user.id == comment.user_id:
        db.session.delete(comment)
        db.session.commit()
        return {"message": "success"}, 200
    else:
        return {"message": "Comment couldn't be found"}, 404


@comment_routes.route("/<int:id>/update", methods=["PUT"])
@login_required
def show_comment(id):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        item_to_update = Comment.query.get(id)
        item_to_update.text = form.data["text"]
        item_to_update.bullish = form.data["bullish"]
        item_to_update.updated_at = datetime.datetime.now()
        db.session.commit()
        res = item_to_update.to_dict()
        return res
    if form.errors:
        return { "errors": form.errors }, 400

