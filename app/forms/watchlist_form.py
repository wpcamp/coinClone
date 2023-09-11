from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired

class WatchlistForm(FlaskForm):
    crypto_id = IntegerField("Crypto ID", validators=[DataRequired()])