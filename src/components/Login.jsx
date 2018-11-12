import React, { Component } from 'react';
import { Grid, Row, Col, FormGroup, ControlLabel, FormControl, Button, HelpBlock, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../css/MyAccount.css'
const URL = 'http://localhost:3003/api'


function FieldGroup({ id, label, ...props }) {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label} </ControlLabel>
            <FormControl {...props} />
            <FormControl.Feedback />
            <HelpBlock>{props.help}</HelpBlock>
        </FormGroup>
    );
}

class MyAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: {
                sucess: undefined,
                msg: undefined,
            },
            user: {
                numInc: "",
                password: ""
            },
            disable:undefined
        }

        this.handleSubmit = this.handleSubmit.bind(this);
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
        e.preventDefault()

        const { user } = this.state;
     
        axios.post(`${URL}/auth/login`, user)
            .then(res => {
                const msg = res.data.msg
                const sucess = res.data.sucess
                this.setState({
                    login: {
                        sucess,
                        msg
                    }
                })
                
                if(sucess){
                    localStorage.setItem('token', res.data.token)
                    window.location.reload()
                    this.props.history.push('/')
                }
               
            }

            )
    }
    render() {
        const { user } = this.state;
        const { login } = this.state;
        return (

            <Grid>

                <Row>
                    <Col xs={12} mdOffset={4} md={4}>
                        {
                            login.sucess === false ? (
                                <Alert bsStyle="danger">
                                    <strong>{login.msg} - </strong>
                                </Alert>
                            ) :
                                ''
                        }
                        <FieldGroup
                            id="numInc"
                            type="text"
                            label="Numero de Inscrição "
                            value={user.numInc}
                            onChange={e => this.handleInputChange({ numInc: e.target.value })}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col xs={12} mdOffset={4} md={4}>
                        <FieldGroup
                            id="password"
                            type="password"
                            label="Senha "
                            value={user.password}
                            help={<Link to="/myAccount/newUser">Não possui uma conta?Clique Aqui!</Link>}
                            onChange={e => this.handleInputChange({ password: e.target.value })}
                        />
                    </Col>

                </Row>
                <Row>
                    <Col xsOffset={5} mdOffset={6} >
                        <Button
                            bsSize="large"
                            bsStyle="info"
                            type="submit"
                            value="submit"
                            onClick={this.handleSubmit}
                        > Entrar</Button>
                    </Col>
                </Row>

               


            </Grid>

        );
    }
}

export default MyAccount;