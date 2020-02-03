from camera_app import db
from camera_app.blueprints.users.models import User
from camera_app.blueprints.main.models import Photo


def db_reset():
    db.drop_all()
    db.create_all()


if __name__ == '__main__':
    db_reset()

