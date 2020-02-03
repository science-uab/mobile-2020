from datetime import datetime
from camera_app import db


class Photo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.Text, nullable=False)
    photo = db.Column(db.Text, nullable=False)

    def __repr__(self):
        return f'''Card({self.id}, "{self.description}", "{self.photo}")'''

