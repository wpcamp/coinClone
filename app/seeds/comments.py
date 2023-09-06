from app.models import db, environment, SCHEMA
from app.models.db import Comment
from .data import comments
from sqlalchemy.sql import text
import datetime


def seed_comments():
    for comment in comments:
        new_comment = Comment(
            user_id = comment["user_id"],
            crypto_id = comment["crypto_id"],
            bullish = comment["bullish"],
            text = comment["text"],
            created_at=comment["created_at"],
            updated_at=comment["updated_at"]
        )
        db.session.add(new_comment)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()