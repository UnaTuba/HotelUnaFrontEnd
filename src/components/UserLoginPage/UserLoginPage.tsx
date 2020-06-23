import React from 'react';
import { Container, Card, Form, Button, Col, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import api, { ApiResponse, saveToken } from '../../api/api';
import { Redirect } from 'react-router-dom';

interface UserLoginPageState {
    username: string;
    password: string;
    errorMessage: string;
    isLoggedIn: boolean;
}

export default  class UserLoginPage extends React.Component{
    state: UserLoginPageState;

    constructor(props: Readonly<{}>){
        super(props);
        this.state = {
            username: '',
            password: '',
            errorMessage: '',
            isLoggedIn: false,
        }
    }

    private formInputChange(event: React.ChangeEvent<HTMLInputElement>){
        const newState = Object.assign(this.state, {
            [ event.target.id ]: event.target.value,
        });

        this.setState(newState);
    }
    
    private setErrorMessage(message: string){
        const newState = Object.assign(this.state,{
            errorMessage: message,
        })

        this.setState(newState);
    }

    private setLoggedInState(message: boolean){
        const newState = Object.assign(this.state,{
            isLoggedIn: message,
        });
        this.setState(newState);
    }

    private doLogin() {
        api('/auth/user/login','post', 
                { username: this.state.username,
                  password: this.state.password})
        .then((res: ApiResponse)=> {
            if (res.status === 'error'){
                this.setErrorMessage('System error... Try again!');
                return;
            }

           
            //console.log(res);
            //console.log(res.data);
            if(res.status === 'ok'){
                
                if (res.data.statusCode !== undefined){
                    let message ='';
                    this.setLoggedInState(false);
                    switch(res.data.statusCode){
                        case -3001: message = "Non-existing username"; break;
                        case -3002: message = "Wrong password"; break;
                        //default: message = "Something is wrong"; break;
                    }
                    
                    return this.setErrorMessage(message);;
                }
                
                    
                
                saveToken(res.data.token);
                this.setLoggedInState(true);    
              
                //res.data.getToken();
               
                //this.setErrorMessage("You are logged in!");
            }

            console.log(res);
            console.log(res.data);
            //this.setLoggedInState(true);
        });
    }

    render(){
        if(this.state.isLoggedIn === true){
            return (
                <Redirect to="/" />
            );
        }

        return (
        <Container>
            <Col md={ { span: 6, offset: 3 } }>
            <Card>
                <Card.Body>
                    <Card.Title>
                    <FontAwesomeIcon icon={ faSignInAlt } /> User
                    </Card.Title>
                    <Card.Text>
                        
                        <Form>
                            <Form.Group>
                                <Form.Label htmlFor="username">Username</Form.Label>
                                <Form.Control type="username" id="username"
                                            value={ this.state.username }
                                            onChange={ event => this.formInputChange(event as any) }/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label htmlFor="password">Password</Form.Label>
                                <Form.Control type="password" id="password" 
                                            value={ this.state.password }
                                            onChange={ event => this.formInputChange(event as any) }/>
                            </Form.Group>
                            <Form.Group>
                                <Button variant="primary"
                                        onClick={ () => this.doLogin()}>
                                    Log In
                                </Button>
                            </Form.Group>
                        </Form>
                    </Card.Text>
                    <Alert variant="danger"
                            className = {this.state.errorMessage ? '':'d-none'}>
                        { this.state.errorMessage }
                    </Alert>
                </Card.Body>
            </Card>
            </Col>
        </Container>
        );
    }
}