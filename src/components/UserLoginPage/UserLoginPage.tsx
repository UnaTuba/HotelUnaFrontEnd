import React from 'react';
import { Container, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';

export default  class UserLoginPage extends React.Component{
    render(){
        return (
        <Container>
            <Card>
                <Card.Body>
                    <Card.Title>
                    <FontAwesomeIcon icon={ faSignInAlt } /> User login
                    </Card.Title>
                    <Card.Text>
                        Form for login will be here!! :D
                    </Card.Text>
                </Card.Body>
            </Card>
            
        </Container>
        );
    }
}