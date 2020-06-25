import React from 'react';
import { Container, Col, Card, Form, Row, Alert, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { InputGroupCheckbox } from 'react-bootstrap/InputGroup';

interface AddRoomPageState {
    formData: {
        numOfBeds: number;
        bedType: "single" | "double" | "bunk_bed" | "king_size";
        roomNumber: number;
        maxCapacity: number;
        price: number;
        orientation: "east" | "west" | "south" | "north";
        floor: number;
       
            closet: boolean;
            balcony: boolean;
            desk: boolean;
            airConditioner: boolean;
            hairdryer: boolean;
            wifi: boolean;
      
        
    };

    message?: string;

    isRegistrationComplete: boolean;
}

export class AddRoomPage extends React.Component {
    state: AddRoomPageState;

    constructor(props: Readonly<{}>) {
        super(props);

        this.state = {
            isRegistrationComplete: false,
            formData: {
            numOfBeds: 1,
            bedType: "single",
            orientation: "east",
            floor: 1,
            roomNumber: 1,
            maxCapacity: 1,
            price: 0,
                balcony: false,
                closet: false,
                desk: false,
                airConditioner: false,
                hairdryer: false,
                wifi: false,
       
            },
        };
    }

    private formInputChanged(event: React.ChangeEvent<HTMLInputElement>) {
        const newFormData = Object.assign(this.state.formData, {
            [ event.target.id ]: event.target.value,
        });

        const newState = Object.assign(this.state, {
            formData: newFormData,
        });
        //let balcony = React.ChangeEvent<HTMLInputElement> document.getElementById("balcony");
        //balcony.checked
        

        this.setState(newState);
    }

    render() {
        return (
            <Container>
                <Col md={ { span: 8, offset: 2 } }>
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                <FontAwesomeIcon icon={ faPlusSquare } /> Add new room
                            </Card.Title>
                            {
                                (this.state.isRegistrationComplete === false) ?
                                this.renderForm() : 
                                this.renderRegistrationCompleteMessage()
                            }
                        </Card.Body>
                    </Card>
                </Col>
            </Container>
        );
    }

    private renderForm() {
        return (
            <>
                <Form>
                <Row>
                    <Col md="6">
                            <Form.Group>
                                <Form.Label htmlFor="roomNumber">Room number:</Form.Label>
                                <Form.Control type="number" id="roomNumber"
                                            value={ this.state.formData.roomNumber }
                                            onChange={ event => this.formInputChanged(event as any) } />
                            </Form.Group>
                        </Col>
                        <Col md="6">
                            <Form.Group>
                                <Form.Label htmlFor="floor">Floor:</Form.Label>
                                <Form.Control type="number" id="floor"
                                            value={ this.state.formData.floor }
                                            onChange={ event => this.formInputChanged(event as any) } />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md="6">
                            <Form.Group>
                                <Form.Label htmlFor="numOfBeds">Number of beds:</Form.Label>
                                <Form.Control type="number" id="numOfBeds"
                                            value={ this.state.formData.numOfBeds }
                                            onChange={ event => this.formInputChanged(event as any) } />
                            </Form.Group>
                        </Col>

                        <Col md="6">
                        <Form.Group controlId="bedType">
                        <Form.Label>Bed type</Form.Label>
                            <Form.Control as="select">
                            <option>Single bed</option>
                            <option>Double bed</option>
                            <option>Bunk bed</option>
                            <option>King size</option>
                            </Form.Control>
                        </Form.Group>
                        </Col>
                    </Row>

                    

                        <Row>
                        <Col md="6">
                            <Form.Group>
                                <Form.Label htmlFor="maxCapacity">Maximal capacity:</Form.Label>
                                <Form.Control type="number" id="maxCapacity"
                                            value={ this.state.formData.maxCapacity }
                                            onChange={ event => this.formInputChanged(event as any) } />
                            </Form.Group>
                        </Col>
                        <Col md="6">
                            <Form.Group>
                                <Form.Label htmlFor="price">Price:</Form.Label>
                                <Form.Control type="number" id="price"
                                            value={ this.state.formData.price }
                                            onChange={ event => this.formInputChanged(event as any) } />
                            </Form.Group>
                        </Col>

                        <Col md="6">
                        <Form.Group controlId="bedType">
                        <Form.Label>Orientation</Form.Label>
                            <Form.Control as="select">
                            <option>South</option>
                            <option>East</option>
                            <option>West</option>
                            <option>North</option>
                            </Form.Control>
                        </Form.Group>
                        </Col>
                    </Row>
                    
                    <Row><Col md="6">
                        <Form.Group controlId="features">
                        
                        <Form.Check type="checkbox" label="Balcony"
                        id="balcony"
                        value="balcony"
                        data-feature-id="balcony"
                        onChange={ (event: any) => this.formInputChanged(event as any) }
                        />
                        
                     
                        <Form.Check type="checkbox" label="Closet"
                        id="closet"
                        value="closet"
                        data-feature-id="closet"
                        onChange={ (event: any) => this.formInputChanged(event as any)} />
                        
                        <Form.Check type="checkbox" label="Air conditioner"
                        id="airConditioner"
                        value="airConditioner"
                        data-feature-id="airConditioner"
                        onChange={ (event: any) => this.formInputChanged(event as any)} />
                        
                        <Form.Check type="checkbox" label="Desk"
                        value="desk"
                        data-feature-id="desk"
                        onChange={ (event: any) => this.formInputChanged(event as any)} />
                        
                        <Form.Check type="checkbox" label="Hairdryer"
                        value="hairdryer"
                        data-feature-id="hairdryer"
                        onChange={ (event: any) => this.formInputChanged(event as any)} />
                        
                        <Form.Check type="checkbox" label="WiFi"
                        value="wifi"
                        data-feature-id="wifi"
                        onChange={ (event: any) => this.formInputChanged(event as any)} />

                        </Form.Group>
                        </Col>
                    </Row>
                    
                    <Form.Group>
                        <Button variant="primary"
                                onClick={ () => this.doRegister() }>
                            Register
                        </Button>
                    </Form.Group>    
                </Form>
                <Alert variant="danger"
                        className={ this.state.message ? '' : 'd-none' }>
                    { this.state.message }
                </Alert>
            </>
        );
    }

    private renderRegistrationCompleteMessage() {
        return (
            <p>
                The room has been added.<br />
                <Link to="/">Click here</Link> to to go to the home page.
            </p>
        );
    }

    private doRegister() {
        const data = {
            numOfBeds: this.state.formData?.numOfBeds,
            bedType: this.state.formData?.bedType,
            balcony: this.state.formData?.balcony,
            orientation: this.state.formData?.orientation,
            floor: this.state.formData?.floor,
            closet: this.state.formData?.closet,
            desk: this.state.formData?.desk,
            airConditioner: this.state.formData?.airConditioner,
            roomNumber: this.state.formData?.roomNumber,
            hairdryer: this.state.formData?.hairdryer,
            max_capacity: this.state.formData?.maxCapacity,
            price: this.state.formData?.price,
            wifi: this.state.formData?.wifi,
            
        };
        console.log(data);
        /*return (
            <p>
                Adding a room...<br />
                <Link to="/">Click here</Link> to to go to the home page.
            </p>
        );*/
    }

}