import * as actionsType from '../actionsType';

import estados from '../utils/estados.json';
import cidades from '../utils/cidades.json';

import axios from 'axios';
import consts from '../consts';

const URL = consts.API_URL;

export const carregarCidades = e => {
    if (e.target.value === "") {
        return {
            type: actionsType.CARREGAR_CIDADES,
            payload: { novasCidades: [], filtro: { estado: null } }
        }
    } else {

        let estado = e.target.value || [];

        let estadoId = estados.filter(e => e.Sigla === estado)[0].ID
        estado = estados.filter(e => e.ID === estadoId)[0].Nome

        let novasCidades = [];

        if (estadoId) {
            novasCidades = cidades.filter(c => c.Estado === estadoId);
        }

        return {
            type: actionsType.CARREGAR_CIDADES,
            payload: {
                novasCidades,
                filtro: {
                    estado
                }
            }
        }
    }
}

export const handleInputChange = e => {
    const id = e.target.id;
    const select = { [id]: e.target.value }
    return {
        type: actionsType.HANDLE_INPUT_CHANGE,
        payload: select
    }
}

export const searchVagas = filtro => {
    const request = axios.post(`${URL}/oapi/vaga`, filtro)
    return {
        type: actionsType.SEARCH_VAGAS,
        payload: request
    }
}

export const getVagas = () => {
    const request = axios.get(`${URL}/oapi/vagas`)
    return {
        type: actionsType.GET_VAGAS,
        payload: request
    }
}

export const create = values => {
    const request = axios.post(`${URL}/api/`)
    return {
        type: actionsType.CREATE,
        payload: request
    }
}



