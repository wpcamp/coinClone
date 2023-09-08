from app.models import db, environment, SCHEMA
from app.models.db import Wallet
from .data import wallets
from sqlalchemy.sql import text


def seed_wallets():
    for wallet in wallets:
        new_wallet = Wallet(
            user_id = wallet["user_id"],
            crypto_id = wallet["crypto_id"],
            quantity = wallet["quantity"],
            created_at=wallet["created_at"],
            updated_at=wallet["updated_at"]
        )
        db.session.add(new_wallet)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_wallets():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()