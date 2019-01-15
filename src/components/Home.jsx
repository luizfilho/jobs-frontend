import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions'

import Jumbotron from '../template/Jumbotron'
import Search from './Search'

import '../css/home.css'
import '../css/listVagas.css'

class Home extends Component {
    componentWillMount() {
        this.props.actions.getVagas();
    }

    renderVagas(vagas = []) {
        return vagas.map(vaga => (
            <Col xs={12} md={6} key={vaga._id} >
                < div className="listVagas" >
                    <Link to={`/vaga/${vaga._id}`} >
                        <span className="tipoVaga">{vaga.tipoVaga} </span>
                        <div className="detalhes">
                            <span className="nomeCont">Contratante:{vaga.nomeCont}</span> <br />
                            <span className="regCid"><b>Cidade/Estado</b>{vaga.cidade}/{vaga.estado}</span> <br />
                            <span className="areaAt"><b>Area de Atuacao:</b>{vaga.areaAt} </span>
                        </div>
                    </Link>
                </div>
            </Col>
        ))
    }
    render() {
        const { vagas } = this.props
        return (
            <Container>
                <Row>
                    <Jumbotron title='Procure por vagas perto de você!' />
                </Row>

                <Search />

                <Row >
                    {this.renderVagas(vagas)}
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    vagas: state.searchReducer.vagas,
})

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

