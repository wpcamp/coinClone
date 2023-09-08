from app.models import db, environment, SCHEMA
from app.models.db import Crypto
from .data import coins
from sqlalchemy.sql import text


def seed_cryptos():
    for coin in coins:
        new_crypto = Crypto(
            name = coin["name"],
            symbol = coin["symbol"]
        )
        db.session.add(new_crypto)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_cryptos():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()