import React, { Component } from 'react'
import { Grid, Row, Col, FormGroup, FormControl, Button, HelpBlock, ControlLabel } from 'react-bootstrap'
import MaskedFormControl from 'react-bootstrap-maskedinput'
import axios from 'axios'
import Jumbtron from '../template/Jumbotron'
import Select from '../template/Select'
import areaAt from '../utils/areaAt.json'
import estados from '../utils/estados.json'
import cidades from '../utils/cidades.json'
import remu from '../utils/remuneracao.json'
import viagem from '../utils/op.json'
import tipoVaga from '../utils/tipoVaga.json'
import '../css/pageHeader.css'
import '../css/newVaga.css'

const URL = 'http://localhost:3003/api'

function FieldGroup({ id, label, ...props }) {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label} </ControlLabel>
            <FormControl {...props} />
            <FormControl.Feedback />
            <HelpBlock>{props.error || false}</HelpBlock>
        </FormGroup>
    );
}
function MaskInput({ id, label, ...props }) {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label} </ControlLabel>
            <MaskedFormControl
                type={props.type}
                mask={props.mask}
                name={props.name}
                onChange={props.onChange} />
            <FormControl.Feedback />
            <HelpBlock>{props.error || false}</HelpBlock>
        </FormGroup>
    );
}
class NewVaga extends Component {
    constructor(props) {
        super(props);
        this.state = {
            areaAt,
            tipoVaga,
            remu,
            viagem,
            estados: estados,
            cidades: [],
            vaga: {
                idUser: undefined,
                nomeCont: "",
                areaAt: "",
                tipoVaga: "",
                estado: "",
                cidade: "",
                remu: "",
                viagem: "",
                numCont: "",
                emailCont: "",
                desc: ""
            },
            logged: ''


        };
    }
    carregarEstado(select) {
        let estado = select.target.value || '';

        // estados.filter(e => e.Sigla === estado)[0].ID)

        let estadoId = estados.filter(e => e.Sigla === estado)[0].ID

        console.log('Estado selecionado', estado);
        let novasCidades = [];

        if (estadoId) {
            novasCidades = cidades.filter(c => c.Estado == estadoId);
        }

        this.setState(state => ({
            ...state,
            vaga: {
                ...state.vaga,
                estado,
            },
            cidades: novasCidades
        }));

        console.log(this.state)
    }

    handleInputChange(input) {

        this.setState(state => ({
            ...state,
            vaga: {
                ...state.vaga,
                ...input
            }
        }))
        console.log(this.state.vaga)
    }

    validate() {
        const errors = {}
        const { vaga } = this.state
        if (!vaga.nomeCont) errors.nomeCont = 'Nome do Contratante é Obrigátorio!'
        if (!vaga.areaAt) errors.areaAt = 'Area de Atuação é Obrigátoria!'
        if (!vaga.estado) errors.estado = 'Estado é Obrigátorio!'
        if (!vaga.cidade) errors.cidade = 'Cidade é Obrigátoria!'
        if (!vaga.remu) errors.remu = 'Remuneração é Obrigátoria!'
        if (!vaga.viagem) errors.viagem = 'Disp. de Viagem é Obrigátorio!'
        if (!vaga.numCont) errors.numCont = 'Numero de Contato é Obrigátorio!'
        if (!vaga.emailCont) errors.emailCont = 'Email para Contato é Obrigátorio!'
        if (!vaga.desc) errors.desc = 'Descrição é Obrigátorio!'

        return {
            errors,
            isValid: Object.keys(errors).length === 0
        };

    }


    handleSubmit(e) {
        e.preventDefault()

        const { vaga } = this.state;

        axios.post(`${URL}/newVaga`, vaga)
            .then(res => this.props.history.push('/'))
            .catch(err => console.log(err))

    }

    componentDidMount() {
        this.verifyToken()
    }

    verifyToken() {
        const token = localStorage.getItem('token')
        axios.get(`${URL}/auth/me`, { headers: { 'authorization': `${token}` } })
            .then(res => {
                console.log(res)
                if (res.data.sucess === true) {
                    const idUser = { idUser: res.data.user.id }

                    this.setState({ logged: true })
                    this.setState(state => ({
                        ...state,
                        vaga: {
                            ...state.vaga,
                            ...idUser
                        }
                    }))
                    console.log(this.state.vaga)
                } else {
                    this.setState({ logged: false })
                }
            })

    }

    render() {
        const { vaga } = this.state;
        const { errors, isValid } = this.validate()
        console.log(this.state)
        return (

            <Grid>
                <Row>
                    <Jumbtron title="Cadastre uma Nova Oportunidade!" />
                </Row>


                <Row>
                    <Col xs={12} md={3}>
                        <FieldGroup
                            id="nomeCont"
                            type="text"
                            label="Contratante *"
                            name="nomeCont"
                            value={vaga.nomeCont}
                            error={errors.nomeCont}
                            onChange={e => this.handleInputChange({ nomeCont: e.target.value })}
                        />

                    </Col>

                    <Col xs={12} md={3}>
                        <Select
                            id="areaAt"
                            label="Area de Atuação*"
                            name="areaAt"
                            items={this.state.areaAt}
                            value={vaga.areaAt}
                            error={errors.areaAt}
                            onChange={e => this.handleInputChange({ areaAt: e.target.value })}
                        />
                    </Col>

                    <Col xs={6} md={3}>
                        <Select
                            id="estado"
                            label="Estado *"
                            name="estado"
                            items={this.state.estados}
                            value={vaga.estado}
                            error={errors.estado}
                            onChange={this.carregarEstado.bind(this)}
                        />
                    </Col>

                    <Col xs={6} md={3}>
                        <Select
                            id="cidade"
                            label="Cidade *"
                            name="cidade"
                            items={this.state.cidades}
                            value={vaga.cidade}
                            error={errors.cidade}
                            onChange={e => this.handleInputChange({ cidade: e.target.value })}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs={6} md={3}>
                        <Select
                            id="remu"
                            label="Remuneração *"
                            name="remu"
                            items={this.state.remu}
                            value={vaga.remu}
                            error={errors.remu}
                            onChange={e => this.handleInputChange({ remu: e.target.value })}
                        />
                    </Col>

                    <Col xs={6} md={3}>
                        <Select
                            id="viagem"
                            label="Disponibilidade de Viagem *"
                            name="viagem"
                            items={this.state.viagem}
                            value={vaga.viagem}
                            error={errors.viagem}
                            onChange={e => this.handleInputChange({ viagem: e.target.value })}
                        />
                    </Col>

                    <Col xs={6} md={3}>
                        <MaskInput
                            id="numCont"
                            type="text"
                            label="Número para Contato *"
                            name='numCont'
                            mask='11-11111-1111'
                            value={vaga.numCont}
                            error={errors.numCont}
                            onChange={e => this.handleInputChange({ numCont: e.target.value })}
                        />
                    </Col>
                    <Col xs={6} md={3}>
                        <FieldGroup
                            id="emailCont"
                            type="email"
                            label="E-mail para Contato *"
                            name="emailCont"
                            value={vaga.emailCont}
                            error={errors.emailCont}
                            onChange={e => this.handleInputChange({ emailCont: e.target.value })}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col xs={12} md={3}>
                        <Select
                            id="tipoVaga"
                            label="Tipo de Vaga *"
                            name="tipoVaga"
                            items={this.state.tipoVaga}
                            value={vaga.tipoVaga}
                            // error={errors.areaAt}
                            onChange={e => this.handleInputChange({ tipoVaga: e.target.value })}
                        />
                    </Col>

                    <Col xs={12} md={9}>
                        <FormGroup >
                            <ControlLabel>Pré Requisitos</ControlLabel>
                            <FormControl
                                rows={4}
                                id="desc"
                                componentClass="textarea"
                                name="desc"
                                placeholder="Descreva os requisitos e detalhes da vaga."
                                value={vaga.desc}
                                error={errors.desc}
                                onChange={e => this.handleInputChange({ desc: e.target.value })}
                            />
                        </FormGroup>
                    </Col>
                </Row>

                <Row>
                    <Col xsOffset={5} mdOffset={5} >
                        <Button
                            bsSize="large"
                            bsStyle="info"
                            type="submit"
                            disabled={!isValid}
                            onClick={this.handleSubmit.bind(this)}
                        > Cadastrar</Button>
                    </Col>
                </Row>


            </Grid >
        )
    }
}

export default NewVaga;