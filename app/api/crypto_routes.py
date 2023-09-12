from flask import Flask, Blueprint, render_template, request, session, redirect
from requests import Session
from ..forms.comment_form import CommentForm
from flask_login import login_required, current_user
from ..models.db import db, Comment
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

#get price info from coinmarketcap api
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

# Get chart data from coingecko api
@crypto_routes.route('/data/chart/<string:id>/<string:time_start>/<string:time_end>', methods=["GET"])
def get_coin_chart_data(id, time_start, time_end):
    url = (f'https://api.coingecko.com/api/v3/coins/{id}/market_chart/range?vs_currency=USD&from={time_start}&to={time_end}&precision=full')
    # print("API URL HERE:", url)
    headers = {
        'Content-Type':'application/json'
    }
    session = Session()
    response = session.get(url, headers=headers)

    if response.ok:
        data = response.json()
        formatted_data = data["prices"]
        return formatted_data  
    else:
        return {'error': 'Failed to fetch data'}, 500
    
#Create a comment
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
        return {'message':'You can only leave one comment per coin'}, 403

    if form.validate_on_submit():
        new_comment = Comment(
            user_id = current_user.id,
            crypto_id = id,
            text = form.data["text"],
            bullish = form.data["bullish"],
            created_at=datetime.datetime.now(),
            updated_at=datetime.datetime.now()
        )
        db.session.add(new_comment)
        db.session.commit()
        return new_comment.to_dict()
    if form.errors:
        return {"errors": validation_errors_to_error_messages(form.errors)}, 404


#get all comments for a coin
@crypto_routes.route("/<int:id>/comments", methods=["GET"])
@login_required
def get_comments(id):
    comments = Comment.query.filter(Comment.crypto_id == id)
    res = {"comments": [comment.to_dict() for comment in comments]}
    return res



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
