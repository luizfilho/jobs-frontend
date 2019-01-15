import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker';

import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'

import thunk from 'redux-thunk'
import promise from 'redux-promise'
import multi from 'redux-multi'

import reducers from './reducers/reducers'
import App from './main/App'

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const store = applyMiddleware(thunk,promise,multi)(createStore)(reducers, devTools);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>

    , document.getElementById('app'))

serviceWorker.unregister();
