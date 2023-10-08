from flask import Blueprint, request
from ..models.db import db, Wallet, User, Crypto
from flask_login import login_required, current_user
import datetime


wallet_routes = Blueprint("wallets", __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


# get all wallets for a user
@wallet_routes.route("/<int:id>", methods=["GET"])
@login_required
def get_wallets(id):
    if current_user.id != id:
        return {"message": "You can only view your own wallet"}
    wallets = Wallet.query.filter(Wallet.user_id == id)
    res = {"wallets": [wallet.to_dict() for wallet in wallets]}
    return res

# create empty wallets

@wallet_routes.route('/create', methods=["GET"])
def create_empty_wallets():
    coins = Crypto.query.all()
    user = current_user
    # Check if the user has wallets for all available coins
    for coin in coins:
        wallet = Wallet.query.filter_by(
            user_id=user.id, crypto_id=coin.id).first()
        if wallet is None:
            # Create an empty wallet for the user and the coin
            empty_wallet = Wallet(user_id=user.id, crypto_id=coin.id, quantity=0.0,
                                  created_at=datetime.datetime.now(), updated_at=datetime.datetime.now())
            db.session.add(empty_wallet)
            db.session.commit()

    # Return a success response with an appropriate status code
    return {"message":"Empty wallets created successfully"}, 200

