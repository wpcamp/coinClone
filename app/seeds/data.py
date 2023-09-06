import datetime

users = [
    {
        "id": 1,
        "username": "demolition",
        "password": "password",
        "email": "user@demo.io",
        "first_name": "Demo",
        "last_name": "Lition",
        "buying_power": 10000000,
        "title": "Demo Watchlist",
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    },
    {
        "id": 2,
        "username": "johndoe",
        "password": "password",
        "email": "john@gmail.com",
        "first_name": "John",
        "last_name": "Doe",
        "buying_power": 50000,
        "title": "My Watchlist",
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    },
    {
        "id": 3,
        "username": "glendong",
        "password": "password123",
        "email": "glendon@yahoo.com",
        "first_name": "Zack",
        "last_name": "Glendon",
        "buying_power": 9999999,
        "title": "Speculative Watchlist",
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    },
    {
        "id": 4,
        "username": "harrykane",
        "password": "secret1",
        "email": "harry@spurs.com",
        "first_name": "Harry",
        "last_name": "Kane",
        "buying_power": 1000000,
        "title": "Winners",
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    },
    {
        "id": 5,
        "username": "wpcamp",
        "password": "password",
        "email": "will@gmail.com",
        "first_name": "Will",
        "last_name": "Campbell",
        "buying_power": 99999999,
        "title": "Notable",
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    }
]

comments = [
    {
        'id': 1,
        'user_id': 1,
        'crypto_id': 1,
        'text': "Community support is strong, bullish on this one.",
        'bullish': True,
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    },
    {
        'id': 2,
        'user_id': 2,
        'crypto_id': 4,
        'text': "I believe this could be the next big thing in crypto.",
        'bullish': True,
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    },
    {
        'id': 3,
        'user_id': 3,
        'crypto_id': 3,
        'text': "Price has been volatile, but I'm holding strong.",
        'bullish': True,
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    },
    {
        'id': 4,
        'user_id': 4,
        'crypto_id': 4,
        'text': "Seems like it'll be a rug. Sell!",
        'bullish': False,
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    },
    {
        'id': 5,
        'user_id': 5,
        'crypto_id': 3,
        'text': "Unclear roadmap and anon devs doesn't exactly instill confidence.",
        'bullish': False,
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    },
    {
        'id': 6,
        'user_id': 1,
        'crypto_id': 2,
        'text': "10/10 project, love it. ",
        'bullish': True,
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    },
    {
        'id': 7,
        'user_id': 2,
        'crypto_id': 1,
        'text': "Time to accumulate.",
        'bullish': True,
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    }
]


wallets = [
    {
        'user_id': 1,
        'crypto_id': 1,
        'quantity': 500,
        'created_at': datetime.datetime.now(),
        'updated_at': datetime.datetime.now()
    },
    {
        'user_id': 1,
        'crypto_id': 2,
        'quantity': 250,
        'created_at': datetime.datetime.now(),
        'updated_at': datetime.datetime.now()
    },
    {
        'user_id': 1,
        'crypto_id': 3,
        'quantity': 70,
        'created_at': datetime.datetime.now(),
        'updated_at': datetime.datetime.now()
    },
    {
        'user_id': 1,
        'crypto_id': 4,
        'quantity': 1000,
        'created_at': datetime.datetime.now(),
        'updated_at': datetime.datetime.now()
    },
    {
        'user_id': 1,
        'crypto_id': 5,
        'quantity': 150,
        'created_at': datetime.datetime.now(),
        'updated_at': datetime.datetime.now()
    },
    {
        'user_id': 2,
        'crypto_id': 1,
        'quantity': 800,
        'created_at': datetime.datetime.now(),
        'updated_at': datetime.datetime.now()
    },
    {
        'user_id': 2,
        'crypto_id': 2,
        'quantity': 300,
        'created_at': datetime.datetime.now(),
        'updated_at': datetime.datetime.now()
    },
    {
        'user_id': 2,
        'crypto_id': 3,
        'quantity': 10,
        'created_at': datetime.datetime.now(),
        'updated_at': datetime.datetime.now()
    },
    {
        'user_id': 2,
        'crypto_id': 4,
        'quantity': 60,
        'created_at': datetime.datetime.now(),
        'updated_at': datetime.datetime.now()
    },
    {
        'user_id': 3,
        'crypto_id': 1,
        'quantity': 42.5,
        'created_at': datetime.datetime.now(),
        'updated_at': datetime.datetime.now()
    },
    {
        'user_id': 3,
        'crypto_id': 5,
        'quantity': .75,
        'created_at': datetime.datetime.now(),
        'updated_at': datetime.datetime.now()
    },
    {
        'user_id': 3,
        'crypto_id': 2,
        'quantity': 1.8,
        'created_at': datetime.datetime.now(),
        'updated_at': datetime.datetime.now()
    },
    {
        'user_id': 3,
        'crypto_id': 4,
        'quantity': 975,
        'created_at': datetime.datetime.now(),
        'updated_at': datetime.datetime.now()
    },
    {
        'user_id': 4,
        'crypto_id': 3,
        'quantity': .75,
        'created_at': datetime.datetime.now(),
        'updated_at': datetime.datetime.now()
    },
    {
        'user_id': 4,
        'crypto_id': 1,
        'quantity': .32,
        'created_at': datetime.datetime.now(),
        'updated_at': datetime.datetime.now()
    },
    {
        'user_id': 4,
        'crypto_id': 2,
        'quantity': 6.48,
        'created_at': datetime.datetime.now(),
        'updated_at': datetime.datetime.now()
    },
    {
        'user_id': 4,
        'crypto_id': 4,
        'quantity': 5.50,
        'created_at': datetime.datetime.now(),
        'updated_at': datetime.datetime.now()
    },
    {
        'user_id': 5,
        'crypto_id': 5,
        'quantity': 14.70,
        'created_at': datetime.datetime.now(),
        'updated_at': datetime.datetime.now()
    },
    {
        'user_id': 5,
        'crypto_id': 1,
        'quantity': 7.10,
        'created_at': datetime.datetime.now(),
        'updated_at': datetime.datetime.now()
    },
    {
        'user_id': 5,
        'crypto_id': 3,
        'quantity': 2.68,
        'created_at': datetime.datetime.now(),
        'updated_at': datetime.datetime.now()
    }
]

watchlists = [
    {
        'user_id': 1,
        'crypto_id': 1,
        'created_at': datetime.datetime.now(),
        'updated_at': datetime.datetime.now()
    },
    {
        'user_id': 2,
        'crypto_id': 2,
        'created_at': datetime.datetime.now(),
        'updated_at': datetime.datetime.now()
    },
    {
        'user_id': 3,
        'crypto_id': 3,
        'quantity': 2500,
        'created_at': datetime.datetime.now(),
        'updated_at': datetime.datetime.now()
    },
    {
        'user_id': 4,
        'crypto_id': 4,
        'created_at': datetime.datetime.now(),
        'updated_at': datetime.datetime.now()
    },
    {
        'user_id': 5,
        'crypto_id': 5,
        'created_at': datetime.datetime.now(),
        'updated_at': datetime.datetime.now()
    },
    {
        'user_id': 1,
        'crypto_id': 2,
        'created_at': datetime.datetime.now(),
        'updated_at': datetime.datetime.now()
    },
    {
        'user_id': 2,
        'crypto_id': 3,
        'created_at': datetime.datetime.now(),
        'updated_at': datetime.datetime.now()
    },
    {
        'user_id': 3,
        'crypto_id': 4,
        'created_at': datetime.datetime.now(),
        'updated_at': datetime.datetime.now()
    },
    {
        'user_id': 4,
        'crypto_id': 5,
        'created_at': datetime.datetime.now(),
        'updated_at': datetime.datetime.now()
    },
    {
        'user_id': 5,
        'crypto_id': 1,
        'created_at': datetime.datetime.now(),
        'updated_at': datetime.datetime.now()
    },
    {
        'user_id': 1,
        'crypto_id': 3,
        'created_at': datetime.datetime.now(),
        'updated_at': datetime.datetime.now()
    },
    {
        'user_id': 2,
        'crypto_id': 4,
        'created_at': datetime.datetime.now(),
        'updated_at': datetime.datetime.now()
    },
    {
        'user_id': 3,
        'crypto_id': 5,
        'created_at': datetime.datetime.now(),
        'updated_at': datetime.datetime.now()
    },
    {
        'user_id': 4,
        'crypto_id': 1,
        'created_at': datetime.datetime.now(),
        'updated_at': datetime.datetime.now()
    },
    {
        'user_id': 5,
        'crypto_id': 2,
        'created_at': datetime.datetime.now(),
        'updated_at': datetime.datetime.now()
    },
    {
        'user_id': 1,
        'crypto_id': 4,
        'created_at': datetime.datetime.now(),
        'updated_at': datetime.datetime.now()
    },
    {
        'user_id': 2,
        'crypto_id': 5,
        'created_at': datetime.datetime.now(),
        'updated_at': datetime.datetime.now()
    },
    {
        'user_id': 3,
        'crypto_id': 1,
        'created_at': datetime.datetime.now(),
        'updated_at': datetime.datetime.now()
    },
    {
        'user_id': 4,
        'crypto_id': 2,
        'created_at': datetime.datetime.now(),
        'updated_at': datetime.datetime.now()
    },
    {
        'user_id': 5,
        'crypto_id': 3,
        'created_at': datetime.datetime.now(),
        'updated_at': datetime.datetime.now()
    },
    {
        'user_id': 1,
        'crypto_id': 5,
        'created_at': datetime.datetime.now(),
        'updated_at': datetime.datetime.now()
    },
    {
        'user_id': 2,
        'crypto_id': 1,
        'created_at': datetime.datetime.now(),
        'updated_at': datetime.datetime.now()
    },
    {
        'user_id': 3,
        'crypto_id': 2,
        'created_at': datetime.datetime.now(),
        'updated_at': datetime.datetime.now()
    },
    {
        'user_id': 4,
        'crypto_id': 3,
        'created_at': datetime.datetime.now(),
        'updated_at': datetime.datetime.now()
    },
    {
        'user_id': 5,
        'crypto_id': 4,
        'created_at': datetime.datetime.now(),
        'updated_at': datetime.datetime.now()
    }
]
