import React from 'react';
import ReactDOM from 'react-dom';
// import { ThemeProvider} from '@material-ui/core/styles'
import Navigation from './Nyx/Navigation'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor} from './Nyx/Store'
// import theme from './Nyx/Themes'

const App = () =>(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            {/* <ThemeProvider theme={theme}> */}
                <Navigation />
            {/* </ThemeProvider> */}
        </PersistGate>
    </Provider>
)

ReactDOM.render(<App />, document.getElementById('root'));

