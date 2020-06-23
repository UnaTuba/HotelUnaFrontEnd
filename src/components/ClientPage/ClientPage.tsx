import React from 'react';
import { Container, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListAlt } from '@fortawesome/free-solid-svg-icons';
import ClientType from '../../types/ClientType';
import api, { ApiResponse } from '../../api/api';
import { Redirect } from 'react-router-dom';

interface ClientPageProperties{
    match: {
        params: {
            id: number;
        }
    }
}

interface ClientDto {
    clientId?: number;
    forename?: string;
    surname?: string;
    phone?: string;
    email?: string;
}

interface ClientPageState{
    isUserLoggedIn: boolean;
    clients: ClientDto[];
    message: string;
}

export default class ClientPage extends React.Component<ClientPageProperties>{
    state: ClientPageState;
    constructor(props: Readonly<ClientPageProperties>) {
        super(props);
        this.state = { isUserLoggedIn: true, message: '', clients: []};
    }

    private setLogginState(isLoggedIn: boolean) {
        const newState = Object.assign(this.state, {
            isUserLoggedIn: isLoggedIn,
        });

        this.setState(newState);
    }

    private setMessage(message: string) {
        const newState = Object.assign(this.state, {
            message: message,
        });

        this.setState(newState);
    }
/*
    private setClientData(client: ClientType) {
        console.log(client);
        this.setState(Object.assign(this.state, {
            client: client,
        }));
    }
*/
    private setClientData(clients: ClientType[]) {
        console.log(clients);
        this.setState(Object.assign(this.state, {
            clients: clients,
        }));
    }

    render(){
        if (this.state.isUserLoggedIn === false) {
            return (
                <Redirect to="/user/login" />
            );
        }
        return(
            <Container>
            <Card>
                <Card.Body>
                    <Card.Title>
                    <FontAwesomeIcon icon={ faListAlt } /> Client data
                    </Card.Title>
                    <Card.Text>
                       
                        { this.state.clients.map(this.printClientRow, this) }
                        
                    </Card.Text>
                </Card.Body>
            </Card>
            
        </Container>
        );
    }

    private printClientRow(client: ClientType) {
        return (
            <tr>
                <td>{ client.forename + ' ' + client.surname}</td>
                <td> Email: { client.email }</td>
                <td> Phone: { client.phone }</td>
            </tr>
        );
    }
   /* componentWillMount(){
        this.getClientData();
    }

    componentWillReceiveProps(newProperties: ClientPageProperties){
        if (newProperties.match.params.id === this.props.match.params.id){
            return;
        }

        this.getClientData();
    }*/

    componentDidMount() {
        this.getClientData();
    }

    componentDidUpdate(oldProperties: ClientPageProperties) {
        if (oldProperties.match.params.id === this.props.match.params.id) {
            return;
        }

        this.getClientData();
    }

    private getClientData() {
//+ this.props.match.params.id
        api('api/client' , 'get', {})
        .then((res: ApiResponse) => {
            const data: ClientDto[] = res.data;
            const clients: ClientType[] = data.map(client => ({
                clientId: client.clientId,
                forename: client.forename,
                surname: client.surname,
                phone: client.phone,
                email: client.email,
            }));
            if (res.status === 'login') {
                return this.setLogginState(false);
            }

            if (res.status === 'error') {
                return this.setMessage('Request error. Please try to refresh the page.');
            }
/*
            const clientData: ClientType = {
                clientId: res.data.clientId,
                forename: res.data.forename,
                surname: res.data.surname,
                phone: res.data.phone,
                address: res.data.address,
            };
            */
            
            this.setClientData(clients);
/*
            const subcategories: ClientType[] =
            res.data.categories.map((client: ApiClientDto) => {
                return {
                    clientId: client.clientId,
                    forename: client.forename,
                    surname: client.surname,
                    phone: client.phone,
                    address: client.address,
                }
            });

            this.setSubcategories(subcategories);*/


            //simuliramo logiku dostavljanja podataka
        /*setTimeout(() => 
        {
            const data: ClientType = {
                forename: 'Client: ' + this.props.match.params.id,
                clientId: this.props.match.params.id
            };

            this.setState({client: data,})
        }, 750);*/
        });
    }
}