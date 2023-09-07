from flask import Flask, Blueprint, render_template, request, session, redirect
from requests import Session
import os

crypto_routes = Blueprint('crypto', __name__)


@crypto_routes.route('/data/<string:symbol>', methods=['GET'])
def get_coin(symbol):
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
        'rank': data["data"][symbol][0]["cmc_rank"]
        }
        return new_data
    else:
        return {'error': 'Failed to fetch data'}, 500
