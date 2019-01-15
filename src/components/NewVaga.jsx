import React, { Component } from 'react';
import { Container, Row, Button } from 'reactstrap'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import * as actions from '../actions';

import estados from '../utils/estados'
import cidades from '../utils/cidades'
import tipoVaga from '../utils/tipoVaga.json'
import remu from '../utils/remuneracao.json'
import areaAt from '../utils/areaAt.json'
import op from '../utils/op.json'

import Jumbotron from '../template/Jumbotron'
import { customInput, maskedInput, select } from '../common/customInputs'

class NewVaga extends Component {

    render() {

        const { handleSubmit, estadoSelected, actions } = this.props
        let cidadesFiltradas = []
        cidadesFiltradas = cidades.filter(cidade => cidade.Estado === estadoSelected)

        return (
            <Container>
                <Row>
                    <Jumbotron title='Tem uma oportunidade ? Cadastre já!' />
                </Row>

                <form onSubmit={handleSubmit(actions.create)} >
                    <Row>
                        <Field
                            sm={3}
                            label='Tipo Vaga *'
                            name='tipoVaga'
                            component={select}
                            items={tipoVaga}
                            typeValue='TipoVaga'
                            placeholder="Tipo de Vaga"
                            change={false}
                        />
                        <Field
                            sm={3}
                            label='Remuneração *'
                            name='remu'
                            component={select}
                            items={remu}
                            typeValue='Remu' />
                        <Field
                            sm={6}
                            label='Contratante *'
                            name='nomeCont'
                            component={customInput} />
                    </Row>
                    <Row>
                        <Field
                            sm={4}
                            label='Area de Atuação *'
                            name='areaAt'
                            component={select}
                            items={areaAt}
                            typeValue='AreaAt' />

                        <Field
                            sm={4}
                            label='Estado'
                            name='estado'
                            component={select}
                            items={estados}
                            typeValue='ID' />

                        <Field
                            sm={4}
                            label='Cidade *'
                            name='cidade'
                            component={select}
                            items={cidadesFiltradas} />
                    </Row>
                    <Row>
                        <Field
                            sm={4}
                            label='Numero para Contato *'
                            name='numCont,'
                            component={maskedInput}
                            mask='11-11111-1111' />

                        <Field
                            sm={4}
                            label='Email para Contato *'
                            name='emailCont'
                            type='email'
                            component={customInput} />


                        <Field
                            sm={4}
                            label='Disponibilidade para Viagem *'
                            name='viagem'
                            component={select}
                            items={op} />
                    </Row>
                    <Row className='search-btn'>
                        <Button > Cadastrar</Button>
                    </Row>
                </form>
            </Container >
        );
    }
}

const selector = formValueSelector('newVagaForm');


const mapStateToProps = state => {
    return {
        estadoSelected: selector(state, 'estado')
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({ form: 'newVagaForm' })(NewVaga)
)