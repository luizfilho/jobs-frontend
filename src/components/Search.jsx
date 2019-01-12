import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions'
import { Row, Button } from 'reactstrap'
import { selectChange as Select } from '../common/customInputs'

import '../css/home.css'

class Search extends Component {
    render() {

        const { estados, cidades, tipoVaga, filtro, actions } = this.props

        return (
            <div className='searchForm'>
                <Row>
                    <Select
                        sm={4}
                        label='Estado'
                        name='estado'
                        id={estados.ID}
                        items={estados}
                        value={filtro.estado}
                        typeValue='Sigla'
                        placeholder='o Estado'
                        change
                        onChange={actions.carregarCidades} />

                    <Select
                        sm={4}
                        label='Cidade *'
                        name='cidade'
                        id="cidade"
                        items={cidades}
                        value={filtro.cidade}
                        typeValue='cidade'
                        placeholder='a cidade'
                        change={true}
                        onChange={actions.handleInputChange} />

                    <Select
                        sm={4}
                        label='Tipo de Vaga *'
                        name='tipoVaga'
                        id='tipoVaga'
                        items={tipoVaga}
                        value={filtro.tipoVaga}
                        typeValue='TipoVaga'
                        placeholder='o Tipo de Vaga'
                        change
                        onChange={actions.handleInputChange} />
                </Row>

                <Row className="search-btn">
                    <Button onClick={e => actions.searchVagas(filtro)}>
                        Pesquisar
                    </Button>
                </Row>



            </div>
        );
    }
}

const mapStateToProps = state => ({
    estados: state.searchReducer.estados,
    cidades: state.searchReducer.cidades,
    tipoVaga: state.searchReducer.tipoVaga,

    //Filtro
    filtro: {
        estado: state.searchReducer.filtro.estado,
        cidade: state.searchReducer.filtro.cidade,
        tipoVaga: state.searchReducer.filtro.tipoVaga
    }

});
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);