import * as actionsType from '../actionsType'

const userKey = '_jobs_user'
const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem(userKey)),
    msgError: '',
    validToken: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionsType.TOKEN_VALIDATE:
        console.log(action.payload)
            if (action.payload) {
                return { ...state, validToken: true }
            } else {
                localStorage.removeItem(userKey)
                return { ...state, validToken: false, user: null }
            }
        case actionsType.USER_FETCHED: {
            console.log(action.payload)
            localStorage.setItem(userKey, JSON.stringify(action.payload))
            return { ...state, user: action.payload, validToken: true }
        }
        case actionsType.AUTHERROR: {
            console.log(action.payload)
            return { ...state, msgError: action.payload.data.errors }
        }
        default:
            return state
    }
}