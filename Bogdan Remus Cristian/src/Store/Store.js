import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import createSagaMiddleware from 'redux-saga'

import reducers from '../Reducers'
import middlewares from '../Middlewares'
import sagas from '../Sagas'

const sagaMiddleware = createSagaMiddleware()

const persistConfig = {
    key: 'root',
    storage: storage,
    timeout: null,
    whitelist: ['login','settings','myVehicle','schedule','prices','myPacks'],
}

const middleware = applyMiddleware(...middlewares,sagaMiddleware)
const persistedReducer = persistReducer(persistConfig, reducers)
const store = createStore(persistedReducer,compose(middleware))
const persistor = persistStore(store)

sagaMiddleware.run(sagas)

export {
	store,
	persistor
}
