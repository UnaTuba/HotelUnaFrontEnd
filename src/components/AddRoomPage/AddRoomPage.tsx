import React from 'react';
import { Container, Col, Card, Form, Row, Alert, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { InputGroupCheckbox } from 'react-bootstrap/InputGroup';
import api, { ApiResponse } from '../../api/api';

interface AddAllPageState {
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
    rentableId: number;
    message?: string;

    isRegistrationComplete: boolean;
}

interface AddRoomPageState {
   
        numOfBeds: number;
        bedType: "single" | "double" | "bunk_bed" | "king_size";
        roomNumber: number;
        orientation: "east" | "west" | "south" | "north";
        floor: number;
        closet: boolean;
         balcony: boolean;
        desk: boolean;
        airConditioner: boolean;
        hairdryer: boolean;
        rentableId: number;
}

export class AddRoomPage extends React.Component {
    state: AddAllPageState;

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
            price: 1,
                balcony: false,
                closet: false,
                desk: false,
                airConditioner: false,
                hairdryer: false,
                wifi: false,
            },
            rentableId: -1,
        };
    }

    private formInputChanged(event: React.ChangeEvent<HTMLInputElement>) {
        const newFormData = Object.assign(this.state.formData, {
            [ event.target.id ]: event.target.value,
        });

        const newState = Object.assign(this.state, {
            formData: newFormData,
        });

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
                        value="true"
                        data-feature-id="balcony"
                        onChange={ (event: any) => this.formInputChanged(event as any) }
                        />
                        
                     
                        <Form.Check type="checkbox" label="Closet"
                        id="closet"
                        value="true"
                        data-feature-id="closet"
                        onChange={ (event: any) => this.formInputChanged(event as any)} />
                        
                        <Form.Check type="checkbox" label="Air conditioner"
                        id="airConditioner"
                        value="true"
                        data-feature-id="airConditioner"
                        onChange={ (event: any) => this.formInputChanged(event as any)} />
                        
                        <Form.Check type="checkbox" label="Desk"
                        id="desk"
                        value="true"
                        data-feature-id="desk"
                        onChange={ (event: any) => this.formInputChanged(event as any)} />
                        
                        <Form.Check type="checkbox" label="Hairdryer"
                        id="hairdryer"
                        value="true"
                        data-feature-id="hairdryer"
                        onChange={ (event: any) => this.formInputChanged(event as any)} />
                        
                        <Form.Check type="checkbox" label="WiFi"
                        id="wifi"
                        value="true"
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
        

        const dataRentable = {
            maxCapacity: this.state.formData.maxCapacity,
            price: this.state.formData.price,
            wifi: this.state.formData.wifi,
            
        };
       
        api('api/rentable', 'post', dataRentable)
        .then((res: ApiResponse) => {
            //console.log(res);

            if (res.status === 'error') {
                this.setErrorMessage('System error... Try again!');
                return;
            }

            if ( res.data.statusCode !== undefined ) {
                this.handleErrors(res.data);
                return;
            }

            this.setRentableId (res.data.rentableId);
        })    

    }

    getRoom(dataRoom: AddRoomPageState){
        api('api/room', 'post', dataRoom)
        .then((res: ApiResponse) => {
            console.log(dataRoom);
            console.log(res);
            if (res.status === 'error') {
                this.setErrorMessage('System error... Try again!');
                return;
            }

            if ( res.data.statusCode !== undefined ) {
                this.handleErrors(res.data);
                return;
            }
            console.log(res.data);
            this.registrationComplete();
        })    
    }

    private setErrorMessage(message: string) {
        const newState = Object.assign(this.state, {
            message: message,
        });

        this.setState(newState);
    }

    private setRentableId(message: number) {
        const newState = Object.assign(this.state, {
            rentableId: message,
        });

        this.setState(newState);

        const dataRoom: AddRoomPageState = {
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
            rentableId: this.state.rentableId,
        };
        if (dataRoom.rentableId !== -1){
            return this.getRoom(dataRoom);
        }
        this.setErrorMessage('Rentable not found... Try again!');
        return;
    }



    private handleErrors(data: any) {
        let message = '';

        switch (data.statusCode) {
            case -6001: message = 'This room already exists!'; break;
        }

        this.setErrorMessage(message);
    }

    private registrationComplete() {
        const newState = Object.assign(this.state, {
            isRegistrationComplete: true,
        });

        this.setState(newState);
    }

}