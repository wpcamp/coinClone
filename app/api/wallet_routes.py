from flask import Blueprint, request
from ..models.db import db, Wallet, User
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