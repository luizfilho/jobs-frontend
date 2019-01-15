import React, { Component } from 'react';
import { connect } from 'react-redux'

import Jumbotrom from '../template/Jumbotron'

class MyAccount extends Component {
    render() {
        const { user } = this.props
        return (
            <div>
                <Jumbotrom title={`Seja bem vindo de volta , ${user.nome}`} />
                <h1>Area Protegida</h1>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    user: state.auth.user
})
export default connect(mapStateToProps, null)(MyAccount);