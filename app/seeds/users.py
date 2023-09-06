from app.models import db, environment, SCHEMA
from app.models.db import User
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', buying_power=10000000, first_name='Demo', last_name='Lition')
    harry = User(
        username='HarryK', email='harry@spurs.com', password='password', buying_power=1000000, first_name='Harry', last_name='Kane')
    glendon = User(
        username='glendong', email='glendon@glendon.com', password='password', buying_power=9000000, first_name='Zach', last_name='Glendon')
    db.session.add(demo)
    db.session.add(harry)
    db.session.add(glendon)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()