import React, { Component } from 'react';
import { Col, Grid, Row, Button, Panel } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Select from '../template/Select'
import Jumbotron from '../template/Jumbotron'
// import Vaga from '../components/Vaga'
import estados from '../utils/estados.json';
import cidades from '../utils/cidades.json';
import areaAt from '../utils/areaAt.json'
import '../css/vagas.css' 

import consts from '../consts'

const URL = consts.API_URL

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            vagas: [],
            estados,
            cidades: [],
            areaAt,
            search: {
                estado: "",
                cidade: [],
                areaAt: ""
            }
        };
        this.handleSearch = this.handleSearch.bind(this)
        this.clearSearch = this.clearSearch.bind(this)
        this.carregarEstado = this.carregarEstado.bind(this)
    }

    carregarEstado(select) {
      
        let estado = select.target.value || '';
        let estadoId = estados.filter(e => e.Sigla === estado)[0].ID

        let novasCidades = [];

        if (estadoId) {
            novasCidades = cidades.filter(c => c.Estado === estadoId);
        }

        this.setState(state => ({
            ...state,
            search: {
                ...state.search,
                ...estado,
            },
            cidades: novasCidades
        }))

        this.handleInputChange(estado)
    }

    handleInputChange(select) {

        this.setState(state => ({
            ...state,
            search: {
                ...state.search,
                ...select
            }
        }))

    }

    clearSearch() {
        axios.get(`${URL}/vagas`)
            .then(res => this.setState({ vagas: res.data }))
    }

    handleSearch() {
        let { estado, cidade, areaAt } = this.state.search;

        if (cidade === "" && areaAt === "") {
            axios.get(`${URL}/vaga/${estado}/0/0`)
                .then(res => {
                    console.log(res, this.state.vagas)
                    if (res.data.sucess === true) {
                        const vagas = res.data.vagas
                        this.setState({ vagas })
                    } else {
                        this.setState({ vagas: [] })
                    }
                })
        }

        else if (areaAt === "") {
            axios.get(`${URL}/vaga/${estado}/${cidade}/0`)
                .then(res => {
                    if (res.data.sucess === true) {
                        const vagas = res.data.vagas
                        this.setState({ vagas })
                    } else {
                        this.setState({ vagas: [] })
                    }
                })
        }

        else if (cidade === "") {
            axios.get(`${URL}/vaga/${estado}/0/${areaAt}`)
                .then(res => {
                    if (res.data.sucess === true) {
                        const vagas = res.data.vagas
                        this.setState({ vagas })
                    } else {
                        this.setState({ vagas: [] })
                    }
                })
        } else {
            axios.get(`${URL}/vaga/${estado}/${cidade}/${areaAt}`)
                .then(res => {
                    if (res.data.sucess === true) {
                        const vagas = res.data.vagas
                        this.setState({ vagas })
                    } else {
                        this.setState({ vagas: [] })
                    }
                })
        }

    }

    componentDidMount() {
        axios.get(`${URL}/vagas`)
            .then(res => this.setState({ vagas: res.data }))
    }

    showVagas() {

        return this.state.vagas.map(vaga => (

            <Col xs={12} md={12} key={vaga._id}>
                < Panel >
                    <Link to={`/vaga/${vaga._id}`} >
                        <Panel.Body >
                            <span className="tipoVaga">{vaga.tipoVaga} </span> <br />
                            <span className="nomeCont">Contratante:{vaga.nomeCont}</span> <br />
                            <span className="regCid"><b>Cidade/Estado</b>{vaga.cidade}/{vaga.estado}</span> <br />
                            <span className="areaAt"><b>Area de Atuacao:</b>{vaga.areaAt} </span>
                        </Panel.Body>
                    </Link>
                </Panel>
            </Col>

        ));

    }

    validate() {
        const errors = {}
        const { search } = this.state
        console.log(search)

        if (!search.estado) errors.estado = 'Estado é Obrigátorio!'

        return {
            errors,
            isValid: Object.keys(errors).length === 0
        };

    }

    render() {

        const { estados, cidades, areaAt } = this.state;
        const { search, vagas } = this.state;
        const { errors, isValid } = this.validate();
        console.log(errors)
        return (

            <Grid>
                <Row>
                    <Jumbotron title='Procure por sua vaga de maneira simples e fácil!' />
                    <Select xs={12} md={4}
                        label="Selecione o Estado"
                        id={estados.ID}
                        items={this.state.estados}
                        value={search.estado}
                        error={!!errors.estado && errors.estado}
                        onChange={this.carregarEstado} />

                    <Select xs={12} md={3}
                        label="Selecione a Cidade"
                        items={this.state.cidades}
                        id="cidade"
                        value={search.cidade}
                        onChange={e => this.handleInputChange({ cidade: e.target.value })} />

                    <Select xs={12} md={3}
                        label="Oportunidades para: "
                        items={areaAt}
                        id="areaAt"
                        value={search.areaAt}
                        onChange={e => this.handleInputChange({ areaAt: e.target.value })} />
                    <Col md={2}>
                        <Button
                            bsStyle="info"
                            onClick={this.clearSearch}
                            type="submit"> Limpar Filtro
                        </Button>
                    </Col>
                </Row>

                <Row >
                    <Col xs={3} mdOffset={4} >
                        <Button
                            bsStyle="info"
                            disabled={!isValid}
                            onClick={this.handleSearch}
                            block={true}
                            type="submit"> Pesquisar
                        </Button>

                    </Col>

                </Row>
                <br />
                <br />
                <Row>
                    {vagas === [] ? <span>Não há vagas com os parametros :(</span> : this.showVagas()}

                </Row>

            </Grid>

        );
    }
}

export default Home;

