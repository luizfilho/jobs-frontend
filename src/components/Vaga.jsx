import React, { Component } from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import Jumbotron from '../template/Jumbotron';
import axios from 'axios'
import estados from '../utils/estados.json'
import cidades from '../utils/cidades.json'
import areaAt from '../utils/areaAt.json'
import '../css/jumb.css'
import '../css/vaga.css'

const URL = 'http://localhost:3003/api'

class Vaga extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vaga: []
        }
    }

    render() {
        const id = this.props.match.params.id;
        axios.get(`${URL}/vaga/${id}`)
            .then(resp => this.setState({ vaga: resp.data[0] }))

        const { vaga } = this.state;
        const renderVaga = () => {
            return (
                <Grid >

                    <Col xs={12} md={12} className="vaga">
                        <Row>
                            <Jumbotron title={`Contratante: ${vaga.nomeCont}`} />
                        </Row>

                        <Row>
                            <p>Area de Atuação: <span>{vaga.areaAt} </span></p>
                        </Row>
                        <Row>
                            <p>Cidade/Estado: <span>{vaga.cidade}/{vaga.estado} </span></p>
                        </Row>
                        <Row>
                            <p>Disponibilidade de Viagem: <span>{vaga.viagem} </span></p>
                        </Row>
                        <Row>
                            <p>Remuneração: <span>{vaga.remu} </span></p>
                        </Row>
                        <Row>
                            <p>Email para Contato: <span>{vaga.emailCont} </span></p>
                        </Row>
                        <Row>
                            <p>Numero para Contato: <span>{vaga.numCont} </span></p>
                        </Row>
                        <Row>
                            <p>Requisitos da Vaga: <span>{vaga.desc} </span></p>
                        </Row>
                    </Col>

                </Grid>
            );
        }

        return (
            <div>
                {renderVaga()}
            </div>
        )
    }
}

export default Vaga;