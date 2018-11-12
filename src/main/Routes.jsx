import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import Home from '../components/Home'
import NewVaga from '../components/NewVaga'
import Vaga from '../components/Vaga'
import Login from '../components/Login'
import Account from '../components/Account'
import CustomNav from '../components/CustomNav'
import CustomNavDev from '../components/CustomNavDev'
import NewUser from '../components/NewUser';
import Footer from '../components/Footer'

import axios from 'axios'

const URL = 'http://localhost:3000/api'

class Routes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tokenValid: undefined
        }
    }

    componentWillMount() {
        this.verifyToken()
    }

    verifyToken() {
        const token = localStorage.getItem('token')
        axios.get(`${URL}/auth/me`, { headers: { 'authorization': `${token}` } })
            .then(res => {
                console.log(res)
                if (res.data.sucess === true) {
                    this.setState({ tokenValid: true })
                }else{
                    this.setState({ tokenValid: false })
                }
            }
            )
    }
    render() {
        const { tokenValid } = this.state;
        return (
            <Router >
                <div>
                    <CustomNavDev />
                        {/* Sem Validacao de Token */}
                         <Route exact path='/' component={Home} />
                        <Route exact path='/vaga/:id' component={Vaga} />
                        <Route exact path='/myAccount/' component={Account} />
                        <Route exact path='/myAccount/newUser' component={NewUser} />
                        <Route exact path='/myAccount/login' component={Login} />
                        <Route exact path='/newVaga' component={NewVaga} />
                         {/* COM Validacao de Token */}
                    {/* <Switch>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/vaga/:id' component={Vaga} />
                        {
                            tokenValid === false ?
                                (<Route exatc path='/newVaga' component={Login} />)
                                :
                                (<Route exact path='/newVaga' component={NewVaga} />)
                        }

                        {
                            tokenValid === false ? 
                            (<Route exact path='/myAccount' component={Login} />)
                            :
                            (<Route exact path='/myAccount/' component={Account} />)

                        }

                        <Route exact path='/myAccount/newUser' component={NewUser} />
                        <Route exact path='/myAccount/login' component={Login} />
                        <Redirect from ='*' to='/'/>
                    </Switch> */}
                    <Footer/>
                </div>
            </Router>
        )
    }

}

export default Routes;
