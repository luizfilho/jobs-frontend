import React, { Component } from 'react';
import { Grid, Row, Col, FormGroup, ControlLabel, FormControl, Button, HelpBlock, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Jumbotron from '../template/Jumbotron'
import MaskedFormControl from 'react-bootstrap-maskedinput'
import axios from 'axios'

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
            <MaskedFormControl type='text' mask={props.mask} onChange={props.onChange} />
            <FormControl.Feedback />
            <HelpBlock>{props.error || false}</HelpBlock>
        </FormGroup>
    );
}

class NewUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                nome: "",
                cel: "",
                email: "",
                numInc: "",
                password: ""
            },
            signUp: {
                sucess: undefined,
                message: undefined
            },
            logged:false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClear = this.handleClear.bind(this);
    }



    handleInputChange(input) {

        this.setState(state => ({
            ...state,
            user: {
                ...state.user,
                ...input
            }
        }))
        console.log(this.state.user)
    }

    handleSubmit(e) {
        const { user } = this.state;

        console.log(user)
        e.preventDefault()
        axios.post(`${URL}/newUser`, user)
            .then(res => {
                if (res.data.sucess === true) {
                    this.setState({ signUp: { sucess: true, message: res.data.msg } })
                    this.handleClear()
                } else {
                    this.setState({ signUp: { sucess: false } })
                    this.handleClear()
                }
            })
    }

    handleClear(){
        
       this.setState({
           user:{
            nome: "",
            cel: "",
            email: "",
            numInc: "",
            password: ""
           }
       })
    }



    validate() {

        const errors = {}
        const { user } = this.state;
        const { sucess} = this.state.signUp;

        if (!user.nome) errors.nome = 'Nome é Obrigátorio!'
        if (!user.cel) errors.cel = 'Celular é Obrigátorio!'
        if (!user.email) errors.email = 'Email é Obrigátorio!'
        if (!user.numInc) errors.numInc = 'Numero de Inscrição é Obrigátorio!'
        if (!user.password) errors.password = 'Senha é Obrigátoria  '

        return {
            errors,
            isValid: Object.keys(errors).length === 0
        };

    }
    render() {
        const { user } = this.state;
        const { isValid } = this.validate();
        const { message } = this.state.signUp;
        return (
            <Grid>

                <Jumbotron title="Criação de conta" />
                <Row>
                    <Col xs={12} md={12}>
                        {
                            this.state.signUp.sucess !== undefined ? (
                                this.state.signUp.sucess === true ?
                                <Alert bsStyle="info">
                                <strong>{message} - </strong>
                                    <Link to="/myAccount/login">Clique Aqui</Link> para se logar.
                                </Alert>
                            :
                            <Alert bsStyle="danger" >
                                <strong>Erro ao se Cadastrar - </strong>
                                    Tente novamente.
                                </Alert>
                            
                            ) :
                            ''
                        }
                    </Col>
                </Row>
                <form >
                    <Row>
                        <Col xs={12} md={4}>
                            <FieldGroup
                                id="nome"
                                type="text"
                                label="Nome "
                                value={user.nome}
                                onChange={e => this.handleInputChange({ nome: e.target.value })}
                            />
                        </Col>

                        <Col xs={6} md={4}>
                            <MaskInput
                                id="cel"
                                type="number"
                                mask='11-11111-1111'
                                label="Celular "
                                value={user.cel}
                                onChange={e => this.handleInputChange({ cel: e.target.value })}
                            />
                        </Col>

                        <Col xs={6} md={4}>
                            <FieldGroup
                                id="email"
                                type="email"
                                label="Email "
                                value={user.email}
                                onChange={e => this.handleInputChange({ email: e.target.value })}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={6} md={4}>
                            <FieldGroup
                                id="numInc"
                                type="text"
                                maxLength={10}
                                label="Nº de Incrição "
                                value={user.numInc}
                                onChange={e => this.handleInputChange({ numInc: e.target.value })}
                            />
                        </Col>

                        <Col xs={6} md={4}>
                            <FieldGroup
                                id="password"
                                type="password"
                                label="Senha "
                                value={user.password}
                                onChange={e => this.handleInputChange({ password: e.target.value })}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xsOffset={5} mdOffset={5} >
                            <Button
                                bsSize="large"
                                bsStyle="info"
                                type="submit"
                                disabled={!isValid}
                                onClick={this.handleSubmit }
                            > Cadastrar</Button>
                        </Col>
                    </Row>
                </form>



            </Grid>

        );
    }
}

export default NewUser;