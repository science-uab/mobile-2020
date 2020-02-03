export default (value,other) => {
	const one = JSON.stringify(value)
	const two = JSON.stringify(other)
	return one === two
}
