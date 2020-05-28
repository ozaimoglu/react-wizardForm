import React from 'react';
import infoJson from '../json/registration-form-setup-information.json';
import { Container, Col, Row, Form, InputGroup, Button } from 'react-bootstrap';
class FormComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            people : [],
            step: 1,
            isStudent: true,
            email: "",
            name: "",
            lastname: "",
            price: 0,
            workshopCount: 0,
            totalPrice: 0
        }

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleLastnameChange = this.handleLastnameChange.bind(this);
        this.onTypeChanged = this.onTypeChanged.bind(this);
        this.previousStep = this.previousStep.bind(this);
        this.addWorkshop = this.addWorkshop.bind(this);
        this.deleteWorkshop = this.deleteWorkshop.bind(this);
        this.addNewParticipant = this.addNewParticipant.bind(this);
        this.summary = this.summary.bind(this);
        
    }

    onTypeChanged(e) {
        if (e.target.id === "type2") {
            this.setState({
                isStudent: false
            })
        } else {
            this.setState({
                isStudent: true
            })
        }
    }

    handleEmailChange(e) {
        this.setState({ email: e.target.value });
    }

    handleNameChange(e) {
        this.setState({ name: e.target.value });
    }

    handleLastnameChange(e) {
        this.setState({ lastname: e.target.value });
    }

    handleSubmit = (event) => {

        if (this.state.step === 1 && (this.state.name === "" || this.state.email === "" || this.state.lastname === "")) {
            alert("Please fill required areas!");
        } else if(this.state.step === 2 || this.state.step === 1){
            this.setState({
                step: this.state.step + 1,
            })
        } else {
            alert(this.state.toString());
        }


    };

    previousStep() {
        this.setState({
            step: this.state.step - 1
        })
    }

    addWorkshop() {
        this.setState({
            workshopCount: this.state.workshopCount + 1
        })
    }

    deleteWorkshop() {
        if (this.state.workshopCount > 0) {
            this.setState({
                workshopCount: this.state.workshopCount - 1
            })
        }
    }

    addNewParticipant() {
        let people = this.state.people;
        let person = {
            name: this.state.name,
            lastname: this.state.lastname,
            email: this.state.email,
            isStudent: this.state.isStudent,
            workshopCount: this.state.workshopCount,
            price: (this.state.workshopCount * infoJson.workshops[0].event_workshop_price) + (this.state.isStudent ? 30 : 45)
        }
        people.push(person);
        this.setState({
            people: people,
            totalPrice: (this.state.workshopCount * infoJson.workshops[0].event_workshop_price + this.state.isStudent ? 30 : 45) + this.state.totalPrice,
            name: "",
            email: "",
            workshopCount: 0,
            lastname: "",
            isStudent: true,
            step: 1
        });

    }

    summary(totalPrice) {

        let people = this.state.people;
        let person = {
            name: this.state.name,
            lastname: this.state.lastname,
            email: this.state.email,
            isStudent: this.state.isStudent,
            workshopCount: this.state.workshopCount,
            price: (this.state.workshopCount * infoJson.workshops[0].event_workshop_price) + (this.state.isStudent ? 30 : 45)
        }
        people.push(person);

        let json = {};
        json.registrations = [];

        var data;
        for(let i = 0; i < this.state.people.length; i++){
            data = {};
            data.event_registration_firstname = this.state.people[i].name;
            data.event_registration_lastname = this.state.people[i].lastname;
            data.event_registration_email = this.state.people[i].email;
            data.event_registration_type_id = this.state.people[i].isStudent ? "2886" : "2887";
            data.event_registration_type_price = this.state.people[i].isStudent ? "30.00" : "45.00";
            data.workshops = [];
            for(let n = 0; n < this.state.people[i].workshopCount ; n++){
                data.workshops.push({
                        "event_workshop_id": 1549,
                        "event_workshop_price": 50.00
                    });
            }
            json.registrations.push(data);
        }

        json.total_amount = document.getElementById("totalPrice").innerHTML;

        console.log(json);

    }

    render() {
        if(this.state.step === 3){
            var totalPrice = 0;
            for(let i = 0; i < this.state.people.length; i++) {
                totalPrice = this.state.people[i].price + totalPrice;
            }
            totalPrice = totalPrice + ((this.state.workshopCount * infoJson.workshops[0].event_workshop_price) + (this.state.isStudent ? 30 : 45))
    
        }
        
        let stepRender;
        if (this.state.step === 1) {
            stepRender = <Form>
                <fieldset>
                    <Form.Group as={Row}>
                        <Form.Label as="legend" column sm={2}>
                            Registration Type
                    </Form.Label>
                        <Col sm={10}>
                            <Form.Check
                                type="radio"
                                label={infoJson.registration_types[0].event_registration_type_title + " " + infoJson.registration_types[0].event_registration_type_price + "$"}
                                name="formHorizontalRadios"
                                id="isStudent"
                                checked={this.state.isStudent}
                                onChange={this.onTypeChanged}
                            />
                            <Form.Check
                                type="radio"
                                label={infoJson.registration_types[1].event_registration_type_title + " " + infoJson.registration_types[1].event_registration_type_price + "$"}
                                name="formHorizontalRadios"
                                id="type2"
                                checked={!this.state.isStudent}
                                onChange={this.onTypeChanged}
                            />
                        </Col>
                    </Form.Group>
                </fieldset>
                <Form.Group as={Row} controlId="formHorizontalName">
                    <Form.Label column sm={2}>
                        Name*
                </Form.Label>
                    <Col sm={10}>
                        <Form.Control value={this.state.name} onChange={this.handleNameChange} type="text" placeholder="Name" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formHorizontalLastname">
                    <Form.Label column sm={2}>
                        Lastname*
                </Form.Label>
                    <Col sm={10}>
                        <Form.Control value={this.state.lastname} onChange={this.handleLastnameChange} type="text" placeholder="Lastname" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>
                        Email*
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control value={this.state.email} onChange={this.handleEmailChange} type="email" placeholder="Email" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Col>
                        <Button onClick={this.handleSubmit}>Next Step</Button>
                    </Col>
                </Form.Group>
            </Form>;
        }
        if (this.state.step === 2) {
            stepRender =
                <div>
                    <h6>{this.state.name} {this.state.lastname} Total Price: {this.state.workshopCount * infoJson.workshops[0].event_workshop_price}$</h6>
                    <p>{this.state.isStudent ? infoJson.registration_types[0].event_registration_type_title : infoJson.registration_types[1].event_registration_type_title}</p>
                    <Form>
                        <Row className="workshopContainer">
                            <Form.Label column sm={8}>
                                {infoJson.workshops[0].event_workshop_title + " (x" + this.state.workshopCount + ")  " + " " + infoJson.workshops[0].event_workshop_price + "$"}
                            </Form.Label>
                            <Row>
                                <Button onClick={this.deleteWorkshop}>-</Button>
                                <Button onClick={this.addWorkshop}>+</Button>
                            </Row>

                        </Row>
                        <Form.Group as={Row}>
                            <Col>
                                <Button onClick={this.previousStep}>Previous Step</Button>
                            </Col>
                            <Col>
                                <Button onClick={this.handleSubmit}>Next Step</Button>
                            </Col>
                        </Form.Group>
                    </Form>
                </div>;
        }

        if (this.state.step === 3) {
            stepRender =
                <Container>
                    {this.state.people.map(function(object, i){
                        return <div key={i}>
                            <h6>{object.name} {object.lastname}</h6>
                            <p>{object.isStudent ? infoJson.registration_types[0].event_registration_type_title : infoJson.registration_types[1].event_registration_type_title}</p>
                            <Form.Label column sm={8}>
                                        {infoJson.workshops[0].event_workshop_title + " (x" + object.workshopCount + ")"}
                            </Form.Label>
                        </div>
                    })}
                    <h6>{this.state.name} {this.state.lastname}</h6>
                    <p>{this.state.isStudent ? infoJson.registration_types[0].event_registration_type_title : infoJson.registration_types[1].event_registration_type_title}</p>
                    <Form.Label column sm={8}>
                                {infoJson.workshops[0].event_workshop_title + " (x" + this.state.workshopCount + ")  "}
                    </Form.Label>
                    <p> Total Price: <span id="totalPrice">{totalPrice}</span>$</p>
                    <Form>
                        <Form.Group as={Row}>
                            <Col>
                                <Button onClick={this.previousStep}>Previous Step</Button>
                            </Col>
                            <Col>
                                <Button onClick={this.summary}>Summary</Button>
                            </Col>
                        </Form.Group>
                        <Row>
                            <Col sm={12}>
                            <Button onClick={() => this.addNewParticipant(totalPrice)}>Add New Participant</Button>
                            </Col>
                            
                        </Row>
                    </Form>
                </Container>

                ;
        }

        return (
            <Container className="formComponent">
                {stepRender}
            </Container>
        );
    }
}

export default FormComponent;