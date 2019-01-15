import React from 'react'
import {
  Navbar,
  NavbarBrand,
  NavItem,
  Nav,
  NavLink,
} from 'reactstrap';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logout } from '../actions/authActions'
import '../css/customNav.css'

class CustomNav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      logged: false
    }
  }

  render() {
    const { validToken,logout } = this.props;
    return (

      <div>
        <Navbar color="red" light expand="md">
          <NavbarBrand href="/">Jobs - Crud </NavbarBrand>
          <Nav className="ml-auto" navbar>
            <NavItem >
              <NavLink href="#/">Vagas</NavLink>
            </NavItem>
            <NavItem >
              <NavLink href="#newVaga">Nova Vaga</NavLink>
            </NavItem>
            <NavItem >
              <NavLink href="#myAccount">Minha Conta</NavLink>
            </NavItem>
            <NavItem >
              <NavLink href="#sobre">Sobre</NavLink>
            </NavItem>
            <NavItem >
              {
                !validToken ?
                  <NavLink href="#auth">Entrar</NavLink>
                  :
                  <NavLink href="/" onClick={logout} > Sair </NavLink>
              }
            </NavItem>
          </Nav>
        </Navbar>
        {this.props.children}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ logout }, dispatch)
const mapStateToProps = state =>({
  validToken: state.auth.validToken
})
export default connect(mapStateToProps, mapDispatchToProps)(CustomNav)
