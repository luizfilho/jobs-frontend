import React, { Component } from 'react';
import { HashRouter as Router, Route, Redirect } from 'react-router-dom'

import Home from '../components/Home'
import NewVaga from '../components/NewVaga'
import Vaga from '../components/Vaga'
import Auth from '../components/Auth'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import * as actions from '../actions'


class Routes extends Component {
    render() {
        // const PrivateRoute = ({ component: Component, authed, ...rest }) => {
        //     return (
        //         <Route {...rest} render={(props) =>
        //             authed
        //                 ? (<Component {...props} />)
        //                 : (<Redirect to={{ pathname: '#1/auth', state: { from: props.location } }} />
        //                 )
        //             }
        //         />
        //     )
        // }

        function PrivateRoute({ component: Component, authed, ...rest }){
            return(
                authed 
                ? <Route {...rest} render={props => <Component {...props}/>
                : <Redirect path='/' />
            )
        }
        console.log(this.props)
        return (
            <Router >
                <div>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/vaga/:id' component={Vaga} />
                    <Route exact path='/auth' component={Auth} />
                    <PrivateRoute exact path='newVaga' authed={this.props.isAuthenticated} component={NewVaga} />
                </div>
            </Router>
        )
    }

}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Routes)