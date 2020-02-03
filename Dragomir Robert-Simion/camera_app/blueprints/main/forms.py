from flask_wtf import FlaskForm
from wtforms.validators import InputRequired

from wtforms import StringField, SubmitField
from flask_wtf.file import FileField, FileAllowed


class Form_Photo(FlaskForm):
    description = StringField('Description', validators=[InputRequired()])
    photo = FileField('Photo', validators=[FileAllowed(['jpg', 'png']), InputRequired()])

    submit = SubmitField('Add')

