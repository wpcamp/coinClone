from flask import Flask, Blueprint, render_template, request, session, redirect
from requests import Session
import os
import datetime

crypto_routes = Blueprint('crypto', __name__)


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
