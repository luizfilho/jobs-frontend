import React, { Component } from 'react'
import { Col, Navbar, Nav, NavItem } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import '../css/customNav.css'
import '../css/pageHeader.css'

const URL = 'http://localhost:3003/api'

export default class CustomNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tokenValid: undefined
        }

        this.handleLogout = this.handleLogout.bind(this)
    }

    componentDidMount() {
        this.verifyToken()
    }

    verifyToken() {
        const token = localStorage.getItem('token')
        axios.get(`${URL}/auth/me`, { headers: { 'authorization': `${token}` } })
            .then(res => {
              
                if (res.data.sucess === true) {
                    this.setState({ tokenValid: true })
                } else {
                    this.setState({ tokenValid: false })
                }
            }
            )
    }

    handleLogout(e) {
        localStorage.removeItem('token');
        window.location.reload()
    }
    render() {

        const { tokenValid } = this.state;
        console.log(tokenValid)
        return (
            <Col>
                <Navbar default collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            {/* <Image src="assets/oablogo.png" /> */}
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse >
                        <Nav >

                            <NavItem
                                componentClass={NavLink}
                                href="/"
                                to="/">
                                Home
                        </NavItem>
                            {
                                tokenValid ? (
                                    <NavItem
                                        componentClass={NavLink}
                                        href='/newVaga'
                                        to='/newVaga'>
                                        Publicar uma Vaga
                                 </NavItem>
                                ) :
                                    <NavItem
                                        componentClass={NavLink}
                                        href='/myAccount/login'
                                        to='/myAccount/login'>
                                        Publicar uma Vaga
                                 </NavItem>
                            }

                            {
                                tokenValid === true ? (
                                    <NavItem
                                        componentClass={NavLink}
                                        href='/myAccount'
                                        to='/myAccount'
                                    >
                                        Minha Conta
                                    </NavItem>
                                ) : (
                                        <NavItem
                                            componentClass={NavLink}
                                            href='/myAccount/login'
                                            to='/myAccount/login'
                                        >
                                            Minha Conta
                                      </NavItem>
                                    )

                            }

                            {
                                tokenValid ? (
                                    <NavItem
                                        componentClass={NavLink}
                                        href='/'
                                        to='/'
                                        onClick={this.handleLogout}
                                    >
                                        Sair
                                    </NavItem>
                                ) :
                                    (
                                        <NavItem
                                            componentClass={NavLink}
                                            href='/myAccount/login'
                                            to='/myAccount/login'
                                        >
                                            Entrar
                                    </NavItem>
                                    )

                            }




                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                {this.props.children}
            </Col>
        )
    }
}