import os
from flask_login import login_required
from flask import render_template, redirect, url_for, request, flash, Blueprint, session
from sqlalchemy import exc
from camera_app import db

from camera_app.blueprints.main.forms import Form_Photo
from camera_app.blueprints.main.models import Photo

main = Blueprint('main', __name__, template_folder='templates', static_folder='static', static_url_path='/static')


def iterate_pages(table):
    return table.iter_pages(left_edge=2, right_edge=2, left_current=2, right_current=2)


def upload_photo(form_file):
    if type(form_file) == str:
        name = form_file
    else:
        name = form_file.filename
    file_path = os.path.join(main.root_path, 'static', name)
    form_file.save(file_path)
    return name


@main.route("/edit_photo/<int:id>", methods=['GET', 'POST'])
@main.route('/add_photo', methods=['GET', 'POST'])
@login_required
def add_photo(id=None):
    form = Form_Photo()

    if id is not None: photo = Photo.query.get_or_404(id)

    if request.method == 'GET':
        form.process(request.args)
        if id is not None:
            form.description.data = photo.description
            form.photo.data = photo.photo

    if form.validate_on_submit():
        try:
            if id is not None:
                photo.description = form.description.data
                photo.photo = upload_photo(form.photo.data)

                db.session.commit()

                flash('Success!', 'success')
                return redirect(url_for('main.photo', id=photo.id))
            else:
                row = Photo(description=form.description.data, photo=upload_photo(form.photo.data))
                db.session.add(row)
                db.session.commit()

                return redirect(url_for('main.photos'))
                flash('Success!', 'success')
        except exc.IntegrityError as e:
            flash(f'Error: {e}', 'danger')

    return render_template('add_photo.html', title='Add a photo', form=form)


@main.route("/photo/<int:id>")
@login_required
def photo(id):
    session['photo'] = id
    return render_template('photo.html', photo=Photo.query.get_or_404(id))


@main.route("/delete_photo/<int:id>")
@login_required
def delete_photo(id):
    db.session.delete(Photo.query.get_or_404(id))
    db.session.commit()
    return redirect(url_for('main.photos'))


@main.route('/', methods=['GET', 'POST'])
@main.route("/photos")
@login_required
def photos():
    page = request.args.get('page', 1, type=int)
    return render_template('photos.html', title='Photos', photos=Photo.query.paginate(per_page=5, page=page))
