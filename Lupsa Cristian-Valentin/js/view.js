class t_view {

    events

    constructor() {

		document.getElementById("upload").addEventListener("click", this.on_select_picture.bind(this))
		document.getElementById("delete_preview").addEventListener("click", this.on_delete_preview.bind(this))
		document.getElementById("upload_server").addEventListener("click", this.on_upload_server.bind(this))
		document.getElementById("poza").addEventListener("change", this.on_preview_picture.bind(this))
		document.getElementById("preview_picture").addEventListener("click", this.on_select_picture.bind(this))

	}

	set_content (content) {
		document.getElementById("galerie").innerHTML = ''
		document.getElementById("galerie").innerHTML = content
	}

	setError (status) {
		if(status)
			document.getElementById("error").style.display = 'block'
		else
			document.getElementById("error").style.display = 'none'
	}

	on_upload_server () {
		document.getElementById("delete_preview").disabled = true
		document.getElementById("upload_server").disabled = true
		document.getElementById("loading").style.display = 'block'

		this.events.call_event("upload_controller_picture_to_server")
	}

	on_upload_server_finished () {
		document.getElementById("delete_preview").disabled = false
		document.getElementById("upload_server").disabled = false
		document.getElementById("loading").style.display = 'none'
	}

	do_cleanup () {
		var classPreview = document.getElementsByClassName('preview')
		for(var i = 0 ; i < classPreview.length ; i++)
			classPreview[i].style.display = 'none'
		document.getElementById("loading").style.display = 'none'

		document.getElementById("upload").style.display = 'block'
	}

	on_delete_preview () {
		var classPreview = document.getElementsByClassName('preview')
		for(var i = 0 ; i < classPreview.length ; i++)
			classPreview[i].style.display = 'none'
		document.getElementById("upload").style.display = 'block'
	}

	on_preview_picture (e) {
		var preview = document.getElementById('preview_picture')
		preview.src = URL.createObjectURL(e.target.files[0])
		var classPreview = document.getElementsByClassName('preview')
		for(var i = 0 ; i < classPreview.length ; i++)
			classPreview[i].style.display = 'block'
		document.getElementById("upload").style.display = 'none'
	}

    on_select_picture() {
        this.events.call_event("upload_controller_picture")
    }

	get_picture_from_media () {
		document.getElementById("poza").click()
	}

	get_picture() {
		return document.getElementById("poza").files[0]
	}

    set_events_list(events) {
        this.events = events
    }

}
