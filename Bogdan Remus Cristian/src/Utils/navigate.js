import { createBrowserHistory } from 'history'

export const history = createBrowserHistory()

export default function navigate(path) {
	history.push(path)
}

export const goBack = () => {
	const paths = window.location.pathname.split('/')
	let path = ''
	for(let i=1;i<paths.length-1;i++)
		path += '/' + paths[i]
	navigate(path)
}
