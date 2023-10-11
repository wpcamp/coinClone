from flask import Flask, Blueprint, render_template, request, session, redirect
from requests import Session
from decimal import Decimal
from ..forms.comment_form import CommentForm
from flask_login import login_required, current_user
from ..models.db import db, Comment, Wallet
import os
import datetime

crypto_routes = Blueprint('crypto', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

# get price info from coinmarketcap api
@crypto_routes.route('/data/<string:symbol>', methods=['GET'])
def get_coin_market_details(symbol):
    api_key = os.environ.get('COINMARKETCAP_API_KEY')
    url = 'https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest'
    params = {
        'symbol': symbol,
        'convert': 'USD'
    }
    headers = {
        'X-CMC_PRO_API_KEY': api_key
    }
    session = Session()
    response = session.get(url, headers=headers, params=params)

    if (response.ok):
        data = response.json()
        new_data = {
            'market_cap': data["data"][symbol][0]["quote"]["USD"]["market_cap"],
            'price': data["data"][symbol][0]["quote"]["USD"]["price"],
            'percent_change_1h': data["data"][symbol][0]["quote"]["USD"]["percent_change_1h"],
            'percent_change_24h': data["data"][symbol][0]["quote"]["USD"]["percent_change_24h"],
            'percent_change_7d': data["data"][symbol][0]["quote"]["USD"]["percent_change_7d"],
            'percent_change_30d': data["data"][symbol][0]["quote"]["USD"]["percent_change_30d"],
            'percent_change_60d': data["data"][symbol][0]["quote"]["USD"]["percent_change_60d"],
            'percent_change_90d': data["data"][symbol][0]["quote"]["USD"]["percent_change_90d"],
            'rank': data["data"][symbol][0]["cmc_rank"],
            'created': data["data"][symbol][0]["date_added"],
            'volume_24h': data["data"][symbol][0]["quote"]["USD"]["volume_24h"],
            'date_added': data["data"][symbol][0]["date_added"],
            'last_updated': data["data"][symbol][0]["last_updated"]
        }
        return new_data
    else:
        return {'error': 'Failed to fetch data'}, 500


# Create a comment
@crypto_routes.route('/<int:id>/comments', methods=["POST"])
@login_required
def create_comment(id):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    past_comment = Comment.query.filter(
        Comment.user_id == current_user.id,
        Comment.crypto_id == id
    ).count()

    if past_comment > 0:
        return {'message': 'You can only leave one comment per coin'}, 403

    if form.validate_on_submit():
        new_comment = Comment(
            user_id=current_user.id,
            crypto_id=id,
            text=form.data["text"],
            bullish=form.data["bullish"],
            created_at=datetime.datetime.now(),
            updated_at=datetime.datetime.now()
        )
        db.session.add(new_comment)
        db.session.commit()
        return new_comment.to_dict()
    if form.errors:
        return {"errors": validation_errors_to_error_messages(form.errors)}, 404


# get all comments for a coin
@crypto_routes.route("/<int:id>/comments", methods=["GET"])
@login_required
def get_comments(id):
    comments = Comment.query.filter(Comment.crypto_id == id)
    res = {"comments": [comment.to_dict() for comment in comments]}
    return res


# # Buy Crypto:
# @crypto_routes.route('/buy/<string:id>/<string:quantity>/<string:fiat>', methods=['POST', 'PUT'])
# def buy_coin(id, quantity, fiat):
#     user = current_user
#     current_holding = Wallet.query.filter_by(user_id=user.id, crypto_id=id).first()
    
#     if current_holding:
#             # Check if the user has sufficient buying power to update the holding
#         if user.buying_power < Decimal(fiat):
#             return {'error': 'Insufficient funds'}, 500

#         user.buying_power -= Decimal(fiat)
#         quantity_decimal = Decimal(quantity)  # Convert quantity to Decimal
#         print("HERE IS THE QUANTITY HOLDING", current_holding.quantity)
#         print("TYPE OF CURRENT HOLDING QUANTITY", type(current_holding.quantity))
#         print("HERE IS THE TYPE OF QUANTITY DECIMAL", type(quantity_decimal))
#         print("HERE IS QUANTITY + QUANTITY DECIMAL", current_holding.quantity + quantity_decimal)
#         current_holding.quantity += quantity_decimal  # Use Decimal for addition
#         print("HERE IS THE CURRENT HOLDING QUANTITY", current_holding.quantity)
#         current_holding.updated_at = datetime.datetime.now()
#         db.session.commit()
#         outputcurrent = current_holding.to_dict()
#         print("currentholding to Dict", outputcurrent)
#         print("HERE IS THE CURRENT HOLDING", current_holding)
#         print("HERE IS QUANTITY DECIMAL", quantity_decimal)
#         outputcurrent['quantity'] = quantity_decimal
#         print("HERE IS THE OUTPUT CURRENT AFTER", outputcurrent)
#         return {'user': user.to_dict(), 'updated_coin': outputcurrent}
#     else:
#         return {'error': 'You do not own this cryptocurrency'}, 400

@crypto_routes.route('/buy/<string:id>/<string:quantity>/<string:fiat>', methods=['POST', 'PUT'])
def buy_coin(id, quantity, fiat):
    user = current_user
    current_holding = Wallet.query.filter_by(user_id=user.id, crypto_id=id).first()

    if current_holding:
        # Check if the user has sufficient buying power to update the holding
        fiat_decimal = Decimal(fiat)
        if user.buying_power < fiat_decimal:
            return {'error': 'Insufficient funds'}, 500

        user.buying_power -= fiat_decimal
        quantity_decimal = Decimal(quantity)  # Convert quantity to Decimal
        current_holding.quantity += quantity_decimal  # Use Decimal for addition
        current_holding.updated_at = datetime.datetime.now()
        db.session.commit()
        outputcurrent = current_holding.to_dict()
        outputcurrent['quantity'] = quantity_decimal
        return {'user': user.to_dict(), 'updated_coin': outputcurrent}
    else:
        return {'error': 'You do not own this cryptocurrency'}, 400


# Sell Crypto:
@crypto_routes.route('/sell/<string:id>/<string:quantity>/<string:fiat>', methods=['PUT'])
def sell_coin(id, quantity, fiat):
    user = current_user

    current_holding = Wallet.query.filter_by(user_id=user.id, crypto_id=id).first()

    # User wants to sell a cryptocurrency
    if current_holding:
        if current_holding.quantity < Decimal(quantity):
            return {'error': 'Insufficient quantity to sell'}, 400

        user.buying_power += Decimal(fiat)
        quantity_decimal = Decimal(quantity)  # Convert quantity to Decimal
        current_holding.quantity -= quantity_decimal  # Use Decimal for subtraction
        current_holding.updated_at = datetime.datetime.now()

        db.session.commit()
        return {'user': user.to_dict(), 'updated_coin': current_holding.to_dict() if current_holding else None}
    else:
        return {'error': 'You do not own this cryptocurrency'}, 400


# Get all coins in the database -- COINMAKRETCAP API
@crypto_routes.route('/datum/<string:ids>', methods=['GET'])
def get_coins_market_details(ids):
    api_key = os.environ.get('COINMARKETCAP_API_KEY')
    url = 'https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest'

    params = {
        'symbol': ids,
        'convert': 'USD'
    }

    headers = {
        'X-CMC_PRO_API_KEY': api_key
    }
    session = Session()
    response = session.get(url, headers=headers, params=params)

    if response.ok:
        data = response.json()
        coin_data = {}

        for symbol in data['data']:
            coin_info = data['data'][symbol][0]
            coin_data[symbol] = {
                'market_cap': coin_info['quote']['USD']['market_cap'],
                'price': coin_info['quote']['USD']['price'],
                'percent_change_1h': coin_info['quote']['USD']['percent_change_1h'],
                'percent_change_24h': coin_info['quote']['USD']['percent_change_24h'],
                'percent_change_7d': coin_info['quote']['USD']['percent_change_7d'],
                'percent_change_30d': coin_info['quote']['USD']['percent_change_30d'],
                'percent_change_60d': coin_info['quote']['USD']['percent_change_60d'],
                'percent_change_90d': coin_info['quote']['USD']['percent_change_90d'],
                'rank': coin_info['cmc_rank'],
                'created': coin_info['date_added'],
                'volume_24h': coin_info['quote']['USD']['volume_24h'],
                'date_added': coin_info['date_added'],
                'last_updated': coin_info['last_updated']
            }
        return coin_data
    else:
        return {'error': 'Failed to fetch data'}, 500



#older routes

# Get chart data from coingecko api
# @crypto_routes.route('/data/chart/<string:id>/<string:time_start>/<string:time_end>', methods=["GET"])
# def get_coin_chart_data(id, time_start, time_end):
#     url = (
#         f'https://api.coingecko.com/api/v3/coins/{id}/market_chart/range?vs_currency=USD&from={time_start}&to={time_end}&precision=full')
#     headers = {
#         'Content-Type': 'application/json'
#     }
#     session = Session()
#     response = session.get(url, headers=headers)

#     if response.ok:
#         data = response.json()
#         formatted_data = data["prices"]
#         return formatted_data
#     else:
#         return {'error': 'Failed to fetch data'}, 500


# @crypto_routes.route('/sell/<string:id>/<string:quantity>/<string:fiat>', methods=['PUT'])
# def sell_coin(id, quantity, fiat):
#     user = current_user

#     current_holding = Wallet.query.filter_by(user_id=user.id, crypto_id=id).first()

#         # User wants to sell a cryptocurrency
#     if current_holding:
#         if current_holding.quantity < Decimal(quantity):
#             return {'error': 'Insufficient quantity to sell'}, 400

#         user.buying_power += Decimal(fiat)
#         current_holding.quantity -= float(quantity)
#         current_holding.updated_at = datetime.datetime.now()

#         db.session.commit()
#         return {'user': user.to_dict(), 'updated_coin': current_holding.to_dict() if current_holding else None}
#     else:
#         return {'error': 'You do not own this cryptocurrency'}, 400


# # Buy Crypto:
# @crypto_routes.route('/buy/<string:id>/<string:quantity>/<string:fiat>', methods=['POST', 'PUT'])
# def buy_coin(id, quantity, fiat):
#     user = current_user

#     current_holding = Wallet.query.filter_by(user_id=user.id, crypto_id=id).first()

#     if request.method == 'POST':
#         # User wants to buy a new cryptocurrency
#         if not current_holding:
#             if user.buying_power < Decimal(fiat):
#                 return {'error': 'Insufficient funds'}, 500

#             user.buying_power -= Decimal(fiat)
#             new_coin = Wallet(
#                 user_id=user.id,
#                 crypto_id=id,
#                 quantity=Decimal(quantity),  # Convert quantity to Decimal
#                 created_at=datetime.datetime.now(),
#                 updated_at=datetime.datetime.now()
#             )
#             db.session.add(new_coin)
#             db.session.commit()
#             return {'user': user.to_dict(), 'new_coin': new_coin.to_dict()}
#         else:
#             return {'error': 'You already own this cryptocurrency'}, 400
#     elif request.method == 'PUT':
#         # User wants to update the quantity of an existing cryptocurrency
#         if current_holding:
#             # Check if the user has sufficient buying power to update the holding
#             if user.buying_power < Decimal(fiat):
#                 return {'error': 'Insufficient funds'}, 500

#             user.buying_power -= Decimal(fiat)
#             quantity_decimal = Decimal(quantity)  # Convert quantity to Decimal
#             current_holding.quantity += quantity_decimal  # Use Decimal for addition
#             current_holding.updated_at = datetime.datetime.now()
#             db.session.commit()
#             return {'user': user.to_dict(), 'updated_coin': current_holding.to_dict()}
#         else:
#             return {'error': 'You do not own this cryptocurrency'}, 400

#     return {'error': 'Invalid request method'}, 400
