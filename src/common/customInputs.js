import React from 'react';
import { Col, Label, Input, FormGroup } from 'reactstrap'
import MaskedFormControl from 'react-bootstrap-maskedinput'

import '../css/input.css'

const IF = props => {
    if (props.test) return props.children
    else return false
}

const mapItems = (items, typeValue) => {
    return items.map(it => (
        <option key={it.ID}
            value={it[typeValue]} id={it.ID}>
            {it.Nome || it.AreaAt || it.TipoVaga || it.Remu || it.Op}
        </option>
    ));
}


export const inputAuth = props => (

    <IF test={!props.hide}>
            <Col xs={props.xs} sm={props.sm} md={props.md}>
                <Label>{props.label}</Label>
                <Input  {...props.input} placeholder={props.placeholder} type={props.type} />
            </Col>
    </IF>

);

export const customInput = props => (

    <Col xs={props.xs} sm={props.sm}>
        <Label>{props.label}</Label>
        <Input  {...props.input} type={props.type} />
    </Col>
);

export const maskedInput = props => (
    <Col xs={props.xs} sm={props.sm}>
        <Label>{props.label} </Label>
        <MaskedFormControl
            {...props.input}
            mask={props.mask} />
    </Col>
);

export const selectChange = props => (
    <Col xs={props.xs} sm={props.sm}>
        <Label>{props.label}</Label>

        <Input {...props.input} type='select' id={props.id}

            onChange={(evt) => {
                if (props.onChange) {
                    props.onChange(evt);
                }
            }}
        >
            <option value="">Selecione {props.placeholder}</option>

            {mapItems(props.items, props.typeValue)}
        </Input>
    </Col>
)

export const select = props => (
    <Col xs={props.xs} sm={props.sm}>
        <Label>{props.label}</Label>

        <Input {...props.input} type='select' id={props.id}>

            <option value="">Selecione {props.placeholder}</option>

            {mapItems(props.items, props.typeValue)}
        </Input>
    </Col>
)