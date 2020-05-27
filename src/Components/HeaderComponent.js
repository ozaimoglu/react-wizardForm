import React from 'react';
import infoJson from '../json/registration-form-setup-information.json';
import {Container, Col, Row} from 'react-bootstrap';
class HeaderComponent extends React.Component {

    render() {
        return (
            <Container className="headerComponent">
                <Row>
                    <h2>{infoJson.event_long_name}</h2>
                </Row>
                <Row>
                    <Col>{infoJson.venue.event_venue_title}</Col>
                    <Col>{infoJson.venue.event_venue_city}, {infoJson.venue.event_venue_country}</Col>
                    <Col>{infoJson.event_start_date} - {infoJson.event_end_date}</Col>
                </Row>
            </Container>
        );
    }
}

export default HeaderComponent;