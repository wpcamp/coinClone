from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


db = SQLAlchemy()

# helper function for adding prefix to foreign key column references in production


def add_prefix_for_prod(attr):
    if environment == "production":
        return f"{SCHEMA}.{attr}"
    else:
        return attr

# ==================================== Users Model ====================================


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(80), nullable=False)
    buying_power = db.Column(db.Numeric(10, 2), nullable=False)
    title = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.Date, nullable=False)
    updated_at = db.Column(db.Date, nullable=False)

    # relationships
    comments_rel = db.relationship(
        "Comment", backref="user", cascade="all, delete-orphan")
    wallets_rel = db.relationship(
        "Wallet", backref="user", cascade="all, delete-orphan")
    watchlists_rel = db.relationship(
        "Watchlist", backref="user", cascade="all, delete-orphan")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'firstName': self.first_name,
            'lastName': self.last_name,
            "buyingPower": self.buying_power,
            "title": self.title,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }

    def return_buying_power(self):
        return {
            "buyingPower": self.buying_power
        }


# ==================================== Comments Model ====================================

class Comment(db.Model):
    __tablename__ = "comments"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("users.id")), nullable=False)
    crypto_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("cryptos.id")), nullable=False)
    text = db.Column(db.String(800), nullable=False)
    bullish = db.Column(db.Boolean, nullable=False)
    created_at = db.Column(db.Date, nullable=False)
    updated_at = db.Column(db.Date, nullable=False)

    # one-to-many: one user can have many comments
    users_rel = db.relationship(
        "User", back_populates="comments_rel")

    # one-to-many: one crypto can have many comments
    cryptos_rel = db.relationship("Crypto", back_populates="comments_rel")

    def to_dict(self):
        # user_name = User.query.get(self.user_id)
        # user_data = user_name.to_dict()
        return {
            'id': self.id,
            'userId': self.user_id,
            'cryptoId': self.crypto_id,
            'text': self.text,
            'bullish': self.bullish,
            "createdAt": self.created_at,
            "updatedAt": self.updated_at,
            # "user": user_data
        }


# ==================================== Wallets Model ====================================

class Wallet(db.Model):
    __tablename__ = "wallets"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("users.id")), nullable=False)
    crypto_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("cryptos.id")), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.Date, nullable=False)
    updated_at = db.Column(db.Date, nullable=False)

    # one-to-many: one user can have many wallets
    users_rel = db.relationship(
        "User", back_populates="wallets_rel")

    # one-to-many: one crypto can have many wallets
    cryptos_rel = db.relationship("Crypto", back_populates="wallets_rel")

    def to_dict(self):
        # user_name = User.query.get(self.user_id)
        # user_data = user_name.to_dict()
        return {
            'id': self.id,
            'userId': self.user_id,
            'cryptoId': self.crypto_id,
            'quantity': self.quantity,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at,
            # 'user': user_data
        }


# ==================================== Watchlists Model ====================================

class Watchlist(db.Model):
    __tablename__ = "watchlists"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("users.id")), nullable=False)
    crypto_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("cryptos.id")), nullable=False)
    created_at = db.Column(db.Date, nullable=False)
    updated_at = db.Column(db.Date, nullable=False)

    # one-to-many: one user can have many watchlists
    users_rel = db.relationship(
        "User", back_populates="watchlists_rel")

    # one-to-many: one crypto can have (be in) many watchlists
    cryptos_rel = db.relationship("Crypto", back_populates="watchlists_rel")

    def to_dict(self):
        # user_name = User.query.get(self.user_id)
        # user_data = user_name.to_dict()
        return {
            'id': self.id,
            'userId': self.user_id,
            'cryptoId': self.crypto_id,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at,
            # 'user': user_data
        }

# ==================================== Crypto Model ====================================


class Crypto(db.Model):
    __tablename__ = "cryptos"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    symbol = db.Column(db.String(10), nullable=False)

    comments_rel = db.relationship("Comment", back_populates="cryptos_rel")
    wallets_rel = db.relationship(
        "Wallet", back_populates="cryptos_rel", cascade="all, delete-orphan")
    watchlists_rel = db.relationship(
        "Watchlist", back_populates="cryptos_rel", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'symbol': self.symbol,
        }
