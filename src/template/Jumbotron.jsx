import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap'
import '../css/jumb.css'

export default class Junbt extends Component {
    render() {
        return (
            <div>
                <Jumbotron >
                    <span>{this.props.subTitle}</span>
                    <h1 style={{ color: '#fff' }}>{this.props.title}</h1>
                    <p>{this.props.detalhes}</p>
                </Jumbotron>
            </div>
        );
    }
}

