import '../css/Auth.css'
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Container, Row, Button } from 'reactstrap'
import { inputAuth } from '../common/customInputs'
import Jumbotron from '../template/Jumbotron'

import { login, signup } from '../actions/authActions'

class Auth extends Component {
    constructor(props) {
        super(props)
        this.state = { loginMode: true }
    }

    changeMode() {
        this.setState({ loginMode: !this.state.loginMode })
    }

    onSubmit(values) {
        const { login, signup } = this.props
        this.state.loginMode ? login(values) : signup(values)
    }
    goHome(validToken) {
        if (validToken) this.props.history.push('/')
    }

    render() {
        const { loginMode } = this.state
        const { handleSubmit, msgError, validToken } = this.props
        console.log(this.props)
        return (
            <Container >
                <Row>
                    <Jumbotron title='Seja Bem vindo(a) - Jobs' />
                </Row>

                {validToken ? this.goHome(true) : this.goHome(false)}

                <div className="auth">
                    {
                        msgError ?
                            <div className="errors">
                                <span>{msgError}</span>
                            </div>
                            :
                            ''
                    }
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
                            <Button> 
                                 {loginMode ?
                                'Entrar' :
                                'Cadastrar'
                                }</Button>
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

const mapDispatchToProps = dispatch => bindActionCreators({ login, signup },
    dispatch)

const mapStateToProps = state => ({
    msgError: state.auth.msgError,
    validToken: state.auth.validToken
})
export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({ form: 'authForm' })(Auth)
)
