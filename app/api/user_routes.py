from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models.db import User, db

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/<int:amount>/add-funds', methods=['PUT'])
@login_required
def add_funds(amount):
    """
    Add funds to a users buying power
    """
    user = User.query.get(current_user.id)
    user.buying_power += amount
    db.session.commit()
    return user.to_dict()