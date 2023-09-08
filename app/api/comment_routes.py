from flask import Blueprint
from ..models.db import db, Comment
from flask_login import login_required, current_user

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
