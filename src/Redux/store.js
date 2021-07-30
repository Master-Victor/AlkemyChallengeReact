import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import heroReducer,{leerEquipo, leerDetalle} from './heroDucks'
import tokenReducer,{leerToken} from './tokenDucks'

const rootReducer = combineReducers({
    heroe: heroReducer,
    token: tokenReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
    const store = createStore( rootReducer, composeEnhancers( applyMiddleware(thunk) ) )
    leerToken()(store.dispatch)
    leerEquipo()(store.dispatch)
    leerDetalle()(store.dispatch)
    return store;
}