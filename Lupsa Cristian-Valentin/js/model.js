class t_model {

	poza

	constructor() {

	}

	upload_picture_to_server(rezolve, reject) {
		var request = new XMLHttpRequest()
		var data = new FormData()
		data.append('poza', this.poza)

		request.addEventListener('load', function(e) {

			if(request.response.trim() === "OK")
				return rezolve("UPLOAD SUCCESS")
			else
				return reject(request.response)
		})

		request.open('POST', 'upload.php')
		request.send(data)
	}

	get_data_from_server(rezolve, reject) {
		var request = new XMLHttpRequest()

		request.addEventListener('load', function(e) {
			if(request.response)
				return rezolve(request.responseText)
			else
				return reject("EROARE")
		})

		request.open('GET', 'get.php', true)
		request.send()
	}

	set_picture (poza) {
		this.poza = poza
	}


}
