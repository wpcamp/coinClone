from flask_wtf import FlaskForm
from wtforms import IntegerField, DecimalField, SubmitField
from wtforms.validators import DataRequired, NumberRange

class WalletForm(FlaskForm):
    crypto_id = IntegerField("Crypto ID", validators=[DataRequired()])
    quantity = IntegerField("Quantity", validators=[DataRequired(), NumberRange(min=0)])
    price = DecimalField("Price per coin", places=5)
    submit = SubmitField("Submit")





