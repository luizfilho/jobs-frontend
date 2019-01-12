import * as actionsType from '../actionsType';

const INITIAL_STATE = []

export default (state = INITIAL_STATE, action) => {
    switch (actionsType.carregarCidades) {
        case actionsType.CREATE: {

            console.log(action.payload)
        }
        default:
            return state
    }
}