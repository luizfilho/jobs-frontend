import React from 'react';
import {
    FormGroup,
    Label,
    Input,
    Col
} from 'reactstrap'
// import '../css/input.css'

const myInput = props => {
    return (
        <Col xs={props.xs} sm={props.sm}>
            <FormGroup>
                <Label>{props.label}</Label>
                <Input
                    type={props.type}
                    name={props.name}
                    id={props.id}
                    placeholder={props.placeholder}
                />
            </FormGroup>
        </Col>
    );
};

export default myInput;