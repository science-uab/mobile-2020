export default value => {
	var input = document.createElement("a")
	input.setAttribute("style", "display:hidden;")
	input.setAttribute("href", value)
	document.getElementById("root").appendChild(input)
	input.click()
	document.getElementById("root").removeChild(input)
}
