import React, { Component } from 'react';
import { Grid, Row, Col, FormGroup, Label, FormControl, Button, HelpBlock, Table } from 'react-bootstrap'
import Jumbotron from '../template/Jumbotron'
import axios from 'axios'
import '../css/Account.css'

import consts from '../consts'

const URL = consts.API_URL

function FieldGroup({ id, label, ...props }) {
    return (
        <FormGroup controlId={id}>
            <Label>{label} </Label>
            <FormControl {...props} />
            <FormControl.Feedback />
            <HelpBlock>{props.error || false}</HelpBlock>
        </FormGroup>
    );
}

class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vagasPub: [],
            changePassword: {
                currentPassword: "",
                newPassword: ""
            },
            idUser: '',
            userName: '',

        }
    }

    handleInputChange(input) {

        this.setState(state => ({
            ...state,
            changePassword: {
                ...state.changePassword,
                ...input
            }
        }))


    }

    componentDidMount() {
        this.verifyToken()
        this.getVagas()
    }


    verifyToken() {
        const token = localStorage.getItem('token')
        axios.get(`${URL}/auth/me`, { headers: { 'authorization': `${token}` } })
            .then(res => {
                
                console.log(res)
                if (res.data.sucess === true) {
                    this.setState({
                        idUser: res.data.user.id,
                    })
                } else {
                    this.setState({ tokenValid: false })
                }
            }
            )
    }


    getVagas() {
        console.log(this.state.idUser)
        axios.get(`${URL}/vagas/${this.state.idUser}`)
        .then(res => {
            console.log(res)
        })
      

    }

    render() {

        const { changePassword } = this.state;

        return (

            <Grid >
                {/* Alteração de Senha */}
                <Jumbotron title="Alteração de Senha" />


                <Row className="formPass">
                    <form action="">

                        <Col xs={4} md={3}>
                            <FieldGroup
                                id="currentPass"
                                type="password"
                                label="Senha Atual *"
                                value={changePassword.currentPassword}
                                // error={errors.nomeCont}
                                onChange={e => this.handleInputChange({ currentPassword: e.target.value })}
                            />
                        </Col>
                        <Col xs={4} md={3}>
                            <FieldGroup
                                id="newPassword"
                                type="password"
                                label="Nova Senha *"
                                value={changePassword.newPassword}
                                // error={errors.nomeCont}
                                onChange={e => this.handleInputChange({ newPassword: e.target.value })}
                            />
                        </Col>

                        <Col xs={4} md={4} >
                            <Button
                                bsStyle="info"
                                type="submit"
                                value="submit"
                            // disabled={!isValid}
                            > Alterar</Button>
                        </Col>
                    </form>
                </Row>


                <Jumbotron title="Vagas Publicadas" />
                <Table responsive>
                    <thead>
                        <tr>
                            <th>Contratante da Vaga</th>
                            <th>Data de Publicação </th>
                            <th>Pessoas com interesse </th>
                            <th>Remover</th>
                        </tr>
                    </thead>
                    <tbody>

                        {/* {this.renderVagas()} */}

                    </tbody>
                </Table>


            </Grid>
        );
    }
}

export default Account;