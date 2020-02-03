import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from '@material-ui/core/styles'
import Navigation from './Speedster/Navigation'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './Speedster/Store'
import theme from './Speedster/Themes'

const App = () => (
	<Provider store={store}>
	    <PersistGate persistor={persistor}>
			<ThemeProvider theme={theme}>
				<Navigation />
			</ThemeProvider>
	    </PersistGate>
	</Provider>
)

ReactDOM.render(<App />, document.getElementById('root'))
