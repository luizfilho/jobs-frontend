import * as actionsType from '../actionsType';

import consts from '../consts'
import axios from 'axios'

export const login = values => {
    return submit(values, `${consts.OAPI_URL}/login`)
}

export const signup = values => {
    return submit(values, `${consts.OAPI_URL}/signup`)
}

export const logout = () => {
    return { type: actionsType.TOKEN_VALIDATE, payload: false }
}

function submit(values, url) {

    return dispatch => {
        axios.post(url, values)
            .then(resp => {
                dispatch([
                    { type: actionsType.USER_FETCHED, payload: resp.data }
                ])
            })
            .catch(err => {
                dispatch([
                    { type: actionsType.AUTHERROR, payload: err.response }
                ])
            })
    }
}

export const validateToken = token => {
    return dispatch => {
        if (token) {
            axios.post(`${consts.OAPI_URL}/validateToken`, { token })
                .then(resp => {
                    dispatch({ type: actionsType.TOKEN_VALIDATE, payload: resp.data.valid })
                })
                .catch(e => dispatch({ type: actionsType.TOKEN_VALIDATE, payload: false }))
        } else {
            dispatch({ type: actionsType.TOKEN_VALIDATE, payload: false })
        }
    }
}

