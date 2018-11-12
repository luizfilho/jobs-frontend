import React from 'react';
import { Col, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap'

const mapItems = (items) => {
    return items.map(it => (
        <option key={it.ID} value={it.Sigla || it.areaAt || it.tipoVaga || it.Nome || it.op || it.remu}>
            {it.Nome || it.areaAt || it.tipoVaga || it.remu || it.op}
        </option>
    ));
}

export default props => (
    <Col xs={props.xs} md={props.md}>

        <FormGroup >

            <ControlLabel>{props.label}</ControlLabel>
            <FormControl componentClass="select"
                id={props.id}
                placeholder="select"
                onChange={(evt) => {
                    if (props.onChange) { props.onChange(evt); }
                }}
            >
                <option value="0">Selecione</option>
                {mapItems(props.items)}
            </FormControl>
            <FormControl.Feedback />
            <HelpBlock>{props.error || false}</HelpBlock>
        </FormGroup>

    </Col>
)

