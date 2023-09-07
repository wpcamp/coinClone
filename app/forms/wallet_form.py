from flask_wtf import FlaskForm
from wtforms import IntegerField, DecimalField, SubmitField
from wtforms.validators import DataRequired, NumberRange

# class BuyForm(FlaskForm):
#     crypto_id = IntegerField("Crypto ID", validators=[DataRequired()])
#     quantity = IntegerField("Quantity", validators=[DataRequired(), NumberRange(min=0)])
#     price = DecimalField("Price per coin", places=3)
#     submit = SubmitField("Buy")

#     def set_crypto_choices(self, crypto_choices):
#         self.crypto_id.choices = crypto_choices

# class SellForm(FlaskForm):
#     crypto_id = IntegerField("Crypto ID", validators=[DataRequired()])
#     quantity = IntegerField("Quantity to Sell", validators=[DataRequired(), NumberRange(min=0)])
#     price = DecimalField("Price per coin", places=3)
#     submit = SubmitField("Sell")
