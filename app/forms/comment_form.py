from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired, Length


class CommentForm(FlaskForm):
    text = StringField("Comment", validators=[DataRequired(), Length(min=5, max=800)])
    bullish = BooleanField("Forecast", validators=[DataRequired()])
