from flask import Blueprint, jsonify, session, request
from app.models import db
from app.models.db import User, Crypto, Wallet
from app.forms import LoginForm
from app.forms import SignUpForm
import datetime, random
from flask_login import current_user, login_user, logout_user, login_required

auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': ['Unauthorized']}


# @auth_routes.route('/login', methods=['POST'])
# def login():
#     """
#     Logs a user in
#     """
#     form = LoginForm()
#     # Get the csrf_token from the request cookie and put it into the
#     # form manually to validate_on_submit can be used
#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit():
#         # Add the user to the session, we are logged in!
#         user = User.query.filter(User.email == form.data['email']).first()
#         login_user(user)
#         return user.to_dict()
#     return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()

        # Query the Crypto model using the db object
        coins = Crypto.query.all()

        # Check if the user has wallets for all available coins
        for coin in coins:
            wallet = Wallet.query.filter_by(user_id=user.id, crypto_id=coin.id).first()
            if wallet is None:
                # Create an empty wallet for the user and the coin
                empty_wallet = Wallet(user_id=user.id, crypto_id=coin.id, quantity=0.0, created_at=datetime.datetime.now(), updated_at=datetime.datetime.now())
                db.session.add(empty_wallet)
                db.session.commit()

        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401



@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}



@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User(
            username=form.data['username'],
            email=form.data['email'],
            password=form.data['password'],
            first_name=form.data['first_name'],
            last_name=form.data["last_name"],
            buying_power=round(random.uniform(1.00, 2_500.00), 2),
            title='Watchlist #1',
            created_at=datetime.datetime.now(),
            updated_at=datetime.datetime.now()
        )
        db.session.add(user)
        db.session.commit()

        login_user(user)
        return user.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401