import React, { Component } from 'react';
import { HashRouter as Router, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import Home from '../components/Home'
import NewVaga from '../components/NewVaga'
import Vaga from '../components/Vaga'
import Auth from '../components/Auth'
import MyAccount from '../components/MyAccount';

import { validateToken } from '../actions/authActions'

const PrivateRoute = ({ component: Component, authed = false, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => authed ? (
                <Component {...props} />
            ) :
                (<Redirect to='/auth' />)
            }
        />
    )
}
class Routes extends Component {

    componentWillMount() {
        const { user, validateToken } = this.props;
        if (user) {
            validateToken(user.token)
        }
    }
    render() {
        const { logged } = this.props;
        console.log(this.props)
        return (
            <Router >
                <div>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/vaga/:id' component={Vaga} />
                    <Route exact path='/auth' component={Auth} />

                    {/* Aréas Fechadas */}
                    <PrivateRoute path='/newVaga' authed={logged} component={NewVaga} />
                    <PrivateRoute path='/myAccount' authed={logged} component={MyAccount} />
                </div>
            </Router>
        )
    }
}

const mapStateToProps = state => ({
    logged: state.auth.validToken,
    user: state.auth.user
})

const mapDispatchToProps = dispatch => bindActionCreators({ validateToken }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Routes)