from camera_app import app
from sys import argv


if __name__ == '__main__':
    app.run(debug=True, host=argv[1])

