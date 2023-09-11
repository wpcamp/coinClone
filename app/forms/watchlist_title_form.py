from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length

class WatchlistTitleForm(FlaskForm):
    title = StringField("Title", validators=[DataRequired(), Length(max=50)])
