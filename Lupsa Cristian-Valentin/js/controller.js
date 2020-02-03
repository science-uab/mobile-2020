class t_controller {
    view
    model

    constructor(view, model) {
        this.view = view
        this.model = model

        var events = new t_events()
        events.add_event("upload_controller_picture", this.upload_controller_picture.bind(this))
		events.add_event("upload_controller_picture_to_server", this.upload_controller_picture_server.bind(this))
        this.view.set_events_list(events)
    }

	upload_controller_picture_server() {

		var poza = this.view.get_picture()
		this.model.set_picture(poza)

		var result = new Promise(this.model.upload_picture_to_server.bind(this.model))
		result.then(this.on_upload_ok.bind(this)).catch(this.on_upload_fail.bind(this))

	}

    upload_controller_picture() {
		this.view.get_picture_from_media()
	}

	on_upload_ok(e) {
		this.view.on_upload_server_finished()
		this.view.do_cleanup()
		var result = new Promise(this.model.get_data_from_server.bind(this.model))
		result.then(this.on_get_ok.bind(this)).catch(this.on_get_fail.bind(this))
	}

	on_upload_fail(e) {
		this.view.on_upload_server_finished()
	}

	on_get_ok(output) {
		this.view.set_content(output)
	}

	on_get_fail(error) {
		console.log('error', error)
	}

}

var view = new t_view()
var model = new t_model()
const app = new t_controller(view, model)
app.on_upload_ok()
