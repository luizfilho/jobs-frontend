import '../css/Auth.css'
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Container, Row, Button } from 'reactstrap'
import { inputAuth } from '../common/customInputs'
import Jumbotron from '../template/Jumbotron'

import * as actions from '../actions'

class Auth extends Component {
    constructor(props) {
        super(props)
        this.state = { loginMode: true }
    }

    changeMode() {
        this.setState({ loginMode: !this.state.loginMode })
    }

    onSubmit(values) {
        const { login, signup } = this.props.actions
        
        this.state.loginMode ? login(values) : signup(values)
    }

    render() {
        const { loginMode } = this.state
        const { handleSubmit } = this.props
     
        return (
            <Container >
                <Row>
                    <Jumbotron title='Seja Bem vindo(a) - Jobs' />
                </Row>
                <div className="auth">
                    <form onSubmit={handleSubmit(v => this.onSubmit(v))} className="authForm">
                        <Row>
                            <Field
                                name='nome'
                                placeholder='Nome'
                                label='Nome'
                                hide={loginMode}
                                component={inputAuth} />
                        </Row>
                        <Row>
                            <Field
                                name='email'
                                placeholder='Email'
                                label='Email'
                                hide={false}
                                component={inputAuth} />
                        </Row>
                        <Row>
                            <Field
                                name='password'
                                placeholder='Senha'
                                label='Senha'
                                type='password'
                                hide={false}
                                component={inputAuth} />
                        </Row>
                        <Row>
                            <Field
                                name='confirmPassword'
                                placeholder='Confirme a Senha'
                                label='Confirme sua Senha'
                                type='password'
                                hide={loginMode}
                                component={inputAuth} />
                        </Row>

                        <Row className='search-btn'>
                            <Button> Cadastrar</Button>
                        </Row>
                    </form>

                    <Row className='loginMode'>
                        <span onClick={() => this.changeMode()} >
                            {loginMode ?
                                'Não possui conta ? Registrar-se' :
                                'Já é cadastrado ? Entrar'}
                        </span>
                    </Row>
                </div>
            </Container>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(null,mapDispatchToProps)(
    reduxForm({ form: 'authForm' })(Auth)
)
