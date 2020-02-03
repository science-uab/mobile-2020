function schimba_ora() {
	var date = new Date()
	document.getElementById('time').innerHTML = date
}

function start_ceas() {
	setInterval(schimba_ora, 1)
}
