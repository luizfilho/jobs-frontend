import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Col, Row, Button } from 'reactstrap'

import '../css/listVagas.css'

class listVagas extends Component {
    constructor(props) {
        super(props);

        this.state = {
            vagas: this.props.vagas || []
        }
        this.renderVagas = this.renderVagas(this);

    }
    renderVagas() {
        // return this.props.vagas.map(vaga => (
        //     <Col xs={12} md={6} key={vaga._id} >
        //         < div className="listVagas" >
        //             <Link to={`/vaga/${vaga._id}`} >
        //                 <span className="tipoVaga">{vaga.tipoVaga} </span>
        //                 <div className="detalhes">
        //                         <span className="nomeCont">Contratante:{vaga.nomeCont}</span> <br />
        //                         <span className="regCid"><b>Cidade/Estado</b>{vaga.cidade}/{vaga.estado}</span> <br />
        //                         <span className="areaAt"><b>Area de Atuacao:</b>{vaga.areaAt} </span>
        //                 </div>
        //             </Link>
        //         </div>
        //     </Col>
        // ))
    }



    render() {
        return (
            <div>
                
                {/* {this.renderVagas} */}

            </div>
            
        )}
    }

export default listVagas;