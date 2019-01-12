import * as actionsType from '../actionsType'

import estados from '../utils/estados.json';
import tipoVaga from '../utils/tipoVaga.json'

const INITIAL_STATE = {
    estados, cidades: [], tipoVaga, vagas: [],
    filtro: { estado: null, cidade: '', tipoVaga: '' }
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionsType.CARREGAR_CIDADES:
            return {
                ...state,
                cidades: action.payload.novasCidades,
                filtro: {
                    ...state.filtro,
                    ...action.payload.filtro
                }
            }
        case actionsType.HANDLE_INPUT_CHANGE:
            return {
                ...state,
                filtro: {
                    ...state.filtro,
                    ...action.payload
                }
            }

        case actionsType.SEARCH_VAGAS:
            return {
                ...state,
                vagas: action.payload.data.vagas,
            }
        case actionsType.GET_VAGAS:
        console.log(action.payload)
            return {
                ...state,
                vagas: action.payload.data
            }
        default:
            return state
    }
}