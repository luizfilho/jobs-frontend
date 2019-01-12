import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import SearchReducer from './searchReducer'
import AuthReducer from './authReducer'

const rootReducer = combineReducers({
    auth:AuthReducer,
    searchReducer: SearchReducer,
    form:formReducer,
})

export default rootReducer