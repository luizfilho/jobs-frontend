import React, { Component } from 'react';
import { Container, Row } from 'reactstrap'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions'

import Jumbotron from '../template/Jumbotron'
import Search from './Search'
import ListVagas from './listVagas'

import '../css/home.css'

class Home extends Component {
    componentWillMount() {
        this.props.actions.getVagas();
    }
    render() {
        console.log(this.props.vagas)
        return (

            <Container>
                <Row>
                    <Jumbotron title='Procure por vagas perto de você!' />
                </Row>

                <Search />
                <Row >
                    <ListVagas vagas={this.props.vagas} />
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

